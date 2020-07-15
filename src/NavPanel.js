/* eslint-disable */
import React, { useState } from 'react'
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

import '../src/reset.css'

function NavPanel() {
  const [navSettings, setNavSettings] = useState('unset')
  const [navDashboard, setNavDashboard] = useState('unset')
  const [navArbitrations, setNavArbitrations] = useState('unset')

  function handleClickDashboard() {
    console.log('click')
    setNavDashboard('set')
    setNavSettings('unset')
    setNavArbitrations('unset')
  }

  function handleClickSettings() {
    console.log('click')
    setNavSettings('set')
    setNavDashboard('unset')
    setNavArbitrations('unset')
  }

  function handleClickArbitrations() {
    console.log('click')
    setNavArbitrations('set')
    setNavDashboard('unset')
    setNavSettings('unset')
  }

  return (
    <>
      <Main layout={false}>
        <div
          style={{
            paddingLeft: '2rem',
            paddingRight: '2rem',
            borderBottom: '0.5px solid #e5e5e5',
          }}
        >
          <Header
            style={{
              paddingTop: '1rem',
              paddingBottom: '1rem',
            }}
            primary={
              <div
                style={{
                  display: 'flex',
                }}
              >
                <div>
                  <img style={{ width: '70%' }} src={BrandLogo} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    letterSpacing: '0.5px',
                  }}
                >
                  Arbchain
                </div>
              </div>
            }
            secondary={
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginLeft: '1.5rem',
                    marginRight: '1.5rem',
                  }}
                >
                  <img
                    style={{ width: '70%' }}
                    alt='notification'
                    src={Notification}
                  />
                </div>

                <div style={{ display: 'flex' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      style={{ width: '70%' }}
                      alt='notification'
                      src={Avatar}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <ContextMenu>
                      <ContextMenuItem>Log In</ContextMenuItem>
                      <ContextMenuItem>Log Out</ContextMenuItem>
                    </ContextMenu>
                  </div>
                </div>
              </div>
            }
          />
        </div>

        <div style={{ display: 'flex' }}>
          <div
            style={{
              width: '18%',
              textAlign: 'left',
              height: '86.8vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRight: '0.5px solid #e5e5e5',
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
                      backgroundColor: '#E2F3F5',
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
          <div style={{ backgroundColor: '#FBFCFD', width: '80%' }}>
            {/* //// */}
            {navSettings === 'set' ? (
              <h1>This is a settings page</h1>
            ) : (
              <p>{null}</p>
            )}
            {navDashboard === 'set' ? <DashboardMain /> : <p>{null}</p>}
            {navArbitrations === 'set' ? <ArbitrationsPage /> : <p>{null}</p>}
            {/* //// */}
          </div>
        </div>
      </Main>
    </>
  )
}

export default NavPanel
