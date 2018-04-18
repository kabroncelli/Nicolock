import React from 'react'
import PropTypes from 'prop-types'

class TextField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
    }
  }

  valueEntered = (e) => {
    const newText = e.target.value
    this.setState({text: newText})
    this.props.valueEntered(newText)
  }

  render () {
    return (
      <span>
        <label className='label'>{this.props.label}</label>
        <input
          type={this.props.type}
          className='input'
          onChange={this.valueEntered}
          value={this.state.text} />
      </span>
    )
  }
}

TextField.propTypes = {
  valueEntered: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
}

TextField.defaultProps = {
  type: 'text',
}

export default TextField
