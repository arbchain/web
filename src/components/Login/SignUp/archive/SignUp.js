/* eslint-disable */

import React, { useState } from 'react';
import { Main, DropDown } from '@aragon/ui';
import { Steps } from 'antd';
import './SignUp.Style.css';

const accounts = require('../../../wallet/keys');
const networks = require('../../../wallet/network');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});
const ACCOUNTS = accounts.map((node) => {
  return `${node.name} - (${node.orionPublicKey})`;
});

const { Step } = Steps;

function SignUp() {
  const [current, setCurrent] = useState(0);
  const [account, setAccount] = useState(0);

  // onChange = (current) => {
  //   console.log('onChange:', current);
  //   setCurrent({ current });
  // };

  return (
    <Main layout={false}>
      <section className='main'>
        <div className='troubleshooting'>
          <h2>
            Having Trouble? <span className='primary'>Request Help</span>
          </h2>
        </div>

        <div className='row'>
          <div className='column'>
            <div className='col-1'>
              <div className='stepper'>
                {/* <h3>
                  <span className='numbers'>1</span> Select Account
                </h3>
                <h3>
                  <span className='numbers'>2</span> User Information
                </h3>
                <h3>
                  <span className='numbers'>3</span> Create Account
                </h3> */}
                <Steps direction='vertical' size='small' current={1}>
                  <Step title='Finished' description='This is a description.' />
                  <Step
                    title='In Progress'
                    description='This is a description.'
                  />
                  <Step title='Waiting' description='This is a description.' />
                </Steps>
                ,
              </div>
            </div>
          </div>

          <div className='column'>
            <div className='col-2'>
              <form id='form' className='form'>
                <div className='header'>
                  <h2>Welcome to Arbchain</h2>
                </div>
                <div className='form-control'>
                  <label for='username'>Select Account</label>
                  <DropDown
                    style={{
                      background: '#fff',
                      color: '#3d4857',
                      border: '1px solid #d9d9d9',
                      width: '20%',
                    }}
                    items={ACCOUNTS}
                    selected={account}
                    onChange={setAccount}
                  />

                  <small>Error message</small>
                </div>

                <p>OR</p>

                <div className='form-control'>
                  <button>Generate New Account</button>
                </div>
              </form>
            </div>
            <div className='next'>
              <a className='btn' href='./account-2.html'>
                Next Step
                <i className='fa fa-arrow-right' aria-hidden='true'></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
}

export default SignUp;
