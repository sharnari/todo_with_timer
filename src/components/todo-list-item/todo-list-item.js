import PropTypes from 'prop-types'
import { React, Component, createRef } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './todo-list-item.css'

export default class TodoListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.label,
    }
    this.inputRef = createRef()
  }

  componentDidMount() {
    if (this.props.editing && this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.editing && !prevProps.editing && this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newLabel = this.state.inputValue
      this.props.updateLabel(this.props.id, newLabel)
    } else if (e.key === 'Escape') {
      this.props.onEdit(this.props.id)
      this.setState({ inputValue: this.props.label })
    }
  }

  handleBlur = () => {
    this.props.onEdit(this.props.id)
    if (this.state.inputValue !== this.props.label) {
      this.setState({ inputValue: this.props.label })
    }
  }

  formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  diffSecond = (timeMore, timeLess) => {
    const timeStampMore = timeMore.getTime()
    const timeStampLess = timeLess.getTime()
    const differentSeconds = Math.floor((timeStampMore - timeStampLess) / 1000)
    return differentSeconds
  }

  render() {
    const { label, onDeleted, onToggleDone, completed, timer, onEdit, editing, accumulatedTime } = this.props
    const { inputValue } = this.state
    let classNames = ''
    let checkedFlag = ''
    if (completed) {
      classNames += ' completed'
      checkedFlag = true
    }

    const controlView = () => {
      const { setIsTimerStart, setIsTimerStop } = this.props
      if (!editing) {
        return (
          <>
            <input className="toggle" type="checkbox" onChange={onToggleDone} checked={checkedFlag} />
            <label className="list-item__content">
              <span className="description" onClick={onToggleDone}>
                {label}
              </span>
              <span className="timer">
                <button className="icon icon-play" onClick={setIsTimerStart}></button>
                <button className="icon icon-pause" onClick={setIsTimerStop}></button>
                <span className="time">{this.formatTime(accumulatedTime)}</span>
              </span>
              <span className="created">{formatDistanceToNow(timer, { addSuffix: true, includeSeconds: true })}</span>
            </label>
            {/*---------------------------warning----------------------------------*/}
            <button type="button" className="icon icon-edit" onClick={onEdit} />
            <button type="button" className="icon icon-destroy" onClick={onDeleted} />
          </>
        )
      } else {
        return (
          <div className="flexing-right">
            <input
              type="text"
              className="editing"
              value={inputValue}
              onBlur={this.handleBlur}
              ref={this.inputRef}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        )
      }
    }
    return <div className={`view${classNames}`}>{controlView(editing)}</div>
  }
}

TodoListItem.propTypes = {
  id: PropTypes.number,
  label: PropTypes.string,
  completed: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  timer: PropTypes.instanceOf(Date),
  onEdit: PropTypes.func,
  editing: PropTypes.bool,
  updateLabel: PropTypes.func,
  isTimerStart: PropTypes.bool,
  setIsTimerStart: PropTypes.func,
  setIsTimerStop: PropTypes.func,
  setAccumulatedTime: PropTypes.func,
  accumulatedTime: PropTypes.number,
}
