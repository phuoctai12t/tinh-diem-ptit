import { ToTopEveryTransition } from 'components/common'
import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { rootRoutes } from 'routes'

export default function App() {
  return (
    <>
      <HashRouter>
        <ToTopEveryTransition />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          {rootRoutes.map(route => (
            <Route exact path={`/${route.path}`} key={route.path}>
              <route.component />
            </Route>
          ))}
        </Switch>
      </HashRouter>
      <ToastContainer />
    </>
  )
}
