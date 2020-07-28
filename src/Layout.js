import React from 'react'
import HeaderPanel from './HeaderPanel'
import NavPanel from './NavPanel'
import { Main } from '@aragon/ui'

export default function Layout() {
  return (
    <React.Fragment>
      <Main layout={false}>
        <HeaderPanel />
        <p>hello worldld</p>
        <NavPanel />
      </Main>
    </React.Fragment>
  )
}
