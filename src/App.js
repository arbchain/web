/* eslint-disable  */
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import Arbitrations from './components/Arbitrations/Arbitrations'
import ErrorPage from './ErrorPage'
// import Details from './components/Arbitrations/ArbitrationDetails'

function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/arbitration' component={Arbitrations} />
        <Route component={ErrorPage} />  
      </Switch> 
    </BrowserRouter>  
   
   </>
  )
}

export default App
