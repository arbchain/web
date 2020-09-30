/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Box, GU, textStyle } from '@aragon/ui';
import { userMap } from '../../lib/contracts/MasterContract';
import ProfileIcon from '../../assets/profile.png';
import ANJBadgeIcon from '../../assets/anjBadge.svg';
import IconCheck from '../../assets/IconCheck.svg';
import { Form, Input } from 'antd';

const Web3 = require('web3');
const web3 = new Web3();

const accounts = require('../../wallet/keys');
const networks = require('../../wallet/network');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

export default function ProfileHeader({ active }) {
  const [selected, setSelected] = useState(0);
  const [account, setAccount] = useState(0);

  const address = web3.eth.accounts.privateKeyToAccount(
    `0x${accounts[0].privateKey}`
  );

  const { userData } = userMap(
    NODES[selected],
    address.address,
    accounts[account]
  );
  console.log(address);
  console.log('USER DATA:', userData);

  let card;
  if (userData != null) {
    const { name, contactNumber, zipCode, role } = userData;

    card = (
      <>
        <Form layout='vertical'>
          <Form.Item label='Name'>
            <Input value={name} readOnly style={{ width: '30%' }} />
          </Form.Item>

          <Form.Item label='Contact Number'>
            <Input value={contactNumber} readOnly style={{ width: '30%' }} />
          </Form.Item>
          <Form.Item label='Zip Code'>
            <Input value={zipCode} readOnly style={{ width: '30%' }} />
          </Form.Item>
          <Form.Item label='Role'>
            <Input value={role} readOnly style={{ width: '30%' }} />
          </Form.Item>
        </Form>
      </>
    );
  }

  return (
    <div>
      <Box
        padding={40}
        css={`
          border-radius: 0;
          margin-bottom: ${2 * GU}px;
        `}
      >
        <div
          css={`
            margin-bottom: ${3 * GU}px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
          `}
        >
          <div
            css={`
              display: flex;
              align-items: center;
            `}
          >
            <div
              css={`
                position: relative;
                margin-right: ${3 * GU}px;
              `}
            >
              <img alt='profile' src={ProfileIcon} />
              <img
                alt='active-juror'
                src={ANJBadgeIcon}
                css='position: absolute; top: 0; right: -5px'
              />
            </div>
            <div>
              <div
                css={`
                  margin-bottom: ${1 * GU}px;
                  display: flex;
                  align-items: center;
                `}
              >
                <span
                  css={`
                    ${textStyle('title4')}
                    letter-spacing: 1px;
                    margin-right: ${2 * GU}px;
                  `}
                >
                  {address.address}
                </span>
                {active && (
                  <div
                    css={`
                      display: flex;
                      align-items: center;
                    `}
                  >
                    <img
                      alt='active'
                      src={IconCheck}
                      css={`
                        margin-right: 4px;
                      `}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {card}
      </Box>
    </div>
  );
}
