import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'
import EnvelopeIcon from './EnvelopeIcon'
import ReceiverIcon from './ReceiverIcon'
import helpers from '../utils/helpers'

class Card extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
      message: '',
      messageVisible: false,
    }

    let cookies = new Cookies()
    this.csrfToken = cookies.get('csrftoken')

    this.dismissCard = this.dismissCard.bind(this)
    this.dismissModal = this.dismissModal.bind(this)
    this.confirmContractor = this.confirmContractor.bind(this)
    this.saveContractor = this.saveContractor.bind(this)
  }

  dismissCard (event) {
    this.props.dismissCard(event)
  }

  dismissModal (event) {
    this.setState({
      modalVisible: false,
    })
  }

  confirmContractor (event) {
    event.preventDefault()
    this.setState({
      modalVisible: true,
    })
  }

  saveContractor (event) {
    let contractorId = this.props.id
    let saveContractor = helpers.saveContractor(this.csrfToken, contractorId)
    saveContractor
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            message: `${this.props.name} has been saved to your list of contractors`,
            messageVisible: true,
          })
          setTimeout(() => {
            this.setState({
              modalVisible: false,
              messageVisible: false,
            })
          }, 2000)
        } else {
          this.setState({
            message: `There was a problem saving ${this.props.name}`,
            messageVisible: true,
          })
          setTimeout(() => {
            this.setState({
              messageVisible: false,
            })
          }, 2000)
        }
      })
  }

  render () {
    return (
      <div className='single-rep-container'>
        <span className='dismiss-card' onClick={this.dismissCard}>x</span>
        {this.props.imageUrl &&
          <div className='single-rep-img'>
            <img src={this.props.imageUrl} />
          </div>
        }
        <div className='single-rep-info'>
          <div>
            <p className='rep-info'>{this.props.name}</p>
            {this.props.city && this.props.state
              ? <p className='rep-info rep-info-sm'>{this.props.city}, {this.props.state}</p>
              : <p className='rep-info rep-info-sm'>{this.props.address}</p>
            }
            <p className='rep-info rep-info-sm'>{this.props.phone}</p>
          </div>
          <div>
            {this.props.galleryUrl
              ? <a className='' href={this.props.galleryUrl}>View Project Gallery</a>
              : undefined
            }
            {this.props.authenticated
              ? <a className='link neutral-0 rep-info-sm' href='#' onClick={this.confirmContractor}>Save Contact Info</a>
              : undefined
            }
          </div>
          <div className='rep-icon-container'>
            {this.props.email &&
              <a href={`mailto:${this.props.email}`} className='rep-icon'>
                <EnvelopeIcon />
              </a>
            }
            <a href={`tel:${this.props.phone}`} className='rep-icon'>
              <ReceiverIcon />
            </a>
          </div>
        </div>
        <div className={'modal-wrap ' + (this.state.modalVisible ? 'is-visible' : '')}>
          <div className='modal is-map'>
            <div className='modal-view'>
              <span className='dismiss-modal' onClick={this.dismissModal}>x</span>
              <div className='modal-header'>
                { this.state.messageVisible
                  ? <h4 className='title'>Success</h4>
                  : <h4 className='title'>Save Contractor</h4>
                }
              </div>
              <div className='modal-content'>
                { this.state.messageVisible
                  ? <p className='paragraph'>{this.state.message}</p>
                  : <p className='paragraph'>Would you like to save {this.props.name} to your list of contractors?</p>
                }
                { this.state.messageVisible
                  ? <button className='btn btn-md neutral-0'>SAVED</button>
                  : <button className='btn btn-md neutral-0' onClick={this.saveContractor}>SAVE</button>
                }
              </div>
              <div className='modal-footer' />
            </div>
          </div>
        </div>
      </div>
    )
  }
};

Card.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  state: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string,
  imageUrl: PropTypes.string,
  galleryUrl: PropTypes.string,
  dismissCard: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
}

export default Card
