/* eslint-disable */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Main, Layout, Header } from '@aragon/ui';

import { useAccount } from '../../wallet/Account.js';
import wallet from 'wallet-besu';

import { Link } from 'react-router-dom';
import { Form, Button, Input, notification } from 'antd';
import Logo from '../../assets/mainLogo.png';
import 'antd/dist/antd.css';

// Toast message

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
    <Main layout={true}>
      <Header
        primary={<img src={Logo} alt='LOGO' srcset='' />}
        secondary={
          <>
            <h1>
              Having Trouble? <Link>Request Help </Link>
            </h1>
          </>
        }
      />

      <div className='registration__container'>
        <div className='form__heading'>
          <h2> Welcome to Arbchain</h2>
        </div>

        <Form
          className='form__container'
          layout='vertical'
          id='form'
          name='nest-messages'
        >
          <Form.Item
            label='Password'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Item>

          <Button type='primary' style={{ width: '100%' }} onClick={openWallet}>
            Sign in
          </Button>
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
      </div>
    </Main>
  );
}

export default LoginPage;
