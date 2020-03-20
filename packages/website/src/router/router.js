import _ from 'lodash'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './routes'

export default () => {
  return (
    <Router>
      <Switch>
        {_.map(routes, (route, i) => {
          return (
            <Route key={route.path} path={route.path}>
              <route.component {...route.props} />
            </Route>
          )
        })}
      </Switch>
    </Router>
  )
}
