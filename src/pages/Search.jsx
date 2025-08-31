import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { searchMovies } from '../features/moviesSlice'
import MovieList from '../components/MovieList'
import Pagination from '../components/Pagination'

const Search = () => {
  const { query } = useParams()
  const dispatch = useDispatch()
  const { movies, page, totalPages, loading, error } = useSelector((s) => s.movies)

  useEffect(() => {
    dispatch(searchMovies({ query, page: 1 }))
  }, [dispatch, query])

  const onPageChange = (p) => {
    dispatch(searchMovies({ query, page: p }))
  }

  return (
    <div className="page">
      <h2>Search Results for "{decodeURIComponent(query)}"</h2>
      {error && <div className="error">{error}</div>}
      {loading ? <div className="loader">Loading...</div> : <MovieList movies={movies} />}
      <Pagination page={page} totalPages={Math.min(totalPages, 500)} onPageChange={onPageChange} />
    </div>
  )
}

export default Search