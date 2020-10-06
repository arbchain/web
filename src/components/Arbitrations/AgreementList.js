import React, { useState, useEffect } from 'react';
import { useTheme } from '@aragon/ui';

import { fetchAgreement } from '../../lib/contracts/Agreement';
import { useAccount } from '../../wallet/Account.js';
import { getAgreementAddress } from '../../lib/contracts/MasterContract';
// import DisputeCard from './DisputeCard';

import AgreementCard from './AgreementCard';

import wallet from 'wallet-besu';

const Web3 = require('web3');
// const accounts = require('../../wallet/keys');
const networks = require('../../wallet/network');

const NODES = Object.keys(networks).map(node => {
  return `${networks[node].host}:${networks[node].port}`;
});

function AgreementList({ disputes, arbitrations, selectDispute }) {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const [agreementDetails, setAgreementDetails] = useState([]);

  const walletAccount = useAccount();

  useEffect(() => {
    async function load() {
      try {
        // Fetching the password locally. Need a secure way to do this for prod
        const account = await wallet.login(localStorage.getItem('wpassword'));

        // Update the account context by using a callback function
        walletAccount.changeAccount({
          privateKey: account[0],
          orionPublicKey: localStorage.getItem('orionKey'),
        });
      } catch (err) {
        return false;
      }
    }
    load();
  }, []);

  const { agreementAddress } = getAgreementAddress(NODES[selected], walletAccount.account);

  useEffect(() => {
    async function agreementAddressCall() {
      try {
        if (agreementAddress.length) {
          console.log('Agreement adrees length', agreementAddress.length);
          let index = 0;
          const allDetails = [];
          while (index < parseInt(agreementAddress.length)) {
            const details = await fetchAgreement(
              NODES[selected],
              agreementAddress[index].agreementContractAddress,
              agreementAddress[index].groupId,
              walletAccount.account
            );
            allDetails.push(details);
            index++;
          }
          console.log(allDetails);
          setAgreementDetails(allDetails);
        }
      } catch (err) {
        return false;
      }
    }
    agreementAddressCall();
  }, [agreementAddress]);

  console.log('All agreement details', agreementAddress);

  return (
    <>
      {agreementDetails.map(agreement => {
        return (
          <AgreementCard key={agreement[0]} agreement={agreement} selectDispute={selectDispute} />
        );
      })}
    </>
  );
}

export default AgreementList;
