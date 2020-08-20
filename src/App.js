/* eslint-disable prettier/prettier */
/* eslint-disable */

import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Main } from '@aragon/ui'

import theme from './theme-court'

import MainView from './components/MainView'
import ErrorPage from './ErrorPage'

import Dashboard from './components/Dashboard/Dashboard'
import Profile from './components/Profile/Profile'
import Disputes from './components/Disputes/Disputes'
import { ActivityProvider } from './components/Activity/ActivityProvider'

function App() {
  return (
      <BrowserRouter>
        <ActivityProvider>
        <Main layout={false} theme={theme}>
          <MainView>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/arbitrations' component={Disputes} />
              <Route path='/profile' component={Profile} />
              <Route component={ErrorPage} />
            </Switch>
          </MainView>
        </Main>
        </ActivityProvider>
      </BrowserRouter>
  )
}

export default App
