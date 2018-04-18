import axios from 'axios'

const galleryData = {

  saveNotes (csrfToken, value, id) {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    }
    return axios.patch(`/rest/items/${id}`, {
      notes: value,
    }, config)
  },

  saveGalleryField (csrfToken, field, value, id) {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    }
    return axios.patch(`/rest/galleries/${id}`, {
      [field]: value,
    }, config)
  },

  saveContractor (csrfToken, id) {
    let config = {
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

export default galleryData
