/* eslint-disable */
import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import {
  Main,
 } from '@aragon/ui'
// import DashboardMain from './DashboardMain'
import DashboardMain from './components/Dashboard/DashboardMain'
import ArbitrationsPage from './components/Arbitrations/ArbitrationsPage'
import HeaderPanel from './HeaderPanel'
import NavPanelNew from './NavPanelNew'

import '../src/reset.css'

function NavPanel(props) {
  return (
    <>
    <Main layout={false}>
      <HeaderPanel />
      <NavPanelNew />
      
          <div style={{ display: 'flex' }}>
            
            <div style={{ backgroundColor: '#FBFCFD', width: '100%' }}>
              {/* {navDashboard ? <DashboardMain /> : null }
              {navArbitrations ? <ArbitrationsPage /> : null }
              {navSettings ? <h1>This is settings page</h1> : null } */}
              {/* <DashboardMain /> */}
              <ArbitrationsPage />
            </div>
          </div>
        </Main>
      </>
  )}

export default NavPanel
