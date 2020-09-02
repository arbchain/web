/* eslint-disable */

import React, { useState } from 'react';
import { Main, Button, DropDown, Modal, Layout, textStyle } from '@aragon/ui';
import Connection from './Connection.js';
import BrandLogo from '../../assets/arbchainLogo.png';
import { fetchCount, increaseCounter } from '../../lib/contracts/Counter.js';
import { useAccount } from '../../wallet/Account.js';
import SignUp from './SignUp/SignUp';

const accounts = require('../../wallet/keys');
const networks = require('../../wallet/network');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});
const ACCOUNTS = accounts.map((node) => {
  return `${node.name} - (${node.orionPublicKey})`;
});

function LoginPage() {
  const [walletModal, setWalletModal] = useState(false);
  const [networkModal, setNetworkModal] = useState(false);
  const [selected, setSelected] = useState(0);
  const [account, setAccount] = useState(0);
  // const [signUpModal, setSignUpModal] = useState(false);

  // const open = () => setSignUpModal(true);
  // const close = () => setSignUpModal(false);

  const openNetwork = () => {
    setNetworkModal(true);
    increaseCount();
  };
  const openWallet = () => setWalletModal(true);
  const closeNetwork = () => setNetworkModal(false);
  const closeWallet = () => setWalletModal(false);

  // This is an action to be invoked onclick
  const increaseCount = () => increase(20, accounts[account]);

  const { connected, increase } = increaseCounter(NODES[selected]);
  const count = fetchCount(NODES[selected], accounts[account]);
  console.log(count);

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
        <Modal visible={walletModal} onClose={closeWallet}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              fontSize: '1.5rem',
              letterSpacing: '1px',
              fontWeight: '900',
              color: '#4D4CBB',
            }}
          >
            Select an account:
            <DropDown
              items={ACCOUNTS}
              selected={account}
              onChange={setAccount}
            />
          </div>
        </Modal>
        <Modal visible={networkModal} onClose={closeNetwork}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              fontSize: '1.5rem',
              letterSpacing: '1px',
              fontWeight: '900',
              color: '#4D4CBB',
            }}
          >
            Select a network:
            <DropDown
              items={NODES}
              selected={selected}
              onChange={setSelected}
            />
          </div>
        </Modal>

        {/* signup modal */}

        {/* <Modal visible={signUpModal} onClose={close}>
          <SignUp />
        </Modal> */}
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
                fontWeight: '900',
                color: '#4D4CBB',
              }}
            >
              Arbchain
            </div>
          </div>
          <div
            css={`
              text-align: center;
              margin-top: '5%';
            `}
          >
            <p>Select a node to get started</p>
          </div>
          <div
            style={{
              marginTop: '10%',
              textAlign: 'center',
              marginLeft: '10%',
              marginRight: '10%',
            }}
          >
            <Connection status={connected} />

            <Button wide onClick={openNetwork}>
              <b>Change network</b>
            </Button>
          </div>
          <div
            style={{
              textDecorationLine: 'underline',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '5%',
            }}
          >
            <p>AND</p>
          </div>
          <div
            style={{
              marginTop: '5%',
              textAlign: 'center',
              marginLeft: '10%',
              marginRight: '10%',
            }}
          >
            <Button wide onClick={openWallet}>
              Select an account
            </Button>
          </div>

          <div
            style={{
              marginTop: '5%',
              textAlign: 'center',
              marginLeft: '10%',
              marginRight: '10%',
            }}
          >
            <Button
              wide
              style={{ backgroundColor: '#4D4CBB', color: 'white' }}
              // onClick={open}
            >
              Login
            </Button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3%' }}>
            <p>
              New to Arbchain?
              <span style={{ color: '#4d4cbb', fontWeight: 'bold' }}>
                Sign-Up here
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
              style={{ flexShrink: '0', maxHeight: '40%' }}
              src={require('../../assets/login-page-banner.png')}
            />
          </div>
        </div>
      </div>
      <Layout />
    </Main>
  );
}

export default LoginPage;
