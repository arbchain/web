/* eslint-disable */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Main, Layout, Header, TextInput } from '@aragon/ui';

import { useAccount } from '../../wallet/Account.js';
import wallet from 'wallet-besu';
import { authorizeUser, getLoginUser } from '../../lib/db/threadDB';

import { Link } from 'react-router-dom';
import { Form, Input, notification, Button } from 'antd';
import Logo from '../../assets/mainLogo.png';
import 'antd/dist/antd.css';

import { LoginContainer } from './styles';

const openWarningNotification = (type) => {
  notification[type]({
    message: 'Please enter the Password',
  });
};

// Form Validation
const validateMessages = {
  required: '${label} is required!',
  types: {
    password: '${label} is incorrect!',
  },
};

function LoginPage() {
  // state for account dropdown
  const [account, setAccount] = useState(0);

  const [loading, setLoading] = useState(false);

  console.log('Loading', loading);

  // handler for password field
  const [password, setPassword] = useState('');

  const walletAccount = useAccount();

  const openWallet = async () => {
    const account = await wallet.login(password);
    console.log('ACCOUNT: ', account);

    if (account !== null) {
      const dbClient = await authorizeUser(password);
      setLoading(true);

      if (dbClient !== null) {
        let userInfo = await getLoginUser(account[0], dbClient);

        if (userInfo !== null) {
          //localStorage.setItem("USER", JSON.stringify(userInfo))
          //Storing the password locally. Need a secure way to do this for prod
          localStorage.setItem('wpassword', password);
          // Update the account context by using a callback function
          walletAccount.changeAccount({
            privateKey: account[0],
            orionPublicKey: 'A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=',
          });
        }
      } else {
        console.log('Some error!!!');
        return;
      }
    } else {
      if (password === '' || null) {
        console.log('Wrong password!!');
        openWarningNotification('warning');
      }

      return;
    }

    setAccount(account);
    if (account) {
      history.push('/dashboard');
    }
  };

  const history = useHistory();
  return (
    <Main>
      <Header primary={<img src={Logo} alt='LOGO' srcset='' />} />

      <LoginContainer>
        <Form
          className='form__container'
          layout='vertical'
          id='form'
          name='nest-messages'
          validateMessages={validateMessages}
        >
          <div className='form__heading'>
            <h2> Welcome to Arbchain</h2>
          </div>
          <Form.Item
            label='Password'
            rules={[
              {
                required: true,
                type: 'password',
                message: 'Please enter your Password',
              },
            ]}
          >
            <Input.Password
              value={password}
              style={{ width: '336px', height: '40px', borderRadius: '4px' }}
              rules={[
                {
                  required: true,
                  message: 'Please Enter the Password',
                  type: 'password',
                },
              ]}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Item>
          {loading ? (
            <Button
              loading
              type='primary'
              style={{ width: '336px', height: '40px', borderRadius: '4px' }}
            >
              Signing In
            </Button>
          ) : (
            <Button
              type='primary'
              style={{ width: '336px', height: '40px', borderRadius: '4px' }}
              onClick={openWallet}
            >
              Sign In
            </Button>
          )}

          <div
            css={`
              margin-top: 14px;
            `}
          >
            <h1>
              New to Arbchain?
              <span style={{ marginLeft: '4px' }}>
                <Link to='/signup'>Register Here</Link>
              </span>
            </h1>
          </div>
        </Form>
      </LoginContainer>
    </Main>
  );
}

export default LoginPage;
