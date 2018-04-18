import axios from 'axios'

const video = {

  getTags () {
    return axios.get(`/rest/tags`)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },

  getVideos () {
    return axios.get(`/rest/videos`)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },

  getVideosByTag (tagId) {
    return axios.get(`/rest/tags/${tagId}/videos`)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },

}

export default video
