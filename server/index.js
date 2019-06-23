import shareDbServer from 'dm-sharedb-server'
import getAppRoutes from '../main/routes'
import hooks from './hooks'
import accessControl from './accessControl'
import api from './api'
import 'helpers/initOrm'
import migration from './migration'
import initAdmins from './initAdmins'
import { setAdmin, preventIEBrowser } from './middleware'
let _backend

export default (done) => {
  shareDbServer({
    appRoutes: {
      main: getAppRoutes()
    },
    getHead: getHead,
    beforeStart: beforeStart,
    hooks: hooks,
    accessControl: accessControl
  }, (ee, options) => {
    ee.on('backend', (backend) => {
      _backend = backend
      initAdmins(backend)
    })

    ee.on('logs', (expressApp) => {})

    ee.on('afterSession', (expressApp) => {
      expressApp.use(preventIEBrowser)
      expressApp.post('/migrations/:name', (req, res) => {
        req.setTimeout(1800000) // 30min
        migration(req, res)
      })
    })

    ee.on('middleware', (expressApp) => {
      expressApp.use(setAdmin(_backend))
    })

    ee.on('routes', (expressApp) => {
      expressApp.use('/api', api)
    })

    ee.on('done', () => done && done())
  })
}

function beforeStart (backend, cb) {
  cb && cb()
}

function getHead (appName) {
  // we can overwrite the default loading styles here
  // but better if we add some fixes dm-sharedb-server
  return '<title>Mgt</title>'
}
