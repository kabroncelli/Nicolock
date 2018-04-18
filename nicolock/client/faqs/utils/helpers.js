import axios from 'axios'

const faq = {

  getFaqs () {
    return axios.get(`/rest/faqs/`)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },

  getFaqById (id) {
    return axios.get(`/rest/faqs/${id}`)
      .then((data) => {
        return data.data
      })
      .catch((error) => {
        return error.response.data
      })
  },

}

export default faq
