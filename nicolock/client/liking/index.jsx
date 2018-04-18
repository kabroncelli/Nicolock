import React from 'react'
import ReactDOM from 'react-dom'

import Like from './App'

const appContainter = document.getElementById('like')
ReactDOM.render(
  <Like
    url={appContainter.getAttribute('data-url')}
    id={appContainter.getAttribute('data-video')}
    type={appContainter.getAttribute('data-type')}
    count={appContainter.getAttribute('data-count')}
  />,
  appContainter
)
