/* eslint-disable */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Steps, Select, Form, Button, Input, notification } from 'antd';
import wallet from 'wallet-besu';
import { Main, Header } from '@aragon/ui';
import { createUser } from '../../lib/contracts/MasterContract';
import 'antd/dist/antd.css';
import './SingnUp.Style.css';

const { Step } = Steps;
const { Option, OptGroup } = Select;

const accounts = require('../../wallet/keys.js');
const networks = require('../../wallet/network.js');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

const ACCOUNTS = accounts.map((node) => {
  return `${node.name} - (${node.orionPublicKey})`;
});

// Form Validation
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

// Toast message

const openSuccessNotification = (type) => {
  notification[type]({
    message: 'User Account has been created, please Login to continue',
  });
};

const openWarningNotification = (type) => {
  notification[type]({
    message: 'Please enter all the fields in the Form!',
  });
};

const Signup = () => {
  // state for stepper
  const [current, setCurrent] = useState(0);

  // network
  const [network, setNetwork] = useState(0);

  // name
  const [name, setName] = useState('');

  // zip
  const [zip, setZip] = useState('');

  // phone
  const [phone, setPhone] = useState('');

  // email
  const [email, setEmail] = useState('');

  // role
  const [role, setRole] = useState('');

  // password
  const [password, setPassword] = useState('');

  let history = useHistory();

  // Form Handlers

  // Dropdowns
  function selectRole(value) {
    console.log(`Selected role : ${value}`);
    setRole(value);
  }

  // Network selection

  const { status, newUserCreation } = createUser(NODES[network]);

  // This is an action to be invoked onclick
  async function registerUser() {
    wallet
      .create(password, 'A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=')
      .then(async (res) => {
        console.log('Wallet Created', res);
        if (res) {
          const account = await wallet.login(password);
          console.log(`0x${account[0]}`);
          await newUserCreation(
            name,
            zip,
            phone,
            'A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=',
            role,
            {
              privateKey: account[0],
              orionPublicKey: 'A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=',
            }
          );
          openSuccessNotification('success');
          setTimeout(() => {
            history.push('/login');
          }, 3000);
        } else {
          openWarningNotification('warning');
        }
      });
  }

  // Preview:- Readonly

  // stepper

  return (
    <Main layout={true}>
      <Header
        primary='Arbchain'
        secondary={
          <>
            <h1>
              Don't have an account? <span>Register Here</span>
            </h1>
          </>
        }
      />

      <div className='registration__container'>
        <Form
          className='form__container'
          layout='vertical'
          id='form'
          name='nest-messages'
          validateMessages={validateMessages}
        >
          <div className='form__grid'>
            <Form.Item
              name={['user', 'name']}
              label='Name'
              layout='inline'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>

            <Form.Item
              name={['user', 'email']}
              label='Email'
              layout='inline'
              rules={[
                {
                  type: 'email',
                },
              ]}
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            {/* </Form> */}

            {/* <Form layout='inline' style={{ maxWidth: '600px' }}> */}
            <Form.Item
              name='phone'
              label='Phone Number'
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Item>

            <Form.Item
              name='zip'
              label='Zip Code'
              rules={[
                {
                  required: true,
                  message: 'Please enter your Zip code!',
                },
              ]}
            >
              <Input value={zip} onChange={(e) => setZip(e.target.value)} />
            </Form.Item>
            {/* </Form> */}
          </div>

          <Form.Item
            label='Role'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select label='Role' defaultValue='Role' onChange={selectRole}>
              <OptGroup label='Roles'>
                <Option value={0}>Party</Option>
                <Option value={1}>Arbitrator</Option>
                <Option value={2}>Arbitratral Court</Option>
              </OptGroup>
            </Select>
          </Form.Item>
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Button
            type='primary'
            style={{ width: '100%' }}
            onClick={registerUser}
          >
            Sign up
          </Button>
        </Form>
      </div>
    </Main>
  );
};

export default Signup;
