/* eslint-disable */
import React from 'react'
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
} from '@aragon/ui'
import { IconNotifications } from '@aragon/ui'
import { FaBeer } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import DashboardMain from './DashboardMain'
import BrandLogo from '../../assets/arbchainlogo.svg'
import Notification from '../../assets/notification.svg'
import Avatar from '../../assets/avatar.svg'
import '../../reset.css'

function DashboardPage() {
  function handleClick() {
    console.log('click')
    return <DashboardMain />
  }
  return (
    <>
      <Main layout={false}>
        <div style={{ marginLeft: '5rem', marginRight: '5rem' }}>
          <Header
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
                    letterSpacing: '1px',
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
                    <DropDown
                      placeholder='Consenso Corp'
                      items={['LogIn', 'LogOut']}
                    />
                  </div>
                </div>
              </div>
            }
          />
        </div>

        <div style={{ display: 'flex' }}>
          <div
            style={{
              // backgroundColor: 'pink',
              width: '20%',
              textAlign: 'left',
              height: '86.8vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ marginTop: '0rem' }}>
              <ul>
                <li>
                  <Button
                    onClick={() => {
                      console.log('Clicked')
                    }}
                    wide
                  >
                    DASHBOARD
                  </Button>
                </li>
                <li>
                  <Button wide>ARBITRATIONS</Button>
                </li>
                <li>
                  <Button wide>PROFILE</Button>
                </li>
              </ul>
            </div>

            <div>
              <ul>
                <li>
                  <Button wide>Settings</Button>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ backgroundColor: '#FBFCFD', width: '80%' }}>
            <DashboardMain />
          </div>
        </div>
      </Main>
    </>
  )
}

export default DashboardPage