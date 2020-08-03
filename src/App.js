/* eslint-disable prettier/prettier */
import React from 'react'
// import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import Error from './Error'

// // import { Main } from '@aragon/ui'

// // import theme from './theme-court'

// // import MainView from './components/MainView'
// import ErrorPage from './ErrorPage'

// // import Dashboard from './components/Dashboard/Dashboard'
// import LoginPage from './components/Login/LoginPage'
// import DashboardPage from './components/Dashboard/DashboardPage'
// import Arbitrations from './components/Arbitrations/Arbitrations'
// import ArbitrationsPage from './components/Arbitrations/ArbitrationsPage'
// // /* eslint-disable prettier/prettier */
 // import DashboardMain from './components/Dashboard/DashboardMain'

// // import Tasks from './components/Tasks/Tasks'
// // import Sample from './components/Sample/Sample'
// // import Disputes from './components/Disputes/Disputes'
// import { WalletProvider } from './providers/Wallet'
// import { ActivityProvider } from './components/Activity/ActivityProvider'
 // import NavPanel from './NavPanel'
 // import HeaderPanel from './HeaderPanel'
 // import Layout from './Layout'
 import NavPanelREDUNDANT from './NavPanelREDUNDANT'

function App() {
  return (
    <>
   <NavPanelREDUNDANT />
    {/* <DashboardMain /> */}
    </>
    // <NavPanel />
    // <BrowserRouter>
    //   <Switch>
    //     <Route exact path='/' component={LoginPage} />
    //     <Route exact path='/login' component={LoginPage} />
    //     <Route exact path='/home' component={NavPanel} />
    //     <Route exact path='/test' component={ArbitrationsPage} />
    //     <Route path='/dashboard'>
    //       <NavPanel link='dashboard' />
    //     </Route>
    //     <Route path='/arbitration'>
    //       <NavPanel link='arbitration' />
    //     </Route>
    //     <Route path='/profile'>
    //       <NavPanel link='profile' />
    //     </Route>
    //     <Route component={ErrorPage} />
    //   </Switch>
    // </BrowserRouter>
  )
}

export default App
