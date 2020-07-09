/*eslint-disable */
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
import '../../reset.css'
import notasksfound from '../../assets/notasksfound.svg'
import Card from '@aragon/ui/dist/Card'
import agreement1 from '../../assets/agreement 1.svg'
import agreement2 from '../../assets/agreement 2.svg'
import active from '../../assets/active.svg'
import inactive from '../../assets/inactive.svg'
import totalcost from '../../assets/totalcost.svg'
import ChartComponent from './ChartComponent'
import ChartComponentNew from './ChartComponentNew'
var green = '#219653'
var orange = '#FF7A3C'
var primary = '#52006F'

function DashboardMain() {
  return (
    <>
      <div
        css={`
          ${textStyle('title1')};
          margin-top: 0rem;
          margin-left: 1rem;
          margin-right: 1rem;
        `}
      >
        Dashboard
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr ',
          justifyItems: 'center',
          gridGap: '2rem',
          marginTop: '0rem',
          marginLeft: '1rem',
          marginRight: '1rem',
        }}
      >
        <div style={{ width: '100%' }}>
          <Box heading={'Dispute stats'}>
            <div>
              <div style={{ display: 'flex' }}>
                <Card
                  style={{ margin: '0.5rem', padding: '0rem' }}
                  width='8rem'
                  height='8rem'
                >
                  <div>
                    <img src={active} />
                  </div>
                  <p>3</p>
                  <p style={{ color: green }}>Active</p>
                </Card>
                <Card
                  style={{ margin: '0.5rem', padding: '0rem' }}
                  width='8rem'
                  height='8rem'
                >
                  <div>
                    <img src={inactive} />
                  </div>
                  <p>3</p>
                  <p style={{ color: orange }}>Inactive</p>
                </Card>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  style={{
                    margin: '1rem',
                    padding: '0rem',
                    backgroundColor: primary,
                  }}
                  width='8rem'
                  height='8rem'
                >
                  <div>
                    <img src={totalcost} />
                  </div>
                  <p style={{ color: 'white' }}>$200K</p>
                  <p style={{ color: 'white' }}>Total cost</p>
                </Card>
              </div>
            </div>
          </Box>
        </div>
        <div style={{ width: '100%' }}>
          <Box heading={'Activity'}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <DropDown items={['Monthly', 'Monthly', 'Monthly']} />
            </div>
            <div style={{ paddingBottom: '1.8rem' }}>
              {/* <ChartComponent /> */}
              <ChartComponentNew />
            </div>
          </Box>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr ',
          justifyItems: 'center',
          gridRowGap: '1rem',
          gridColumnGap: '2rem',
          marginTop: '2rem',
          marginLeft: '1rem',
          marginRight: '1rem',
        }}
      >
        <div style={{ width: '100%', margin: '0rem', padding: '0rem' }}>
          <Box padding='0' heading={'Documents Submitted'}>
            <div style={{ marginTop: '1rem', display: 'flex' }}>
              <Split
                primary={
                  <div
                    style={{
                      display: 'flex',
                      margin: '0.5rem',
                      padding: '0.5rem',
                      justifyContent: 'center',
                    }}
                  >
                    <Card
                      style={{ margin: '0.5rem', padding: '0rem' }}
                      width='8rem'
                      height='8rem'
                    >
                      <div>
                        <img src={agreement1} />
                      </div>
                      <p>3</p>
                      <p style={{ color: '#219653' }}>Verified</p>
                    </Card>
                    <Card
                      style={{ margin: '0.5rem', padding: '0rem' }}
                      width='8rem'
                      height='8rem'
                    >
                      <div>
                        <img src={agreement2} />
                      </div>
                      <p>5</p>
                      <p style={{ color: '#FF7A3C' }}>Pending</p>
                    </Card>
                  </div>
                }
              />
            </div>
          </Box>
        </div>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Box heading={'Actions needed'}>
            <div style={{ marginTop: '1rem' }}>
              <div>
                <img src={notasksfound} />
              </div>
              <div style={{ marginTop: '1rem' }}>
                <p>No Tasks Found</p>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  )
}

export default DashboardMain