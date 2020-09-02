/* eslint-disable */

import React from 'react';
import { Main } from '@aragon/ui';
import './SignUp.Style.css';

function SignUp() {
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
                <h3>
                  <span className='numbers'>1</span> Select Account
                </h3>
                <h3>
                  <span className='numbers'>2</span> User Information
                </h3>
                <h3>
                  <span classNameName='numbers'>3</span> Create Account
                </h3>
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
                  <input type='text' placeholder='' id='username' />

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
