import React from 'react'
import DjangoCSRFToken from 'django-react-csrftoken'
import helpers from '../utils/helpers'

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user_type: '',
      name: '',
      email: '',
      password: '',
      postal_code: '',
      error: '',
    }
    this.handleUserType = this.handleUserType.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handlePostalCode = this.handlePostalCode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUserType (event) {
    this.setState({
      user_type: event.target.value,
    })
  }

  handleName (event) {
    this.setState({
      name: event.target.value,
    })
  }

  handleEmail (event) {
    this.setState({
      email: event.target.value,
    })
  }

  handlePassword (event) {
    this.setState({
      password: event.target.value,
    })
  }

  handlePostalCode (event) {
    this.setState({
      postal_code: event.target.value,
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    if (
      (this.state.user_type === '') ||
      (this.state.name === '') ||
      (this.state.email === '') ||
      (this.state.password === '') ||
      (this.state.postal_code === '')
    ) {
      this.setState({
        error: 'All fields are required',
      })
    } else {
      let register = helpers.registerUser(
        this.state.user_type,
        this.state.name,
        this.state.email,
        this.state.password,
        this.state.postal_code
      )
      register
        .then((response) => {
          if (response.key) {
            location.reload()
          } else {
            if (response.email) {
              this.setState({
                error: response.email[0],
              })
            } else {
              this.setState({
                error: response.non_field_errors[0],
              })
            }
          }
        })
    }
  }

  render () {
    return (
      <div className='modal-view'>
        <div className='modal-header'>
          <h4 className='title'>Register</h4>
        </div>
        <div className='modal-content'>
          <form className='form' method='post' onSubmit={this.handleSubmit}>
            <DjangoCSRFToken />
            {this.state.error
              ? <p style={{ color: '#d0021b' }}>{this.state.error}</p>
              : ''
            }
            <div className='input-group'>
              <label className='radio'>
                <input type='radio' name='user_type' value='homeowner' onChange={this.handleUserType} />
                <span />
                Homeowner
              </label>
              <label className='radio'>
                <input type='radio' name='user_type' value='contractor' onChange={this.handleUserType} />
                <span />
                Contractor
              </label>
            </div>
            <div className='input-group'>
              <input className='input' name='name' placeholder='Name' type='text' required='' onChange={this.handleName} />
            </div>
            <div className='input-group'>
              <input className='input' name='email' placeholder='E-mail address' type='email' required='' onChange={this.handleEmail} />
            </div>
            <div className='input-group'>
              <input className='input' name='postal_code' placeholder='Zipcode' type='text' required='' onChange={this.handlePostalCode} />
            </div>
            <div className='input-group'>
              <input className='input' name='password1' placeholder='Password' type='password' required='' onChange={this.handlePassword} />
            </div>
            <button className='btn btn-md neutral-0' type='submit'>REGISTER</button>
          </form>
        </div>

        <div className='modal-footer'>
          <p className='paragraph'>Already have an account? &nbsp; <a className='link neutral-0 modal-transition' data-authentication='login' href=''>Login.</a></p>
        </div>
      </div>
    )
  }
};

export default Register
