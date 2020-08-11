/* eslint-disable */
import React from 'react'
import { useState } from 'react'
import { Main } from '@aragon/ui'
import ArbitrationsIcon from './assets/ArbitrationsIcon.svg'
import DashboardIcon from './assets/DashboardIcon.svg'
import ProfileIcon from './assets/ProfileIcon.svg'
import SettingsIcon from './assets/SettingsIcon.svg'

export default function NavPanel() {
  console.log(window.location)
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

  return (
    <>
    <Main layout={false}>
      <div
        style={{
          backgroundColor: 'white',
          width: '18vw',
          textAlign: 'left',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '0.5px solid #e5e5e5',
          marginTop: '10vh',
        }}
      >
        <div
          
        >
          <ul>
            <li>
              <div
                style={{
                  backgroundColor: 'yellow',
                  display: 'grid',
                  gridTemplateColumns: '1fr 3fr',
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

      <div>

       
      </div>
      </Main>
    </>
  )
}
