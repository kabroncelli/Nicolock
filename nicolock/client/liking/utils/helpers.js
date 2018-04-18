import axios from 'axios'

const like = {

  addLike (url) {
    return axios.post(`${url}`)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },

}

export default like
