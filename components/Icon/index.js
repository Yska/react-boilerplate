import React from 'react'
import { observer } from 'react-sharedb/lib/hooks/observer'
const sprite = 'sprite.svg'

export default observer(({
  name, style, size = 24, width, height, ...props
}) => {
  if (!name) return null

  const sizes = {
    width: width || size,
    height: height || size
  }

  return pug`
    svg(
      ...props
      ...sizes
      style={style}
    )
      use(xlinkHref=sprite + '#' + name)
  `
})
