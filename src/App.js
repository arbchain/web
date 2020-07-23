/* eslint-disable prettier/prettier */
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import Error from './Error'

// // import { Main } from '@aragon/ui'

// // import theme from './theme-court'

// // import MainView from './components/MainView'
import ErrorPage from './ErrorPage'

// // import Dashboard from './components/Dashboard/Dashboard'
import LoginPage from './components/Login/LoginPage'
// import DashboardPage from './components/Dashboard/DashboardPage'
// import Arbitrations from './components/Arbitrations/Arbitrations'
import ArbitrationsPage from './components/Arbitrations/ArbitrationsPage'
// // /* eslint-disable prettier/prettier */

// // import Tasks from './components/Tasks/Tasks'
// // import Sample from './components/Sample/Sample'
// // import Disputes from './components/Disputes/Disputes'
// import { WalletProvider } from './providers/Wallet'
// import { ActivityProvider } from './components/Activity/ActivityProvider'
import NavPanel from './NavPanel'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/home' component={NavPanel} />
        <Route exact path='/test' component={ArbitrationsPage} />
        <Route path='/dashboard'>
          <NavPanel link='dashboard' />
        </Route>
        <Route path='/arbitration'>
          <NavPanel link='arbitration' />
        </Route>
        <Route path='/profile'>
          <NavPanel link='profile' />
        </Route>
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App

/*
//// REPLACED ///////////////////


<WalletProvider>
      <BrowserRouter>
        <ActivityProvider>
         
          <Main layout={false} theme={theme}>
            <MainView>
               <Redirect from='/' to='/dashboard' /> 
              <Switch>
                <Route exact path='/profile' component={Dashboard} />
                <Route exact path='/leaderboard' component={Tasks} />
                <Route exact path='/dashboard' component={Disputes} />
                <Route exact path='/sample' component={Sample} />
                <Route component={ErrorPage} />
              </Switch>
            </MainView>
          </Main>
        </ActivityProvider>
      </BrowserRouter>
    </WalletProvider>



    //////////////////////////////////




*/
