import PropTypes from 'prop-types'
import { React } from 'react'

import TodoListItem from '../todo-list-item'
import './todo-list.css'

function TodoList({ onDeleted, onToggleDone, todos, onEdit, updateLabel, setIsTimerStart, setIsTimerStop }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <li key={id} className="">
        <TodoListItem
          id={id}
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onEdit={() => onEdit(id)}
          updateLabel={updateLabel}
          setIsTimerStart={() => setIsTimerStart(id)}
          setIsTimerStop={() => setIsTimerStop(id)}
        />
        <input type="text" className="edit" />
      </li>
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TodoList.propTypes = {
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
  onToggleDone: PropTypes.func,
  updateLabel: PropTypes.func,
  setIsTimerStart: PropTypes.func,
  setIsTimerStop: PropTypes.func,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      completed: PropTypes.bool,
      id: PropTypes.number,
      timer: PropTypes.instanceOf(Date),
      editing: PropTypes.bool,
      accumulatedTime: PropTypes.number,
    })
  ),
}

export default TodoList
