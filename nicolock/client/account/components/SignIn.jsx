import React from 'react'
import DjangoCSRFToken from 'django-react-csrftoken'
import helpers from '../utils/helpers'

class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: '',
    }
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUsername (event) {
    this.setState({
      username: event.target.value,
    })
  }

  handlePassword (event) {
    this.setState({
      password: event.target.value,
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    let authenticated = helpers.authenticateUser(this.state.username, this.state.password)
    authenticated
      .then((response) => {
        if (response.key) {
          localStorage.setItem('Login', 'You have successfully logged in.')
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

  render () {
    return (
      <div className='modal-view'>
        <div className='modal-header'>
          <h4 className='title'>Login</h4>
        </div>

        <div className='modal-content'>
          <form className='form' method='post' onSubmit={this.handleSubmit}>
            <DjangoCSRFToken />
            <input type='hidden' name='next' value='{{ request.path }}' />
            {this.state.error
              ? <p style={{ color: '#d0021b' }}>{this.state.error}</p>
              : ''
            }
            <div className='input-group'>
              <svg className='icon neutral-0' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 17.46 13.97'>
                <path className='path' d='M17.45,2.09a.73.73,0,0,1-.28.65c-.32.43-7.86,5.67-7.86,5.67A1.1,1.1,0,0,1,8,8.4L.22,2.67A1.44,1.44,0,0,1,0,1.9v.34A2.24,2.24,0,0,1,2.24,0h13A2.14,2.14,0,0,1,17.45,2.09Z' />
                <path className='path' d='M9.41,9.95,17,4.5a.3.3,0,0,1,.47.24v7A2.23,2.23,0,0,1,15.23,14h-13A2.25,2.25,0,0,1,0,11.72v-7a.3.3,0,0,1,.48-.24L7.94,9.94A1.26,1.26,0,0,0,9.41,9.95Z' />
              </svg>
              <input className='input' name='login' placeholder='E-mail address' type='email' required='' onChange={this.handleUsername} />
            </div>
            <div className='input-group'>
              <svg className='icon neutral-0' version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'
                viewBox='0 0 512 512'>
                <path className='path' d='M256.001,276.673c-28.017,0-50.81,22.793-50.81,50.81c0,13.895,5.775,27.33,15.858,36.891v45.875
                  c0,19.273,15.68,34.953,34.953,34.953s34.953-15.68,34.953-34.953v-45.875c10.078-9.555,15.857-22.993,15.857-36.891
                  C306.81,299.466,284.016,276.673,256.001,276.673z M273.979,346.558c-4.851,4.571-7.633,10.96-7.633,17.53v46.161
                  c0,5.705-4.64,10.345-10.345,10.345c-5.704,0-10.345-4.64-10.345-10.345v-46.161c0-6.569-2.782-12.957-7.63-17.527
                  c-5.307-5.003-8.229-11.778-8.229-19.078c0-14.447,11.755-26.202,26.202-26.202c14.447,0,26.202,11.755,26.202,26.202
                  C282.203,334.783,279.281,341.558,273.979,346.558z' />
                <path className='path' d='M404.979,209.876h-36.908v-97.804C368.071,50.275,317.795,0,256.001,0C194.205,0,143.93,50.275,143.93,112.072v97.804
                  h-36.909c-20.353,0-36.911,16.559-36.911,36.911v228.301c0,20.353,16.558,36.911,36.911,36.911h297.958
                  c20.353,0,36.911-16.558,36.911-36.911V246.788C441.89,226.435,425.332,209.876,404.979,209.876z M168.536,112.072
                  c0-48.227,39.236-87.464,87.464-87.464c48.227,0,87.463,39.237,87.463,87.464v97.804H168.536V112.072z M417.283,475.089
                  L417.283,475.089c0,6.784-5.52,12.304-12.304,12.304H107.021c-6.784,0-12.304-5.519-12.304-12.304V246.788
                  c0-6.784,5.52-12.304,12.304-12.304h297.958c6.784,0,12.304,5.519,12.304,12.304V475.089z' />
              </svg>
              <input className='input' name='password' placeholder='Password' type='password' required='' onChange={this.handlePassword} />
            </div>
            <button className='btn btn-md neutral-0' type='submit'>LOGIN</button>
            <div className='input-group'>
              <a className='link neutral-0 modal-transition' data-authentication='reset' href=''>Forgot your password?</a>
            </div>
          </form>
        </div>

        <div className='modal-footer'>
          <p className='paragraph'>Don't have an account? &nbsp; <a className='link neutral-0 modal-transition' data-authentication='register' href=''>Sign up.</a></p>
        </div>
      </div>
    )
  }
};

export default SignIn
