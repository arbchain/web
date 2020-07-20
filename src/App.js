/* eslint-disable prettier/prettier */

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Error from './Error'

import LoginPage from './components/Login/LoginPage'
import DashboardPage from './components/Dashboard/DashboardPage'

import { WalletProvider } from './providers/Wallet'

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={LoginPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/dashboard' component={DashboardPage} />
            <Route component={Error} />
          </Switch>
      </BrowserRouter>
    </WalletProvider>
  )
}

export default App
