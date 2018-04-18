import axios from 'axios'

const products = {
  saveImage (csrfToken, imageId, galleryId, imageUrl, notes) {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    }
    let body = {
      'name': 'Product Image',
      'color': '',
      'notes': notes,
      'original': imageUrl,
      'gallery': galleryId,
    }
    return axios.post(`/rest/items/create-from-image/${imageId}`, body, config)
      .then((data) => {
        data.success = true
        return data
      })
      .catch((error) => {
        return error
      })
  },
}

export default products
