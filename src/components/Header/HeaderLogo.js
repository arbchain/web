/* eslint-disable prettier/prettier */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { GU, textStyle } from '@aragon/ui'
import headerLogoSvg from '../../assets/arbchainLogo.png'

function HeaderLogo() {
  return (
      <NavLink to="/" style={{ textDecoration: 'none' }}>
    <div
      css={`
        display: flex;
        align-items: center;
      `}
    >
      <img
        alt=''
        src={headerLogoSvg}
        width={7 * GU}
        css={`
          margin-right: ${1 * GU}px;
        `}
      />
      <h1
        css={`
          display: flex;
          height: 100%;
          align-items: center;
          ${textStyle('body1')};
        `}
      >
Arbchain
      </h1>
    </div>
</NavLink>
  )
}

export default HeaderLogo
