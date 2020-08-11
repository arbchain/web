/* eslint-disable */
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
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

var primary = '#52006F'

function Error() {
  return (
    <>
      <Main layout={false}>
        <div
          css={`
            ${textStyle('title1')};
            position: absolute;
            top: 50%;
            left: 50%;
            margin: 0;
            transform: translate(-50%, -50%);
          `}
        >
          <div
            css={`
              ${textStyle('title1')};
              text-align: center;
            `}
          >
            404 Error
          </div>
          <div
            css={`
              ${textStyle('title1')};
              text-align: center;
              font-weight: 100;
            `}
          >
            Oops, This doesn't exist
          </div>
          <div
            css={`
              ${textStyle('title1')};
              text-align: center;
              font-weight: 100;
            `}
          >
            Goto{' '}
            <span style={{ color: primary, fontWeight: '900' }}>
              <Link to='/login'>home</Link>
            </span>
          </div>
        </div>
      </Main>
    </>
  )
}

export default Error
