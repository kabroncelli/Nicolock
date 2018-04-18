import React from 'react'

import SignIn from './components/SignIn'
import Register from './components/Register'
import Forgot from './components/Forgot'

const AccountApp = (props) => {
  return (
    <div className='modal-container position-login'>
      <Register />
      <SignIn />
      <Forgot />
    </div>
  )
}

export default AccountApp
