import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../features/moviesSlice'
import MovieList from '../components/MovieList'
import Pagination from '../components/Pagination'

const Upcoming = () => {
  const dispatch = useDispatch()
  const { movies, page, totalPages, loading, error } = useSelector((s) => s.movies)

  useEffect(() => {
    dispatch(fetchMovies({ type: 'upcoming', page: 1 }))
  }, [dispatch])

  const onPageChange = (p) => {
    dispatch(fetchMovies({ type: 'upcoming', page: p }))
  }

  return (
    <div className="page">
      <h2>Upcoming Movies</h2>
      {error && <div className="error">{error}</div>}
      {loading ? <div className="loader">Loading...</div> : <MovieList movies={movies} />}
      <Pagination page={page} totalPages={Math.min(totalPages, 500)} onPageChange={onPageChange} />
    </div>
  )
}

export default Upcoming