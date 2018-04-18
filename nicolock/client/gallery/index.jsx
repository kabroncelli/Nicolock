import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './reducers'

import GalleryCarousel from './components/GalleryCarousel'
import GalleryItemData from './components/GalleryItemData'
import GalleryAddContractor from './components/GalleryAddContractor'

const galleryCarousel = document.getElementById('gallery-carousel')
export const galleryData = JSON.parse(galleryCarousel.getAttribute('data-gallery'))

if (galleryCarousel) {
  let isEditable = galleryCarousel.getAttribute('data-editable')
  isEditable = JSON.parse(isEditable)
  ReactDOM.render(
    <Provider store={store}>
      <GalleryCarousel
        galleryData={galleryData}
        editable={isEditable}
      />
    </Provider>,
    galleryCarousel
  )
}

const galleryItemData = document.getElementById('gallery-item-data')
if (galleryItemData) {
  let editable = galleryItemData.getAttribute('data-editable')
  editable = JSON.parse(editable)
  ReactDOM.render(
    <Provider store={store}>
      <GalleryItemData
        editable={editable}
      />
    </Provider>,
    galleryItemData
  )
}

const galleryAddContractor = document.getElementById('gallery-add-contractor')
if (galleryAddContractor) {
  let contractorId = parseInt(galleryAddContractor.getAttribute('data-contractor-id'))
  ReactDOM.render(
    <GalleryAddContractor
      contractorId={contractorId}
      contractorName={galleryAddContractor.getAttribute('data-contractor-name')}
    />,
    galleryAddContractor
  )
}
