import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const appContainter = document.getElementById('app')
ReactDOM.render(
  <App
    resourceUrl={appContainter.getAttribute('data-url')}
    resourceType={appContainter.getAttribute('data-type')}
    description={appContainter.getAttribute('data-desc')} />,
  appContainter
)
