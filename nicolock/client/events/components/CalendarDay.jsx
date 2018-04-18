import React from 'react'
import PropTypes from 'prop-types'

const CalendarDay = ({ dayNumber, events }) => {
  return (
    <div className='day'>
      <span className='day-number'>{dayNumber}</span>
      <div className='day-events'>
        {events.map(event =>
          <a className='link neutral-0' href={`/events/${event.slug}`} key={event.id}>{event.name}</a>
        )}
      </div>
    </div>
  )
}

CalendarDay.propTypes = {
  dayNumber: PropTypes.number,
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    slug: PropTypes.string,
  })),
}

export default CalendarDay
