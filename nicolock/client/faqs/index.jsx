import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

Object.defineProperty(Array.prototype, 'group', {
  enumerable: false,
  value: function (key) {
    var map = {}
    this.map(e => ({k: key(e), d: e})).forEach(e => {
      map[e.k] = map[e.k] || []
      map[e.k].push(e.d)
    })
    return Object.keys(map).map(k => ({key: k, data: map[k]}))
  },
})

Object.defineProperty(Array.prototype, 'groupToArray', {
  enumerable: false,
  value: function (key) {
    var grouping = this.group(key)
    return grouping.map(group => group.data)
  },
})

const appContainter = document.getElementById('app')
ReactDOM.render(
  <App />,
  appContainter
)
