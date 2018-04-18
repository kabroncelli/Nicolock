import React from 'react'
import ReactDOM from 'react-dom'

import AddToGallery from './components/AddToGallery'

const addToGalleryContainer = document.getElementById('add-image-to-gallery')
export let galleries
if (addToGalleryContainer) {
  galleries = JSON.parse(addToGalleryContainer.getAttribute('data-galleries'))
  ReactDOM.render(
    <AddToGallery
      galleries={galleries}
      imageId={parseInt(document.getElementById('featured-product-image').getAttribute('data-id'))}
      imageUrl={document.getElementById('featured-product-image').getAttribute('src')}
    />,
    addToGalleryContainer
  )
}
