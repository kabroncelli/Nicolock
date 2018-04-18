import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import DatePicker from './components/DatePicker'
import Calendar from './components/Calendar'

class App extends React.Component {
  static propTypes = {
    date: PropTypes.object,
  }

  constructor (props) {
    super(props)
    this.state = {
      date: props.date || moment(),
    }
  }

  dateChanged = (date) => {
    this.setState({date: date})
  }

  render () {
    return (
      <div>
        <div className='row'>
          <h1 className='title'>Events &amp;<br />Training</h1>
          <DatePicker
            date={this.state.date}
            dateChange={this.dateChanged} />
        </div>
        <Calendar
          date={this.state.date}
          dateChange={this.dateChanged} />
      </div>
    )
  }
}

export default App
