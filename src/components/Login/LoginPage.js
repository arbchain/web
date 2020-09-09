/* eslint-disable */

import React, { useState } from 'react';
import {
  Main,
  Button,
  DropDown,
  // Modal,
  Layout,
  textStyle,
  TextInput,
} from '@aragon/ui';
import Connection from './Connection.js';
import BrandLogo from '../../assets/arbchainLogo.png';
import { fetchCount, increaseCounter } from '../../lib/contracts/Counter.js';
import { useAccount } from '../../wallet/Account.js';
import wallet from 'wallet-besu';
import LoginPageBanner from '../../assets/login-page-banner.png';
import { Link } from 'react-router-dom';
import { Input, Result, Spin, Form, Select, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Option, OptGroup } = Select;

// const accounts = require('../../wallet/keys');
// const networks = require('../../wallet/network');
// let walletAccount;
// let walletAccountMap;
// const NODES = Object.keys(networks).map((node) => {
//   return `${networks[node].host}:${networks[node].port}`;
// });
// const ACCOUNTS = accounts.map((node) => {
//   return `${node.name} - (${node.orionPublicKey})`;
// });

function LoginPage() {
  // state for wallet
  const [showModal, setshowModal] = useState(false);

  // state for Networselection and Account selection
  const [selected, setSelected] = useState(0);
  // state for account dropdown
  const [account, setAccount] = useState(0);

  // handler for password field
  const [password, setPassword] = useState('');

  const openWallet = async () => {
    const Account = await wallet.login(password);
    setAccount(Account);
    console.log(Account);
    setshowModal(true);
  };

  // This is an action to be invoked onclick
  // const increaseCount = () => increase(20, accounts[account]);

  // const { connected, increase } = increaseCounter(NODES[selected]);
  // const count = fetchCount(NODES[selected], accounts[account]);
  // console.log(count);

  // Update the account context by using a callback function
  const walletAccount = useAccount();
  walletAccount.changeAccount(account);

  return (
    <Main layout={false}>
      <div
        css={`
          //   padding: 1px 1px 1px 120px;
          background-color: pink;
          display: flex;
          justify-content: space-between;
        `}
      >
        {/* login */}
        <Modal
          title=" Let's get you Signed in!!"
          visible={showModal}
          onCancel={() => setshowModal(false)}
          onOk={showModal}
          width={400}
          footer={null}
        >
          <Form layout='vertical' id='form' className='login-form'>
            <Form.Item label='Select Account' className='login-form'>
              <Select
                label='Select Account'
                defaultValue={account}
                onChange={(index) => {
                  console.log(account[index]);
                  setAccount(index);
                }}
              >
                <OptGroup label='Accounts'>
                  <Option value={account}>{account}</Option>
                </OptGroup>
              </Select>
            </Form.Item>

            <Link
              to='/dashboard'
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              <Button
                style={{
                  background: '#4d4cbb',
                  color: '#fff',
                }}
                wide
              >
                Sign In
              </Button>
            </Link>
          </Form>
        </Modal>

        <div
          style={{ backgroundColor: 'white', width: '40%', height: '100vh' }}
        >
          <div
            css={`
              ${textStyle('title1')};
              text-align: center;
              margin-top: 15%;
              display: flex;
              justify-content: center;
            `}
          >
            <div>
              <img style={{ width: '80px' }} src={BrandLogo} />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                fontSize: '1.5rem',
                letterSpacing: '1px',

                color: '#4D4CBB',
              }}
            >
              Arbchain
            </div>
          </div>
          <div
            css={`
              text-align: center;
              margin-top: '10%';
            `}
          >
            <h1>Welcome to Arbchain</h1>
          </div>
          <div
            style={{
              marginTop: '10%',
              marginLeft: '10%',
              marginRight: '10%',
            }}
          >
            <p>Password</p>
            <Input.Password
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            <div
              style={{
                marginTop: '10%',
                textAlign: 'center',
              }}
            >
              <Button
                style={{
                  background: '#4d4cbb',
                  color: '#fff',
                }}
                wide
                onClick={openWallet}
              >
                <b>Next</b>
              </Button>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3%' }}>
            <p>
              New to Arbchain?
              <span style={{ color: '#4d4cbb', fontWeight: 'bold' }}>
                <Link
                  to='/signup'
                  style={{ textDecoration: 'none', marginRight: '1rem' }}
                >
                  Sign-Up here
                </Link>
              </span>
            </p>
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: '42%',
            }}
          >
            <p>Terms of Service</p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'green',
            width: '60%',
            height: '100vh',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              style={{ flexShrink: '0', maxHeight: '100%' }}
              src={LoginPageBanner}
            />
          </div>
        </div>
      </div>
    </Main>
  );
}

export default LoginPage;
