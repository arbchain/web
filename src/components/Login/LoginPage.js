/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
  Main,
  Button,
  DropDown,
  Modal,
  Layout,
  textStyle,
} from '@aragon/ui'
import profile from '../../assets/login-page-banner.png'
import BrandLogo from '../../assets/arbchainlogo.svg'
import {Web3Contract} from '../../utils/web3-contracts.js'

const ContractAbi = require("../../build/Counter.json");
const { orion, besu } = require("../../wallet/keys");
const ContractReceipt = require("../../build/Counter_receipt.json");

const loginstyle = {
  color: 'red',
  backgroundColor: 'pink',
  display: 'flex',
  justifyContent: 'space-between',
}
let primary = '#52006F';

function LoginPage() {

    const [walletModal, setWalletModal] = useState(false)
    const [networkModal, setNetworkModal] = useState(false)
    const [selected, setSelected] = useState(0)

    const openNetwork = () => setNetworkModal(true)
    const openWallet = () => setWalletModal(true)
    const closeNetwork = () => setNetworkModal(false)
    const closeWallet = () => setWalletModal(false)

    // TODO: Fix await warning
    useEffect( () => {

        async function connectUser() {

            let web3Contract = new Web3Contract()
            await web3Contract.create(ContractAbi, ContractReceipt.contractAddress, [], ContractReceipt.privacyGroupId)
            await web3Contract.call('increaseCounter',[20])
            console.log(await web3Contract.call('getCounter'))
        }

        if (!walletModal && !networkModal) {
            connectUser()
        }



    });



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
                      color: primary,
                  }}
              >
              Select an account:

              <DropDown
                  items={Object.keys(orion).map(node => {return `${node} (${orion[node].publicKey})`})}
                  selected={selected}
                  onChange={setSelected}
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
                      color: primary,
                  }}
              >
                  Select a network:

                  <DropDown
                      items={Object.keys(besu).map(node => {return besu[node].url})}
                      selected={selected}
                      onChange={setSelected}
                  />
              </div>
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
              <img style={{ width: '70%' }} src={BrandLogo} />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                fontSize: '1.5rem',
                letterSpacing: '1px',
                fontWeight: '900',
                color: primary,
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
            <Button wide onClick={openNetwork}>Select a network</Button>
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
            <Button wide style={{ backgroundColor: '#52006F', color: 'white' }} onClick={openWallet}>
              Select an account
            </Button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3%' }}>
            <p>Troubleshoot Guide</p>
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
  )
}

export default LoginPage
