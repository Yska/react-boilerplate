import React, { Fragment } from 'react'
import { withRouter } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import { useOn, observer } from 'react-sharedb'

const Router = React.memo(props => {
  const { routes } = props
  return pug`
    BrowserRouter
      Fragment
        each route, index in routes
          Route(...route key=index)
        History
  `
})

const History = withRouter(
  observer(({ history }) => {
    useOn('url', newUrl => {
      setTimeout(() => history.push(newUrl), 0)
    })
    return null
  })
)

export default Router
