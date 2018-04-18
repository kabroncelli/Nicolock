import axios from 'axios'

const helpers = {
  getEvents (month, year) {
    return axios.get(`/rest/events/?month=${month}&${year}`)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },
}

export default helpers
