/* eslint-disable */
import React from 'react';
import { Main } from '@aragon/ui'
import HeaderPanel from '../../HeaderPanel'
import NavPanelNew from '../../NavPanelNew'
import ArbitrationsPage from '../Arbitrations/ArbitrationsPage'

function Arbitrations(){
  return(
    <>
       <Main layout={false}>
      <HeaderPanel />
      <NavPanelNew />
      
          <div style={{ display: 'flex' }}>
            
            <div style={{ backgroundColor: '#FBFCFD', width: '100%' }}>
                <ArbitrationsPage />
            </div>
          </div>
        </Main>
      
    </>
  )
}

export default Arbitrations