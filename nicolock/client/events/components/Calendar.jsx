import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import helpers from '../utils/helpers'
import CalendarDay from './CalendarDay'
import CalendarControl from './CalendarControl'

class Calendar extends React.Component {
  static propTypes = {
    date: PropTypes.object,
    dateChange: PropTypes.func,
  }

  constructor (props) {
    super(props)
    const date = this.props.date || moment()
    this.state = this.getStateFromDate(date)
    this.state.events = []
  }

  componentDidMount () {
    this.loadEventsForDate(this.state.date)
  }

  componentWillReceiveProps (props) {
    const date = props.date || moment()
    this.setState(this.getStateFromDate(date))
    this.loadEventsForDate(date)
  }

  loadEventsForDate (date) {
    helpers.getEvents(date.format('M'), date.format('YYYY')).then(events => {
      this.setState({events: events})
    })
  }

  getStateFromDate (date) {
    return {
      date: date,
      currentMonth: date.format('MMMM'),
      currentYear: date.format('YYYY'),
      weeks: this.getWeeks(date),
    }
  }

  getWeeks (date) {
    const firstDay = date.clone().startOf('month')
    const lastDay = date.clone().endOf('month')
    // Need to start counting from a sunday
    // use the weekday() function to find out how many
    // days from the previous month we need and
    // how many days from the next month
    firstDay.subtract(firstDay.weekday(), 'days')
    lastDay.add(6 - lastDay.weekday(), 'days')

    let currentDate = firstDay.clone()
    let weeks = []
    let currentRow = 0
    while (currentDate.isBefore(lastDay)) {
      weeks.push([])
      for (var i = 0; i < 7; i++) {
        weeks[currentRow].push(currentDate.clone())
        currentDate.add(1, 'days')
      }
      currentRow++
    }
    return weeks
  }

  moveCalendarForward = (e) => {
    e.preventDefault()
    const newDate = this.state.date.clone().endOf('month').add(1, 'days')
    this.setState(this.getStateFromDate(newDate))
    this.props.dateChange(newDate)
    this.loadEventsForDate(newDate)
  }

  moveCalendarBackward = (e) => {
    e.preventDefault()
    const newDate = this.state.date.clone().startOf('month').subtract(1, 'days')
    this.setState(this.getStateFromDate(newDate))
    this.props.dateChange(newDate)
    this.loadEventsForDate(newDate)
  }

  renderCalendar () {
    return (
      <div>
        <div className='calendar-header'>
          {moment.weekdays().map((day, index) =>
            <span key={index}>{day}</span>
          )}
        </div>
        {this.state.weeks.map((week, index) =>
          <div className='calendar-row' key={index}>
            {week.map(day =>
              <CalendarDay
                dayNumber={parseInt(day.format('D'))}
                events={this.state.events.filter(event => moment(event.start_date, 'YYYY-MM-DD').format('MDY') === day.format('MDY'))}
                key={day.format('MDY')} />
            )}
          </div>
        )}
      </div>
    )
  }

  render () {
    return (
      <div className='calendar'>
        <CalendarControl
          forwardClick={this.moveCalendarForward}
          backwardClick={this.moveCalendarBackward}
          month={this.state.currentMonth} />
        {this.renderCalendar()}
      </div>
    )
  }
}

export default Calendar
