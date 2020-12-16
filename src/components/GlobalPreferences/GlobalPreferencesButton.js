import React, { useRef, useState, useCallback } from 'react';
import {
  ButtonBase,
  ButtonIcon,
  GU,
  IconSettings,
  Popover,
  RADIUS,
  textStyle,
  useTheme,
  useViewport,
} from '@aragon/ui';

import { useHistory } from 'react-router-dom';
import iconExit from '../../assets/exit.svg';

function GlobalPreferencesButton({ onOpen }) {
  const theme = useTheme();
  const { below } = useViewport();

  const [opened, setOpened] = useState(false);
  const containerRef = useRef();
  const history = useHistory();
  const handleToggle = useCallback(() => setOpened((opened) => !opened), []);
  const handleClose = useCallback(() => setOpened(false), []);
  const handleItemClick = useCallback(
    (path) => () => {
      setOpened(false);
      onOpen(path);
    },
    [onOpen]
  );

  const removePassword = function() {
    localStorage.removeItem('wpassword');
    history.push('/login');
  };

  return (
    <React.Fragment>
      <div ref={containerRef}>
        <ButtonIcon
          element='div'
          onClick={handleToggle}
          css={`
            width: ${4.25 * GU}px;
            height: 100%;
            border-radius: 0;
          `}
          label='Global preferences'
        >
          <IconSettings
            css={`
              color: ${theme.hint};
            `}
          />
        </ButtonIcon>
      </div>
      <Popover
        closeOnOpenerFocus
        placement='bottom-end'
        onClose={handleClose}
        visible={opened}
        opener={containerRef.current}
      >
        <ul
          css={`
            /* Use 20px as the padding setting for popper is 10px */
            width: ${below('medium') ? `calc(100vw - 20px)` : `${42 * GU}px`};
            padding: 0;
            margin: 0;
            list-style: none;
            background: ${theme.surface};
            color: ${theme.content};
            border-radius: ${RADIUS}px;
          `}
        >
          <li
            css={`
              display: flex;
              align-items: center;
              height: ${4 * GU}px;
              padding-left: ${2 * GU}px;
              border-bottom: 1px solid ${theme.border};
              ${textStyle('label2')}
              color: ${theme.surfaceContentSecondary};
            `}
          >
            Global preferences
          </li>
          <Item onClick={removePassword} icon={iconExit} label='Logout' />
          {/* <IconPower /> */}
        </ul>
      </Popover>
    </React.Fragment>
  );
}

function Item({ icon, label, onClick }) {
  const theme = useTheme();

  return (
    <li
      css={`
        & + & {
          border-top: 1px solid ${theme.border};
        }
      `}
    >
      <ButtonBase
        onClick={onClick}
        label={label}
        css={`
          width: 100%;
          height: ${7 * GU}px;
          border-radius: 0;
        `}
      >
        <div
          css={`
            display: flex;
            width: 100%;
            height: 100%;
            padding: ${2 * GU}px;
            justify-content: left;
            align-items: center;

            &:active,
            &:focus {
              background: ${theme.surfacePressed};
            }
          `}
        >
          {icon && <img src={icon} alt='' />}
          <div
            css={`
              flex-grow: 1;
              display: flex;
              align-items: center;
              margin-left: ${icon ? 1 * GU : 0}px;
            `}
          >
            {label}
          </div>
        </div>
      </ButtonBase>
    </li>
  );
}

export default React.memo(GlobalPreferencesButton);
