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
} from '@aragon/ui'
import profile from '../../assets/login-page-banner.png'

const loginstyle = {
  color: 'red',
  backgroundColor: 'pink',
  display: 'flex',
  justifyContent: 'space-between',
}
function LoginPage() {
  return (
    <Main layout={false}>
      <div
        css={`
          //   padding: 1px 1px 1px 120px;
          background-color: pink;
          display: flex;
          justify-content: space-between;
        `}
      >
        <div
          style={{ backgroundColor: 'white', width: '40%', height: '100vh' }}
        >
          <div
            css={`
              ${textStyle('title1')};
              text-align: center;
              margin-top: 15%;
              display: flex;
              justify-content: center;
            `}
          >
            <div>(icon)</div>
            <div>Arbchain</div>
          </div>
          <div
            css={`
              text-align: center;
              margin-top: '5%';
            `}
          >
            <p>Select a node to get started</p>
          </div>
          <div
            style={{
              marginTop: '10%',
              textAlign: 'center',
              marginLeft: '10%',
              marginRight: '10%',
            }}
          >
            <Button wide>Manually setup a node</Button>
          </div>
          <div
            style={{
              textDecorationLine: 'underline',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '5%',
            }}
          >
            <p>OR</p>
          </div>
          <div
            style={{
              marginTop: '5%',
              textAlign: 'center',
              marginLeft: '10%',
              marginRight: '10%',
            }}
          >
            <Button wide style={{ backgroundColor: '#52006F', color: 'white' }}>
              Detect a local node
            </Button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3%' }}>
            <p>Troubleshoot Guide</p>
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: '42%',
            }}
          >
            <p>Terms of Service</p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'green',
            width: '60%',
            height: '100vh',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              style={{ flexShrink: '0', maxHeight: '40%' }}
              src={require('../../assets/login-page-banner.png')}
            />
          </div>
        </div>
      </div>
      <Layout />
    </Main>
  )
}

export default LoginPage
