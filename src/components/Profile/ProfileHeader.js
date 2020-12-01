/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { addressesEqual, Box, GU, textStyle } from '@aragon/ui';
import ProfileIcon from '../../assets/profile.png';
import ANJBadgeIcon from '../../assets/anjBadge.svg';
import IconCheck from '../../assets/IconCheck.svg';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Spin } from 'antd';
import wallet from 'wallet-besu';
import {authorizeUser, getLoginUser} from "../../lib/db/threadDB";
import { Link } from 'react-router-dom';

const antIcon = <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb' }} spin />;

const Web3 = require('web3');
const web3 = new Web3();

const accounts = require('../../wallet/keys');
const networks = require('../../wallet/network');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

export default function ProfileHeader({ active }) {
  const [selected, setSelected] = useState(0);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState(null);
  const userRole = {0:'Party', 1:'Arbitrator', 2:'Arbitral Court'}

  useEffect(() => {
    async function load() {
      try {
        // Fetching the password locally. Need a secure way to do this for prod
        const account = await wallet.login(localStorage.getItem('wpassword'));
        const dbClient = await authorizeUser(localStorage.getItem('wpassword'))
        if (dbClient !== null) {
          let userInfo = await getLoginUser(account[0], dbClient)
          if (userInfo !== null) {
            console.log("User Data:",userInfo)
            setAddress(userInfo.address)
            setUserData(userInfo)
          }
        } else {
          console.log("Some error!!!")
        }
      } catch (err) {
        return false;
      }
    }
    load();
  }, []);

  let card;
  if (userData != null) {
    const { name, number, zipCode, role } = userData;

    card = (
      <>
        <Form layout='vertical'>
          <Form.Item label='Name'>
            <Input value={name} readOnly style={{ width: '30%' }} />
          </Form.Item>

          <Form.Item label='Contact Number'>
            <Input value={number} readOnly style={{ width: '30%' }} />
          </Form.Item>
          <Form.Item label='Zip Code'>
            <Input value={zipCode} readOnly style={{ width: '30%' }} />
          </Form.Item>
          <Form.Item label='Role'>
            <Input value={userRole[role]} readOnly style={{ width: '30%' }} />
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
                  {address ? address : <Spin indicator={antIcon} />}
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
