import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ButtonBase, GU, springs, textStyle, useTheme } from '@aragon/ui';

import { Spring, animated } from 'react-spring/renderprops';
import HeaderLogo from './Header/HeaderLogo';

import dashboardMenuIcon from '../assets/DashboardIcon.svg';
import dashboardIconDark from '../assets/dashboardIconDark.svg';
import profileIcon from '../assets/ProfileIcon.svg';
import profileIconDark from '../assets/profileIconDark.svg';
import arbitrationsIcon from '../assets/ArbitrationsIcon.svg';
import arbitrationsIconDark from '../assets/arbitrationsIconDark.svg';
import { lerp } from '../lib/math-utils';
import styled from 'styled-components';

export const MENU_PANEL_SHADOW_WIDTH = 3;
export const MENU_PANEL_WIDTH = 25 * GU;

const { div: AnimDiv } = animated;

// const Navigation = styled.nav`
//   background-color: red;
//   menuitem {
//     color: 'red';
//   }
// `;

function MenuPanel({ showHeaderLogo, onOpenPage }) {
  const theme = useTheme();

  return (
    <nav
      css={`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: ${theme.surface};
        margin-top: 2px;
        box-shadow: rgba(0, 0, 0, 0.05) 2px 0px 3px;
      `}
    >
      {showHeaderLogo && (
        <div
          css={`
            padding: ${2 * GU}px ${3 * GU}px;
          `}
        >
          <HeaderLogo />
        </div>
      )}
      <div
        css={`
          padding: ${2 * GU}px 0;
        `}
      >
        <h2
          css={`
            color: ${theme.surfaceContentSecondary};
            margin-bottom: ${1 * GU}px;
            padding: 0 ${3 * GU}px;
            ${textStyle('label2')};
          `}
        >
          Menu
        </h2>
        <MenuItem
          to='/dashboard'
          icon={dashboardMenuIcon}
          darkIcon={dashboardIconDark}
          label='Dashboard'
          onActivate={onOpenPage}
        />
        <MenuItem
          to='/arbitrations'
          icon={arbitrationsIcon}
          darkIcon={arbitrationsIconDark}
          label='Arbitrations'
          onActivate={onOpenPage}
        />
        <MenuItem
          to='/agreements'
          icon={arbitrationsIcon}
          darkIcon={arbitrationsIconDark}
          label='Agreements'
          onActivate={onOpenPage}
        />
        <MenuItem
          to='/profile'
          icon={profileIcon}
          darkIcon={profileIconDark}
          label='Profile'
          onActivate={onOpenPage}
        />
      </div>
    </nav>
  );
}

function MenuItem({ to, icon, darkIcon, label, onActivate }) {
  const history = useHistory();
  const theme = useTheme();
  const active = useRouteMatch(to) !== null;

  const handlePageRequest = useCallback(() => {
    onActivate();
    history.push(to);
  }, [history, onActivate, to]);

  return (
    <ButtonBase
      onClick={handlePageRequest}
      css={`
        display: flex;
        align-items: center;
        width: 100%;
        height: ${5 * GU}px;
        padding: 0 ${2 * GU}px 0 ${3 * GU}px;
        border-radius: 0;
        text-align: left;
        background: ${active ? '#E3F2FD' : 'transparent'};
        &:active {
          background: ${theme.surfacePressed};
        }
      `}
    >
      <div
        css={`
          position: absolute;
          left: 0;
          width: 3px;
          height: 100%;
          background: ${theme.accent};
          opacity: ${Number(active)};
          transform: translate3d(${active ? '0%' : '-100%'}, 0, 0);
          transform-position: 0 0;
          transition-property: transform, opacity;
          transition-duration: 150ms;
          transition-timing-function: ease-in-out;
        `}
      />

      <img src={active ? darkIcon : icon} alt='' />
      <span
        css={`
          margin-left: ${1 * GU}px;
          overflow: hidden;
          text-overflow: ellipsis;
          ${textStyle('body2')};
          font-weight: ${active ? '600' : '700'};
          color: ${active ? theme.selected : ''};
        `}
      >
        {label}
      </span>
    </ButtonBase>
  );
}

function AnimatedMenuPanel({
  autoClosing,
  opened,
  onMenuPanelClose,
  ...props
}) {
  const theme = useTheme();
  const [animate, setAnimate] = useState(autoClosing);

  useEffect(() => {
    // If autoClosing has changed, it means we are switching from autoClosing
    // to fixed or the opposite, and we should stop animating the panel for a
    // short period of time.
    setAnimate(false);
    const animateTimer = setTimeout(() => setAnimate(true), 0);
    return () => clearTimeout(animateTimer);
  }, [autoClosing]);

  return (
    <Spring
      from={{ menuPanelProgress: 0 }}
      to={{ menuPanelProgress: Number(opened) }}
      config={springs.lazy}
      immediate={!animate}
      native
    >
      {({ menuPanelProgress }) => (
        <div
          css={`
            height: 100%;
            /* When the panel is autoclosing, we want it over the top bar as well */
            ${autoClosing
              ? `
              position: absolute;
              width: 100%;
              top: 0;
              ${!opened ? 'pointer-events: none' : ''}
            `
              : ''}
          `}
        >
          {autoClosing && (
            <AnimDiv
              onClick={onMenuPanelClose}
              css={`
                position: absolute;
                height: 100%;
                width: 100%;
                background: ${theme.overlay.alpha(0.9)};
                ${!opened ? 'pointer-events: none' : ''}
              `}
              style={{
                opacity: menuPanelProgress,
              }}
            />
          )}
          <AnimDiv
            css={`
              width: ${MENU_PANEL_WIDTH}px;
              height: 100%;
              flex: none;
            `}
            style={{
              position: autoClosing ? 'absolute' : 'relative',
              transform: menuPanelProgress.interpolate(
                (v) =>
                  `translate3d(
                  ${lerp(
                    v,
                    -(MENU_PANEL_WIDTH + MENU_PANEL_SHADOW_WIDTH),
                    0
                  )}px, 0, 0)`
              ),
            }}
          >
            <MenuPanel showHeaderLogo={autoClosing} {...props} />
          </AnimDiv>
        </div>
      )}
    </Spring>
  );
}

export default AnimatedMenuPanel;
