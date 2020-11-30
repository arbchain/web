import React, { useState, useEffect } from 'react';
import { useTheme, EmptyStateCard, LoadingRing } from '@aragon/ui';

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

function AgreementList({ disputes, selectDispute, walletAccount }) {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const [agreementDetails, setAgreementDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const [ agreementsLoading, agreementAddress ] = getAgreementAddress(NODES[0], walletAccount.account);

  useEffect(() => {
    async function agreementAddressCall() {
      try {
        if (agreementAddress.length) {
          setLoading(true);
          console.log('Agreement adrees length', agreementAddress.length);
          let index = 0;
          const allDetails = [];
          while (index < parseInt(agreementAddress.length)) {
            const details = await fetchAgreement(
              NODES[0],
              agreementAddress[index].agreementContractAddress,
              agreementAddress[index].groupId,
              walletAccount.account
            );
            allDetails.push(details);
            index++;
          }
          console.log(allDetails);
          setAgreementDetails(allDetails);
          setLoading(false);
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
      {
      loading || agreementsLoading ?
      <div style={{justifyContent: "center", display: "flex", height: "300px", alignItems: "center"}}>
      <span> Fetching agreements </span> <br/>
      <LoadingRing mode="half-circle"/> 
      </div> :
      agreementAddress.length ?
      agreementDetails.map(agreement => {
        return (
          <AgreementCard key={agreement[0]} agreement={agreement} selectDispute={selectDispute} />
        );
      }) : <EmptyStateCard text="No agreements found." />}
    </>
  );
}

export default AgreementList;
