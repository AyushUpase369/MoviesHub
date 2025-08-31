import React from 'react'

const Pagination = ({ page, totalPages, onPageChange }) => {
  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <div className="pagination">
      <button disabled={!canPrev} onClick={() => onPageChange(page - 1)}>Prev</button>
      <span>{page} / {totalPages}</span>
      <button disabled={!canNext} onClick={() => onPageChange(page + 1)}>Next</button>
    </div>
  )
}

export default Pagination