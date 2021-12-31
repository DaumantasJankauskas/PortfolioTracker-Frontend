import React from 'react'
import ReactDOM from 'react-dom'
import Snowfall from 'react-snowfall'

ReactDOM.render(
  <div style={{ height: 400, width: 400, background: '#282c34' }}>
    <Snowfall />
  </div>,
  document.querySelector('#app')
)