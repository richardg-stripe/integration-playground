import _ from 'lodash'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import URI from 'urijs'
import routes from './routes'

export default () => {
  return (
    <Router>
      <Switch>
        {_.map(routes, (route, i) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              render={routerProps => {
                const queryParams = URI()
                  .query(routerProps.history.location.search)
                  .query(true)
                const props = { ...route.props, ...routerProps, queryParams: queryParams }
                return <route.component {...props} />
              }}
            />
          )
        })}
      </Switch>
    </Router>
  )
}
