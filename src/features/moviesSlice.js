import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_KEY, BASE_URL } from '../api'

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ type, page = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`)
      return { results: data.results, page: data.page, totalPages: data.total_pages }
    } catch (err) {
      return rejectWithValue(err.response?.data?.status_message || err.message)
    }
  }
)

export const fetchMovieDetail = createAsyncThunk(
  'movies/fetchMovieDetail',
  async (id, { rejectWithValue }) => {
    try {
      const [detailRes, castRes] = await Promise.all([
        axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
        axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`),
      ])
      return { detail: detailRes.data, cast: castRes.data.cast }
    } catch (err) {
      return rejectWithValue(err.response?.data?.status_message || err.message)
    }
  }
)

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`)
      return { results: data.results, page: data.page, totalPages: data.total_pages }
    } catch (err) {
      return rejectWithValue(err.response?.data?.status_message || err.message)
    }
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    movieDetail: null,
    cast: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
    lastQuery: '',
  },
  reducers: {
    clearMovieDetail: (state) => {
      state.movieDetail = null
      state.cast = []
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMovies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.movies = action.payload.results || []
        state.page = action.payload.page || 1
        state.totalPages = action.payload.totalPages || 1
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to load movies'
      })
      // fetchMovieDetail
      .addCase(fetchMovieDetail.pending, (state) => {
        state.error = null
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.movieDetail = action.payload.detail
        state.cast = action.payload.cast || []
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.error = action.payload || 'Failed to load movie detail'
      })
      // searchMovies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.movies = action.payload.results || []
        state.page = action.payload.page || 1
        state.totalPages = action.payload.totalPages || 1
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to search movies'
      })
  },
})

export const { clearMovieDetail } = moviesSlice.actions
export default moviesSlice.reducer