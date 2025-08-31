import React from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_URL } from '../api'

const MovieCard = ({ movie }) => {
  const img = movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'
  const title = movie.title || movie.name
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <div className="poster-wrapper">
          <img src={img} alt={title} loading="lazy" />
        </div>
        <div className="movie-meta">
          <h3 title={title}>{title}</h3>
          <p>⭐ {movie.vote_average?.toFixed?.(1) ?? movie.vote_average}</p>
          <p className="date">{movie.release_date || movie.first_air_date || ''}</p>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard