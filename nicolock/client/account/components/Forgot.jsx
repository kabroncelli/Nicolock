import React from 'react'
import DjangoCSRFToken from 'django-react-csrftoken'
import helpers from '../utils/helpers'

class Forgot extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      error: '',
    }
    this.handleEmail = this.handleEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmail (event) {
    this.setState({
      email: event.target.value,
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    let reset = helpers.resetPassword(this.state.email)
    reset
      .then((response) => {
        if (response) {
          if (response.email) {
            this.setState({
              error: response.email[0],
            })
          } else {
            this.setState({
              error: response.detail,
            })
          }
        }
      })
  }

  render () {
    return (
      <div className='modal-view'>
        <div className='modal-header'>
          <h4 className='title'>Password Reset</h4>
        </div>
        <div className='modal-content'>
          <form className='form' method='post' onSubmit={this.handleSubmit}>
            <DjangoCSRFToken />
            {this.state.error
              ? <p style={{ color: '#d0021b' }}>{this.state.error}</p>
              : ''
            }
            <div className='input-group'>
              <p className='paragraph'>Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</p>
            </div>
            <div className='input-group'>
              <input className='input' name='email' placeholder='E-mail address' type='email' required='' onChange={this.handleEmail} />
            </div>
            <button className='btn btn-md neutral-0' type='submit'>RESET MY PASSWORD</button>
            <div className='input-group'>
              <p className='paragraph'><a className='link neutral-0 modal-transition' href='' data-authentication='login'>Cancel</a></p>
            </div>
          </form>
        </div>

        <div className='modal-footer' />
      </div>
    )
  }
};

export default Forgot
