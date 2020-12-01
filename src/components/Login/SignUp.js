/* eslint-disable */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Steps, Select, Form, Button, Input, notification } from 'antd';
import wallet from 'wallet-besu';
import { Main } from '@aragon/ui';
import { createUser } from '../../lib/contracts/MasterContract';
import 'antd/dist/antd.css';
import './SingnUp.Style.css';
import {authorizeUser, registerNewUser} from "../../lib/db/threadDB";

const { Step } = Steps;
const { Option, OptGroup } = Select;
const Web3 = require('web3');
const web3 = new Web3();

const accounts = require('../../wallet/keys.js');
const networks = require('../../wallet/network.js');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

const ACCOUNTS = accounts.map((node) => {
  return `${node.name} - (${node.orionPublicKey})`;
});

// Form Layout
const layout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

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

  // state for account dropdown
  const [account, setAccount] = useState(0);

  let history = useHistory();

  // Stepper Handler
  function next() {
    setCurrent(current + 1);
  }

  function prev() {
    setCurrent(current - 1);
  }

  // Form Handlers

  // Dropdowns
  function selectRole(value) {
    setRole(value);
  }

  function selectNetwork(value) {
    setNetwork(value);
  }

  // Network selection

  const { status, newUserCreation } = createUser(NODES[network]);

  // This is an action to be invoked onclick
  async function registerUser() {

    wallet.create(password, 'A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=').then(async res => {
      console.log('Wallet Created:', res);
      if (res) {
        const account = await wallet.login(password);
        await newUserCreation(name, zip, phone, 'A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=',
          role, { privateKey:account[0], orionPublicKey: 'A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo='});
        const dbClient = await authorizeUser(password)
        const user = web3.eth.accounts.privateKeyToAccount(`0x${account[0]}`);
        await registerNewUser(name, zip, phone, user.address,
          'A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=', role, account[0], dbClient)
        openSuccessNotification('success');
        setTimeout(() => {
          history.push('/login');
        }, 3000);
      } else {
        openWarningNotification('warning');
      }
    });
  }

  let userInformation = (
    <>
      <Form
        {...layout}
        id='form'
        name='nest-messages'
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['user', 'name']}
          label='Name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
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
          <Input
            style={{ width: '100%' }}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Form.Item>

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
          name={['user', 'email']}
          label='Email'
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label='Role'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select label='Role' defaultValue='Role' onChange={selectRole}>
            <OptGroup label='Networks'>
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
      </Form>
    </>
  );

  // Preview:- Readonly

  let preview = (
    <>
      <Form
        {...layout}
        id='form'
        name='nest-messages'
        onFinish={registerUser}
        validateMessages={validateMessages}
      >
        <Form.Item name={['user', 'name']} label='Name'>
          <Input value={name} readOnly />
        </Form.Item>

        <Form.Item name='zip' label='Zip Code'>
          <Input style={{ width: '100%' }} value={zip} readOnly />
        </Form.Item>

        <Form.Item name='phone' label='Phone Number'>
          <Input value={phone} readOnly />
        </Form.Item>
        <Form.Item name={['user', 'email']} label='Email'>
          <Input value={email} readOnly />
        </Form.Item>

        <Form.Item label='Role'>
          <Select label='Role' defaultValue='Role'>
            <OptGroup label='Networks'>
              <Option value={role} readOnly>
                {role}
              </Option>
            </OptGroup>
          </Select>
        </Form.Item>
      </Form>
    </>
  );

  // stepper
  const steps = [
    {
      title: 'User Information',
      content: userInformation,
    },
    {
      title: 'Sign up',
      content: preview,
    },
  ];

  return (
    <Main layout={false}>
      <div className='container'>
        <Steps current={current} className='stepper'>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className='steps-content'>{steps[current].content}</div>
        <div className='steps-action'>
          {current < steps.length - 1 && (
            <Button type='primary' onClick={next}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type='primary' onClick={registerUser}>
              Sign up
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </Main>
  );
};

export default Signup;
