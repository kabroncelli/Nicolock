import React from 'react'
import PropTypes from 'prop-types'

const CalendarControl = ({ backwardClick, forwardClick, month }) => {
  return (
    <div>
      <div className='calendar-control'>
        <div className='controls'>
          <a className='calendar-back' onClick={backwardClick} href='#' />
          <span>{month}</span>
          <a className='calendar-forward' onClick={forwardClick} href='#' />
        </div>
      </div>
    </div>
  )
}

CalendarControl.propTypes = {
  month: PropTypes.string.isRequired,
  backwardClick: PropTypes.func.isRequired,
  forwardClick: PropTypes.func.isRequired,
}

export default CalendarControl
