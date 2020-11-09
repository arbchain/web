/* eslint-disable */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { Input, Result, Spin, Form, Select, Modal, notification } from 'antd';

import 'antd/dist/antd.css';
import Dashboard from '../Dashboard/Dashboard.js';

const { Option, OptGroup } = Select;
const { Password } = Input;

// Toast message

const openSuccessNotification = (type) => {
  notification[type]({
    message: 'User Account has been created, please Login to continue',
  });
};

function LoginPage() {
  // state for account dropdown
  const [account, setAccount] = useState(0);

  // handler for password field
  const [password, setPassword] = useState('');

  const walletAccount = useAccount();

  const openWallet = async () => {
    const account = await wallet.login(password);
    console.log('ACCOUNT: ', account);

    //Storing the password locally. Need a secure way to do this for prod
    localStorage.setItem('wpassword', password);

    // Update the account context by using a callback function
    walletAccount.changeAccount({
      privateKey: account[0],
      orionPublicKey: 'A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=',
    });

    setAccount(account);
    if (account) {
      history.push('/dashboard');
    }
  };
  console.log('ACCOUNT', account[0]);

  const history = useHistory();
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
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
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
                label='Login'
                onClick={openWallet}
              ></Button>
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
      </div>
    </Main>
  );
}

export default LoginPage;
