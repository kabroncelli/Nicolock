import { SELECT_IMAGE, UPDATE_IMAGE } from '../actions/galleryActions'

const galleryCarousel = document.getElementById('gallery-carousel')
const galleryData = JSON.parse(galleryCarousel.getAttribute('data-gallery'))
export const selectedImage = galleryData.items.length > 0 ? galleryData.items[0] : undefined
const projectName = galleryData.gallery_type === 'contractor' ? galleryCarousel.getAttribute('data-project-name') : undefined

const initialState = {
  projectName: projectName,
  galleryData: galleryData,
  selectedImage: selectedImage,
}

export default function Gallery (state = initialState, action) {
  switch (action.type) {
    case SELECT_IMAGE:
      return {
        ...state,
        selectedImage: action.image,
      }
    case UPDATE_IMAGE:
      const index = state.galleryData.items.findIndex(item => item.id === action.updatedImage.id)
      const galleryItems = [
        ...state.galleryData.items.slice(0, index),
        action.updatedImage,
        ...state.galleryData.items.slice(index + 1),
      ]
      const newState = {
        projectName: state.projectName,
        galleryData: {
          id: state.galleryData.id,
          items: galleryItems,
          gallery_type: state.galleryData.gallery_type,
          name: state.galleryData.name,
          description: state.galleryData.description,
          products_used: state.galleryData.products_used,
          patterns_used: state.galleryData.patterns_used,
          slug: state.galleryData.slug,
          user: state.galleryData.user,
          project: state.galleryData.project,
        },
        selectedImage: action.updatedImage,
      }
      return newState

    default:
      return state
  }
}
