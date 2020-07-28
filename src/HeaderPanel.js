/* eslint-disable */
import React from 'react'
import { useState } from 'react'
import theme from './theme'
import BrandLogo from './assets/arbchainlogo.svg'
import Avatar from './assets/avatar.svg'
import Notification from './assets/notification.svg'
import { Header, ContextMenu, ContextMenuItem, Main } from '@aragon/ui'
import ArbitrationsIcon from './assets/ArbitrationsIcon.svg'
import DashboardIcon from './assets/DashboardIcon.svg'
import ProfileIcon from './assets/ProfileIcon.svg'
import SettingsIcon from './assets/SettingsIcon.svg'
import ArbitrationsPage from './components/Arbitrations/ArbitrationsPage'
import DashboardMain from './components/Dashboard/DashboardMain'
import NavPanel from './NavPanel'

function HeaderPanel() {
  var primary = '#52006F'

  /////
  const [navSettings, setNavSettings] = useState('unset')
  const [navDashboard, setNavDashboard] = useState('unset')
  const [navArbitrations, setNavArbitrations] = useState('unset')
  const [toggleBackgroundColor1, setToggleBackgroundColor1] = useState(null)
  const [toggleColor1, setToggleColor1] = useState('black')
  const [toggleBackgroundColor2, setToggleBackgroundColor2] = useState(null)
  const [toggleColor2, setToggleColor2] = useState('black')

  function handleClickDashboard() {
    console.log('click')
    setNavDashboard('set')
    setNavSettings('unset')
    setNavArbitrations('unset')
    setToggleBackgroundColor1(primary)
    setToggleColor1('white')
    setToggleBackgroundColor2(null)
    setToggleColor2('black')
  }

  function handleClickArbitrations() {
    console.log('click')
    setNavArbitrations('set')
    setNavDashboard('unset')
    setNavSettings('unset')
    setToggleBackgroundColor2(primary)
    setToggleColor2('white')
    setToggleBackgroundColor1(null)
    setToggleColor1('black')
  }

  function handleClickSettings() {
    console.log('click')
    setNavSettings('set')
    setNavDashboard('unset')
    setNavArbitrations('unset')
  }

  /////

  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
          height: '60px',
          position: 'fixed',
          display: 'flex',
          paddingLeft: '4rem',
          paddingRight: '5rem',
          alignItems: 'center',
          zIndex: '9',
          width: '100%',
          justifyContent: 'space-between',
          borderBottom: '2px solid #E5E5E5',
          opacity: '1',
        }}
      >
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
              letterSpacing: '0.2px',
            }}
          >
            Arbchain
          </div>
        </div>
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
              <img style={{ width: '70%' }} alt='notification' src={Avatar} />
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
      </div>
    </>
  )
}

export default HeaderPanel
