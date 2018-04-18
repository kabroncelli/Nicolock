import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'
import helpers from '../utils/helpers'

class GalleryAddContractor extends React.Component {
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
    let contractorId = this.props.contractorId
    let saveContractor = helpers.saveContractor(this.csrfToken, contractorId)
    saveContractor
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            message: `${this.props.contractorName} has been saved to your list of contractors`,
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
            message: `There was a problem saving ${this.props.contractorName}`,
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
      <div>
        <a className='link neutral-4 save-contractor' href='#' onClick={this.confirmContractor}>Save Contractor to My Contractor List</a>
        <div className={'modal-wrap modal-light ' + (this.state.modalVisible ? 'is-visible' : '')}>
          <div className='modal'>
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
                  : <p className='paragraph'>Would you like to save {this.props.contractorName} to your list of contractors?</p>
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

GalleryAddContractor.propTypes = {
  contractorId: PropTypes.number,
  contractorName: PropTypes.string,
  dismissCard: PropTypes.func,
}

export default GalleryAddContractor
