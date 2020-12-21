import React from 'react';
import { NavLink } from 'react-router-dom';
import { GU, textStyle } from '@aragon/ui';
import headerLogoSvg from '../../assets/arbchainLogo.png';
import logoWhite from '../../assets/logoWhite.png';

function HeaderLogo() {
  return (
    <NavLink to='/' style={{ textDecoration: 'none' }}>
      <div
        css={`
          display: flex;
          align-items: center;
        `}
      >
        <img
          alt=''
          src={logoWhite}
          // width={7 * GU}
          css={`
            margin-right: ${1 * GU}px;
            height: auto;
            width: 130px;
          `}
        />
      </div>
    </NavLink>
  );
}

export default HeaderLogo;
