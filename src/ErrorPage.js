import React from 'react'
import { Main } from '@aragon/ui'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <Main>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '2.5rem',
        }}
      >
        404! Something went wrong
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/dashboard">Goto HOME</Link>
      </div>
    </Main>
  )
}

export default ErrorPage
