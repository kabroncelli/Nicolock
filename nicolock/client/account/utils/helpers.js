import axios from 'axios'

const account = {
  authenticateUser (username, password) {
    let config = {
      headers: {'Content-Type': 'application/json'},
    }
    return axios.post(`/rest-auth/login/`, {
      'email': username,
      'password': password,
    }, config)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },
  registerUser (userType, name, email, password, postalCode) {
    let config = {
      headers: {'Content-Type': 'application/json'},
    }
    return axios.post(`/rest-auth/registration/`, {
      'user_type': userType,
      'name': name,
      'email': email,
      'password': password,
      'postal_code': postalCode,
    }, config)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },
  resetPassword (email) {
    let config = {
      headers: {'Content-Type': 'application/json'},
    }
    return axios.post(`/rest-auth/password/reset/`, {
      'email': email,
    }, config)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },

}

export default account
