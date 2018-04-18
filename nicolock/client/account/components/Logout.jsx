import React from 'react'
import DjangoCSRFToken from 'django-react-csrftoken'

const Logout = (props) => {
  return (
    <div className='modal-view'>
      <div className='modal-header'>
        <h4 className='title'>Logout</h4>
      </div>
      <div className='modal-content'>
        <form className='form' method='post' action="{% url 'account_logout' %}">
          <DjangoCSRFToken />
          <div className='input-group'>
            <p className='paragraph'>Are you sure you want to logout?</p>
          </div>
          <button className='btn btn-md neutral-0' type='submit'>LOGOUT</button>
        </form>
      </div>
      <div className='modal-footer' />
    </div>
  )
}

export default Logout
