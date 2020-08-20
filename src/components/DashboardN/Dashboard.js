/* eslint-disable */
import React from 'react'
import DashboardMain from './DashboardMain'
import { Main } from '@aragon/ui'

function Dashboard(){
    return(
        <>

    <Main layout={false}>

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
