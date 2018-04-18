import React from 'react'
import PropTypes from 'prop-types'

class Dropdown extends React.Component {
  static propTypes = {
    valueEntered: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
  }

  constructor (props) {
    super(props)
    let initialRadius
    if (props.options.length > 0) {
      initialRadius = props.options[0]
      props.valueEntered(initialRadius)
    }
    this.state = {
      value: initialRadius || '',
    }
  }

  valueEntered = (e) => {
    let newText
    try {
      newText = parseInt(e.target.value)
    } catch (err) {
      return
    }
    this.setState({value: newText})
    this.props.valueEntered(newText)
  }

  renderOptions () {
    return (
      this.props.options.map(option =>
        <option key={option} value={option}>{option}</option>
      )
    )
  }

  render () {
    return (
      <span>
        <label className='label'>{this.props.label}</label>
        <select className='react-dropdown' onChange={this.valueEntered}>
          {this.renderOptions()}
        </select>
      </span>
    )
  }
}

export default Dropdown
