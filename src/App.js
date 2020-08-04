/* eslint-disable prettier/prettier */
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NavPanelREDUNDANT from './NavPanelREDUNDANT'

function App() {
  return (
    <>
   {/* <NavPanelREDUNDANT /> */}
    <BrowserRouter>
    {/* <Switch>
              <Route exact path='/profile' component={Dashboard} />
              <Route exact path='/leaderboard' component={Tasks} />
              <Route exact path='/dashboard' component={Disputes} />
              <Route exact path='/sample' component={Sample} />

              <Route component={ErrorPage} />
            </Switch> */}
    </BrowserRouter>

   </>
  )
}

export default App
