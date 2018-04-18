import React from 'react'
import PropTypes from 'prop-types'

class TextField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      number: '',
    }
  }

  valueEntered (e) {
    const newNumber = e.target.value
    this.setState({number: newNumber})
    this.props.valueEntered(newNumber)
  }

  render () {
    return (
      <div>
        <label className='label'>{this.props.label}</label>
        <input
          type='text'
          className='input'
          onChange={(e) => this.valueEntered(e)}
          value={this.state.number} />
      </div>
    )
  }
};

TextField.propTypes = {
  valueEntered: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default TextField
