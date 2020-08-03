/* eslint-disable */
import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import {
  Main,
  Header,
  Button,
  IconPlus,
  Tag,
  SidePanel,
  Split,
  DataView,
  Box,
  GU,
  Layout,
  textStyle,
  DropDown,
  IdentityBadge,
  color,
  ContextMenu,
  ContextMenuItem,
} from '@aragon/ui'
import { IconNotifications } from '@aragon/ui'
import { FaBeer } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
// import DashboardMain from './DashboardMain'
import BrandLogo from './assets/arbchainlogo.svg'
import Notification from './assets/notification.svg'
import Avatar from './assets/avatar.svg'
import { Link } from 'react-router-dom'
import ArbitrationsIcon from './assets/ArbitrationsIcon.svg'
import DashboardIcon from './assets/DashboardIcon.svg'
import ProfileIcon from './assets/ProfileIcon.svg'
import SettingsIcon from './assets/SettingsIcon.svg'
import DashboardMain from './components/Dashboard/DashboardMain'
import ArbitrationsPage from './components/Arbitrations/ArbitrationsPage'
import HeaderPanel from './HeaderPanel'

import '../src/reset.css'
var primary = '#52006F'
var active = '#E3F2FD'

function NavPanel(props) {
  const [navSettings, setNavSettings] = useState(false)
  const [navDashboard, setNavDashboard] = useState(false)
  const [navArbitrations, setNavArbitrations] = useState(false)
  const [toggleBackgroundColor1, setToggleBackgroundColor1] = useState(null)
  const [toggleColor1, setToggleColor1] = useState('black')
  const [toggleBackgroundColor2, setToggleBackgroundColor2] = useState(null)
  const [toggleColor2, setToggleColor2] = useState('black')

  function handleClickDashboard() {
    setNavDashboard(true)
    setNavSettings(false)
    setNavArbitrations(false)
    setToggleBackgroundColor1(active)
    setToggleColor1('black')
    setToggleBackgroundColor2(null)
    setToggleColor2('black')
  }

  function handleClickArbitrations() {
    setNavArbitrations(true)
    setNavDashboard(false)
    setNavSettings(false)
    setToggleBackgroundColor2(active)
    setToggleColor2('black')
    setToggleBackgroundColor1(null)
    setToggleColor1('black')
  }

  function handleClickSettings() {
    setNavSettings(true)
    setNavDashboard(false)
    setNavArbitrations(false)
  }

  console.log(props.link)
  return (
    <>
    <Main layout={false}>
      <HeaderPanel />

          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '18vw',
                textAlign: 'left',
                marginTop : "10vh",
                backgroundColor : "white",
                height: '90vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRight: '0.5px solid #e5e5e5',
                position : "fixed"
              }}
            >
              <div
                style={{
                  marginTop: '0rem',
                }}
              >
                <ul>
                  <li>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 3fr',
                        // backgroundColor: '#E2F3F5',
                        backgroundColor: toggleBackgroundColor1,
                        cursor: 'pointer',
                        gridColumnGap: '1rem',
                        padding: '0.5rem 0rem',
                        color: toggleColor1,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <img
                          style={{ alignSelf: 'center', justifySelf: 'end' }}
                          src={DashboardIcon}
                        />
                      </div>
                      <div
                        onClick={handleClickDashboard}
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          paddingTop: '4px',
                        }}
                      >
                        DASHBOARD
                      </div>
                    </div>
                  </li>
                  <li>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 3fr',
                        cursor: 'pointer',
                        backgroundColor: toggleBackgroundColor2,
                        color: toggleColor2,
                        gridColumnGap: '1rem',
                        padding: '0.5rem 0rem',
                      }}
                    >
                      <div
                        style={{
                          // justifySelf: 'end',
                          // alignSelf: 'center',
                          // textAlign: 'center',
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <img
                          style={{ alignSelf: 'center', justifySelf: 'end' }}
                          src={ArbitrationsIcon}
                        />
                      </div>
                      <div
                        onClick={handleClickArbitrations}
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          paddingTop: '4px',
                        }}
                      >
                        ARBITRATION
                      </div>
                    </div>
                  </li>
                  <li>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 3fr',
                        cursor: 'pointer',

                        gridColumnGap: '1rem',
                        padding: '0.5rem 0rem',
                      }}
                    >
                      <div
                        style={{
                          // justifySelf: 'end',
                          // alignSelf: 'center',
                          // textAlign: 'center',
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <img
                          style={{ alignSelf: 'center', justifySelf: 'end' }}
                          src={ProfileIcon}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          paddingTop: '4px',
                        }}
                      >
                        PROFILE
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <ul>
                  <li>
                    <div
                      onClick={handleClickSettings}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 3fr',
                        cursor: 'pointer',

                        gridColumnGap: '1rem',
                        padding: '0.5rem 0rem',
                      }}
                    >
                      <div
                        style={{
                          // justifySelf: 'end',
                          // alignSelf: 'center',
                          // textAlign: 'center',

                          display: 'flex',
                          justifyContent: 'flex-end',
                          cursor: 'pointer',
                        }}
                      >
                        <img
                          style={{ alignSelf: 'center', justifySelf: 'end' }}
                          src={SettingsIcon}
                        />
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          cursor: 'pointer',
                          paddingTop: '4px',
                        }}
                      >
                        SETTINGS
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div style={{ backgroundColor: '#FBFCFD', width: '100%' }}>
              
              {
                navSettings ? <h1>This is settings page</h1> : <p>{null}</p>
              }
              {navDashboard ? <DashboardMain /> : <p>{null}</p>}
              {navArbitrations ? <ArbitrationsPage /> : <p>{null}</p>}
              {/* //// */}
            </div>
          </div>
        </Main>
      </>
  )}

export default NavPanel
