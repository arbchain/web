/* eslint-disable */
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Steps, Select, Form, Button, Input, notification } from 'antd';
import wallet from 'wallet-besu';
import { Main, Header } from '@aragon/ui';
import { createUser } from '../../lib/contracts/MasterContract';
import Logo from '../../assets/mainLogo.png';
import { PoweroffOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './SingnUp.Style.css';
import {authorizeUser, registerNewUser} from "../../lib/db/threadDB";
const Web3 = require('web3');
const web3 = new Web3();

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
    message: 'Your Account has been created, please Login to continue',
  });
};

const openWarningNotification = (type) => {
  notification[type]({
    message: 'Please enter all the fields in the Form!',
  });
};

const Signup = () => {
  // state for stepper
  const [spinner, setSpinner] = useState(false);

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
          setSpinner(true);
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
          const dbClient = await authorizeUser(password)
          const user = web3.eth.accounts.privateKeyToAccount(`0x${account[0]}`);
          await registerNewUser(name, email, zip, phone, user.address,
            'A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=', role, account[0], dbClient)
          setSpinner(false);
          openSuccessNotification('success');

          history.push('/login');
        } else {
          openWarningNotification('warning');
        }
      });
  }

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
                  required: true,
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
          {spinner == false ? (
            <Button
              type='primary'
              style={{ width: '100%' }}
              onClick={registerUser}
            >
              Sign up
            </Button>
          ) : (
            <Button loading type='primary' style={{ width: '100%' }}>
              Registering Account
            </Button>
          )}

          <div
            css={`
              margin-top: 14px;
            `}
          >
            <h1>
              Already have an account?
              <span style={{ marginLeft: '4px' }}>
                <Link to='/login'>Login Here</Link>
              </span>
            </h1>
          </div>
        </Form>
      </div>
    </Main>
  );
};

export default Signup;
