/* eslint-disable */
import React from 'react'
import DashboardMain from './DashboardMain'
import { Main } from '@aragon/ui'
import HeaderPanel from '../../HeaderPanel'
import NavPanelNew from '../../NavPanelNew'

function Dashboard(){
    return(
        <>
             
    <Main layout={false}>
      <HeaderPanel />
      <NavPanelNew />
      
          <div style={{ display: 'flex' }}>
            
            <div style={{ backgroundColor: '#FBFCFD', width: '100%' }}>
                <DashboardMain /> 
            </div>
          </div>
        </Main>
      
        </>
    )
}
export default Dashboard
