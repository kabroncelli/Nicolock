import React from 'react'
import PropTypes from 'prop-types'

const Modal = (props) => {
  return (
    <div className='modal-wrap is-visible'>
      <div className='modal is-map'>
        <div className='modal-view'>
          <span className='dismiss-modal' onClick={props.dismiss}>x</span>
          <div className='modal-header'>
            <h4 className='title'>{props.title}</h4>
          </div>
          <div className='modal-content'>
            <p className='paragraph'>{props.message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  dismiss: PropTypes.func.isRequired,
}

export default Modal
