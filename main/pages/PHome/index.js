import React from 'react'
import Icon from 'components/Icon'
import './index.styl'

export default (props) => {
  return pug`
    div.root
      h2 Hello world
      Icon.icon(name='send')
  `
}
