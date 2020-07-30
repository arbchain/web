import React from 'react'
import HeaderPanel from './HeaderPanel'
import NavPanel from './NavPanel'
import { Main } from '@aragon/ui'

export default function Layout() {
  return (
    <React.Fragment>
      <Main layout={false}>
        <HeaderPanel />
        <NavPanel />
      </Main>
    </React.Fragment>
  )
}
