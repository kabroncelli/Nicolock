import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const appContainer = document.getElementById('app')
let authenticated = appContainer.getAttribute('data-authenticated')
authenticated = JSON.parse(authenticated)

ReactDOM.render(
  <App
    resourceUrl={appContainer.getAttribute('data-url')}
    resourceType={appContainer.getAttribute('data-type')}
    description={appContainer.getAttribute('data-desc')}
    authenticated={authenticated} />,
  appContainer
)
