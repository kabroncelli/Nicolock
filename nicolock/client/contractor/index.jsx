import React from 'react'
import ReactDOM from 'react-dom'

import ContractorList from './components/ContractorList'
import ContractorProfile from './components/ProfileApp'

const listAppContainer = document.getElementById('contractor-list')
if (listAppContainer) {
  let isEditable = listAppContainer.getAttribute('data-editable')
  isEditable = JSON.parse(isEditable)
  ReactDOM.render(
    <ContractorList
      editable={isEditable} />,
    listAppContainer
  )
}

const profileAppContainer = document.getElementById('contractor-profile')
if (profileAppContainer) {
  let editable = profileAppContainer.getAttribute('data-editable')
  editable = JSON.parse(editable)
  ReactDOM.render(
    <ContractorProfile
      name={profileAppContainer.getAttribute('data-name')}
      address_line_1={profileAppContainer.getAttribute('data-address-1')}
      address_line_2={profileAppContainer.getAttribute('data-address-2')}
      city={profileAppContainer.getAttribute('data-city')}
      state={profileAppContainer.getAttribute('data-state')}
      postal_code={profileAppContainer.getAttribute('data-postal-code')}
      website={profileAppContainer.getAttribute('data-website')}
      phone={profileAppContainer.getAttribute('data-phone')}
      email={profileAppContainer.getAttribute('data-email')}
      contact={profileAppContainer.getAttribute('data-contact')}
      area={profileAppContainer.getAttribute('data-area')}
      specialties={profileAppContainer.getAttribute('data-specialties')}
      description={profileAppContainer.getAttribute('data-description')}
      editable={editable} />,
    profileAppContainer
  )
}
