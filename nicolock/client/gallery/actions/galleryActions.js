export const SELECT_IMAGE = 'gallery/SELECT_IMAGE'
export const UPDATE_IMAGE = 'gallery/UPDATE_IMAGE'

export const selectImage = (image) => {
  return {
    type: SELECT_IMAGE,
    image,
  }
}

export const updateImage = (updatedImage) => {
  return {
    type: UPDATE_IMAGE,
    updatedImage,
  }
}
