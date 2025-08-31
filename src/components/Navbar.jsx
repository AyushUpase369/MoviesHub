import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/search/${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <h1 className="brand"><Link to="/">MoviePanel</Link></h1>
      <ul className="nav-links">
        <li className={isActive('/') ? 'active' : ''}><Link to="/">Popular</Link></li>
        <li className={isActive('/top-rated') ? 'active' : ''}><Link to="/top-rated">Top Rated</Link></li>
        <li className={isActive('/upcoming') ? 'active' : ''}><Link to="/upcoming">Upcoming</Link></li>
      </ul>
      <form className="search" onSubmit={handleSubmit}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
          aria-label="Search movies"
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  )
}

export default Navbar