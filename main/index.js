import 'helpers/initOrm'
import { $root } from 'react-sharedb'
import React from 'react'
import getRoutes from './routes'
import * as pages from './pages'
import Router from './Router'
const routes = getRoutes(pages)

if ($root.get('_session.env.STAGE') !== 'production') {
  global.model = $root
}

export default React.memo(props => {
  return pug`
    Router(routes=routes)
  `
})
