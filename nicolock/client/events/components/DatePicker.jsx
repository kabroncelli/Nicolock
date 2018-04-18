import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class Datepicker extends React.Component {
  static propTypes = {
    dateChange: PropTypes.func.isRequired,
    date: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = this.getStateFromDate(props.date)
  }

  componentWillReceiveProps (props) {
    const date = props.date || moment()
    this.setState(this.getStateFromDate(date))
  }

  getStateFromDate (date) {
    return {
      monthInput: date.format('MM'),
      dayInput: date.format('DD'),
      yearInput: date.format('YYYY'),
      month: date.format('MM'),
      day: date.format('DD'),
      year: date.format('YYYY'),
    }
  }

  monthChange = (e) => {
    const stringEntered = e.target.value.replace(' ', '')
    if (stringEntered.length > 2) {
      return null
    }
    this.setState({
      monthInput: stringEntered,
    })
    const valueEntered = parseInt(stringEntered)
    if (isNaN(valueEntered)) {
      return null
    }
    if (valueEntered < 1 || valueEntered > 12) {
      return null
    }
    // If the input was actually valid we can save it
    this.setState({month: valueEntered})
  }

  dayChange = (e) => {
    const stringEntered = e.target.value.replace(' ', '')
    if (stringEntered.length > 2) {
      return null
    }
    this.setState({
      dayInput: stringEntered,
    })
    const valueEntered = parseInt(stringEntered)
    if (isNaN(valueEntered)) {
      return null
    }
    if (valueEntered < 1 || valueEntered > 31) {
      return null
    }
    // If the input was actually valid we can save it
    this.setState({day: valueEntered})
  }

  yearChange = (e) => {
    const stringEntered = e.target.value.replace(' ', '')
    if (stringEntered.length > 4) {
      return null
    }
    this.setState({
      yearInput: stringEntered,
    })
    const valueEntered = parseInt(stringEntered)
    if (isNaN(valueEntered)) {
      return null
    }
    // If the input was actually valid we can save it
    this.setState({year: valueEntered})
  }

  findEventsSubmit = (e) => {
    e.preventDefault()
    const newDate = moment(`${this.state.month}-${this.state.day}-${this.state.year}`, 'M-D-YYYY')
    this.props.dateChange(newDate)
    this.setState(this.getStateFromDate(newDate))
  }

  render () {
    return (
      <form onSubmit={this.findEventsSubmit} className='row picker-wrap'>
        <span className='text'>
          Search<br />by date
        </span>
        <div className='picker'>
          <input
            onChange={this.monthChange}
            value={this.state.monthInput}
            type='text' placeholder='--' /> /
          <input
            onChange={this.dayChange}
            value={this.state.dayInput}
            type='text'
            placeholder='--' /> /
          <input
            onChange={this.yearChange}
            value={this.state.yearInput}
            type='text' placeholder='--' />
        </div>
        <button className='btn btn-sm hollow'>Find events</button>
      </form>
    )
  }
}

export default Datepicker
