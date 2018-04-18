import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'

import Modal from './Modal'
import EnvelopeIcon from '../../nico-map/components/EnvelopeIcon'
import ReceiverIcon from '../../nico-map/components/ReceiverIcon'
import helpers from '../../nico-map/utils/helpers'

class Panel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      success: false,
    }
  }

  saveContractor = (e) => {
    e.preventDefault()
    const cookies = new Cookies()
    const csrfToken = cookies.get('csrftoken')
    helpers.saveContractor(csrfToken, this.props.id)
      .then((response) => {
        this.setState({success: true})
      })
  }

  renderCertification = (certification) => {
    return (
      <span
        key={certification}
        className='certification'>{certification}</span>
    )
  }

  dismissModal = () => {
    this.setState({success: false})
  }

  displayModal = () => {
    if (!this.state.success) {
      return
    }
    const modal = (
      <Modal
        title='Success!'
        dismiss={this.dismissModal}
        message='The contractor has been successfully saved to your list of contractors.' />
    )
    const container = document.getElementById('modal-root')
    return ReactDOM.createPortal(
      modal, container
    )
  }

  render () {
    return (
      <div className='panel'>
        <div className='heading'>{this.props.companyName}</div>
        <div>{this.props.city}, {this.props.state}</div>
        <div>{this.props.phoneNumber}</div>
        <div className='panel-footer'>
          <div>
            {this.props.authenticated &&
              <span>
                <a className='link' href='#' onClick={this.saveContractor}>Save Contact</a>
              </span>
            }
            {this.props.profileUrl &&
              <span>
                {this.props.authenticated &&
                  <span>&nbsp; | &nbsp;</span>
                }
                <a className='link' href={this.props.profileUrl}>View Profile</a>
              </span>
            }
          </div>
          <div className='row push-half--top'>
            <span>
              {this.props.email &&
                <a className='icon' href={`mailto:${this.props.email}`}>
                  <EnvelopeIcon />
                </a>
              }
              {this.props.phoneNumber &&
                <a className='icon' href={`tel:${this.props.phoneNumber}`}>
                  <ReceiverIcon />
                </a>
              }
            </span>
            <span className='certifications'>
              {this.props.certifications.map(this.renderCertification)}
            </span>
          </div>
        </div>
        {this.displayModal()}
      </div>
    )
  }
}

Panel.propTypes = {
  companyName: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.number.isRequired,
  authenticated: PropTypes.bool,
  profileUrl: PropTypes.string,
  certifications: PropTypes.arrayOf(PropTypes.string),
}

Panel.defaultProps = {
  certifications: [],
}

export default Panel
