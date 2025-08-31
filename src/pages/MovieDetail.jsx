import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { fetchMovieDetail, clearMovieDetail } from '../features/moviesSlice'
import { IMAGE_URL } from '../api'

const MovieDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { movieDetail, cast, error } = useSelector((s) => s.movies)

  useEffect(() => {
    dispatch(fetchMovieDetail(id))
    return () => dispatch(clearMovieDetail())
  }, [dispatch, id])

  if (error) return <div className="error">{error}</div>
  if (!movieDetail) return <div className="loader">Loading...</div>

  const poster = movieDetail.poster_path ? `${IMAGE_URL}${movieDetail.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'
  const backdrop = movieDetail.backdrop_path ? `${IMAGE_URL}${movieDetail.backdrop_path}` : null

  return (
    <div className="detail-page">
      {backdrop && (
        <div className="backdrop" style={{ backgroundImage: `url(${backdrop})` }} />
      )}
      <div className="detail-wrapper">
        <img className="detail-poster" src={poster} alt={movieDetail.title} />
        <div className="detail-info">
          <h2>{movieDetail.title}</h2>
          <p className="sub">⭐ {movieDetail.vote_average?.toFixed?.(1)} • {movieDetail.runtime} min • {movieDetail.release_date}</p>
          <p className="genres">{movieDetail.genres?.map(g => g.name).join(', ')}</p>
          <p className="overview">{movieDetail.overview}</p>
          <Link to="/" className="back-btn">← Back</Link>
        </div>
      </div>

      <h3 className="cast-title">Cast</h3>
      <div className="cast-grid">
        {cast.slice(0, 12).map(actor => {
          const profile = actor.profile_path ? `${IMAGE_URL}${actor.profile_path}` : 'https://via.placeholder.com/300x450?text=No+Image'
          return (
            <div key={actor.cast_id || actor.credit_id} className="cast-card">
              <img src={profile} alt={actor.name} loading="lazy" />
              <div className="cast-meta">
                <p className="actor-name">{actor.name}</p>
                <p className="actor-char">as {actor.character}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MovieDetail