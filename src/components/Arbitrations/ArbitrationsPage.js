/* eslint-disable */
import React from 'react'
import { motion } from 'framer-motion'
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
  DropDown,
  DateRangePicker,
} from '@aragon/ui'
import Card from './Card'
import { useState } from 'react'

import Refresh from '../../assets/refresh.svg'
import ArbitrationCardName from '../../assets/ArbitrationCardName.svg'
import ArbitrationArgument from '../../assets/ArbitrationArgument.svg'
import ArbitrationCardDispute from '../../assets/ArbitrationCardDispute.svg'
import ArbitrationCompanyName from '../../assets/ArbitrationCompanyName.svg'
import Arbitrators from '../../assets/Arbitrators.svg'

// import Card from '@aragon/ui/dist/Card'

const element = <img src={Refresh} />

const ArbitrationCardNameStyle = <img src={ArbitrationCardName} />
const ArbitrationCardDisputeStyle = <img src={ArbitrationCardDispute} />
const ArbitratorsStyle = <img src={Arbitrators} />
const ArbitrationArgumentStyle = <img src={ArbitrationArgument} />
const ArbitrationCompanyNameStyle = <img src={ArbitrationCompanyName} />

function ArbitrationsPage() {
  const [selected, setSelected] = useState(0)

  const [range, setRange] = useState({
    start: null,
    end: null,
  })

  var primary = '#52006F'

  return (
    <>
    <Main layout={false}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          // marginRight: '2rem',
          // marginLeft: '2rem',
        }}
      >
        <div
          css={`
            ${textStyle('title1')};
            margin-top: 1rem;
            margin-left: 1rem;
            margin-right: 1rem;
          `}
        >
          Arbitrations
        </div>
        <div style={{ display: 'flex', marginTop: '1rem' }}>
          <div style={{ marginLeft: '0.5rem', marginRight: '0.25rem' }}>
            <Button
              label='+NEW AGREEMENT'
              onClick={() => console.log('Clicked')}
            />
          </div>
          <div style={{ marginLeft: '0.25rem', marginRight: '0.5rem' }}>
            <Button
              label='+ ADD REQUEST'
              style={{ backgroundColor: '#52006F', color: 'white' }}
              onClick={() => console.log('clicked')}
            />
          </div>
          <p onClick={() => console.log('clicked')}>{element}</p>
        </div>
      </div>

      <div style={{ marginLeft: '3rem', marginTop: '2rem' }}>
        <Tabs
          items={['All requests', 'My claims']}
          selected={selected}
          onChange={setSelected}
        />

        <hr
          style={{
            color: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            height: '0.5px',
            borderColor: '#F5F5F5',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <DropDown
            items={['Stage', 'Stage']}
            selected={selected}
            onChange={setSelected}
          />
          <DateRangePicker
            startDate={range.start}
            endDate={range.end}
            onChange={setRange}
          />
        </div>

        {/* ///////// CARDS SECTION RENDERING//////// */}

        <Card />

        {/* /////////////// */}
      </div>
      </Main>
    </>
  )
}

export default ArbitrationsPage
