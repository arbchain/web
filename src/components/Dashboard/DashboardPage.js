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

function DashboardPage() {
  return (
    <>
      <Main layout={false}>
        <Header
          primary='(icon)Arbchain'
          secondary={
            <>
              <IoIosNotifications color='purple' size='2rem' />
              <IconNotifications side='large' />
              <DropDown placeholder='Logout' items={['Log In', 'Log Out']} />
            </>
          }
        />

        <div style={{ display: 'flex' }}>
          <div
            style={{
              backgroundColor: 'pink',
              width: '20%',
              textAlign: 'left',
              height: '86vh',
            }}
          >
            <ul style={{ textAlign: 'left', color: 'red' }}>
              <li>
                <Button color={'red'} wide>
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
          <div style={{ backgroundColor: 'yellow', width: '80%' }}>
            <p>hello world</p>
          </div>
        </div>
      </Main>
    </>
  )
}

export default DashboardPage
