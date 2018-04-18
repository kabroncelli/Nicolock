import axios from 'axios'

const search = {

  getSearchResults (term) {
    return axios.get(`/rest/search/?q=${term}`)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },
}

export default search
