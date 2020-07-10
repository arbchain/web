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
import Refresh from '../../assets/refresh.svg'

const element = <img src={Refresh} />

function ArbitrationsPage() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginRight: '2rem',
          marginLeft: '2rem',
        }}
      >
        <div
          css={`
            ${textStyle('title1')};
            margin-top: 0rem;
            margin-left: 1rem;
            margin-right: 1rem;
          `}
        >
          Arbitrations
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginLeft: '0.5rem', marginRight: '0.25rem' }}>
            <Button>+ NEW AGREEMENT</Button>
          </div>
          <div style={{ marginLeft: '0.25rem', marginRight: '0.5rem' }}>
            <Button>+ ADD REQUEST</Button>
          </div>
          <p>{element}</p>
        </div>
      </div>
    </>
  )
}

export default ArbitrationsPage
