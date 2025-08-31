import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ movies = [] }) => {
  if (!movies.length) {
    return <p className="empty">No movies found.</p>
  }
  return (
    <div className="movie-grid">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  )
}

export default MovieList