import axios from 'axios'

const helpers = {

  getNearbyZipCodes (zipCode, radius) {
    return axios.get(`/rest/postal-codes/?radius=${radius}&postal_code=${zipCode}`)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },

  getItems (resourceUrl, zipCodes) {
    const data = {
      postal_codes: zipCodes,
    }
    return axios.post(resourceUrl, data)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error
      })
  },

  saveContractor (csrfToken, id) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    }
    return axios.post(`/rest/contractor-list/edit/${id}`, {}, config)
      .then((data) => {
        return data
      })
      .catch((error) => {
        return error
      })
  },
}

export default helpers
