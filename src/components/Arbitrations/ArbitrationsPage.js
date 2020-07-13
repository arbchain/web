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
  ContextMenu,
  ContextMenuItem,
  Tabs,
} from '@aragon/ui'
import { useState } from 'react'

import Refresh from '../../assets/refresh.svg'
import Card from '@aragon/ui/dist/Card'

const element = <img src={Refresh} />

function ArbitrationsPage() {
  const [selected, setSelected] = useState(0)

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

      <Card>
        <div>
          <Tabs
            items={['All requests', 'My claims']}
            selected={selected}
            onChange={setSelected}
          />
        </div>
      </Card>
    </>
  )
}

export default ArbitrationsPage
