import { Component, React } from 'react'
import PropTypes from 'prop-types'
import './item-add.css'

export default class ItemAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      min: '',
      sec: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  isOnlyNumber = (value) => {
    return /^\d+$/.test(value)
  }

  onMinutesChange = (e) => {
    if (this.isOnlyNumber(e.target.value) || e.target.value === '') {
      this.setState({
        min: e.target.value,
      })
    }
  }

  onSecondsChange = (e) => {
    if (this.isOnlyNumber(e.target.value) || e.target.value === '') {
      this.setState({
        sec: e.target.value,
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label } = this.state
    const { onItemAdded } = this.props
    if (label !== '' && (!/\s+/.test(label) || /\S+/.test(label))) {
      onItemAdded(label, Number(this.state.min) * 60 + Number(this.state.sec))
    }
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const addText = 'Click to add a task'
    const addMinutes = 'Min'
    const addSeconds = 'Sec'
    const { label, min, sec } = this.state
    return (
      <form className="item-add-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo main"
          onChange={this.onLabelChange}
          placeholder={addText}
          value={label}
        />
        <input
          type="text"
          className="new-todo small"
          onChange={this.onMinutesChange}
          value={min}
          placeholder={addMinutes}
        />
        <input
          type="text"
          className="new-todo small"
          onChange={this.onSecondsChange}
          value={sec}
          placeholder={addSeconds}
        />
        <button type="submit"></button> {/*Кнопа отправки формы сделана для того, чтобы сработал input*/}
      </form>
    )
  }
}

ItemAdd.defaultProps = {
  onItemAdded: () => {},
}

ItemAdd.propTypes = {
  onItemAdded: PropTypes.func,
}
