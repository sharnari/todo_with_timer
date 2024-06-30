import React from 'react'
import './footer.css'
import PropTypes from 'prop-types'

export default function Footer(props) {
  const { unDoneCount = 0, clearCompleted, onSelectedFilter, selectedFilter = 'All' } = props
  return (
    <footer className="footer">
      <span className="todo-count"> {unDoneCount} items left</span>
      <ul className="filters">
        <li>
          <button
            type="button"
            className={selectedFilter === 'All' ? 'selected' : ''}
            onClick={() => onSelectedFilter('All')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={selectedFilter === 'Active' ? 'selected' : ''}
            onClick={() => onSelectedFilter('Active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={selectedFilter === 'Completed' ? 'selected' : ''}
            onClick={() => onSelectedFilter('Completed')}
          >
            Completed
          </button>
        </li>
      </ul>
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  unDoneCount: PropTypes.number,
  clearCompleted: PropTypes.func,
  onSelectedFilter: PropTypes.func,
  selectedFilter: PropTypes.string,
}
