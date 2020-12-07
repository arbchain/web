/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Bar,
  Button,
  EmptyStateCard,
  LoadingRing,
  DateRangePicker,
  DropDown,
  GU,
  Tag,
  textStyle,
  useTheme,
} from '@aragon/ui';

import ProcedureForm from './modals/ProcedureForm';
import { useAccount } from '../../wallet/Account.js';
import {
  authorizeUser,
  getAllUsers,
  getProcedureContractAddress,
  getProcedureMetaData,
} from '../../lib/db/threadDB';
import ArbitrationCard from './ArbitrationCard.js';
import wallet from 'wallet-besu';
import styled from 'styled-components';
import useAuthentication from '../../utils/auth';

const Web3 = require('web3');
const networks = require('../../wallet/network');

const web3 = new Web3();
const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

// Styled Components

const Loader = styled.div`
  justify-content: center;
  display: flex;
  height: 300px;
  align-items: center;
  background: #fff;
  border: 1px solid #dde4e9;
`;

const BarContainer = styled.div`
  height: ${8 * GU}px;
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  grid-gap: ${1 * GU}px;
  align-items: center;
  padding: 0 ${3 * GU}px;

  .span {
    margin-left: ${1.5 * GU}px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${useTheme.info};
    ${textStyle('label3')};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  .ProcedureModal {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  button {
    display: flex;
    margin-bottom: 12px;
    margin-left: 0.5rem;
    background-color: #4d4cbb;
    color: #fff;
  }
`;

function ArbitrationList({ disputes, arbitrations, selectDispute }) {
  const [loading, setLoading] = useState(true);

  const [procedureModal, setProcedureModal] = useState(false);
  const [arbitrationDetails, setArbitrationDetails] = useState([]);
  const [caller, setCaller] = useState(null);
  const [parties, setParties] = useState([]);
  const [arbitrator, setArbitrator] = useState([]);
  const [court, setCourt] = useState([]);
  const [dbClient, setClient] = useState(null);
  const [procedureAddress, setProcedureAddress] = useState(null);
  const [proceduresLoading, setProceduresLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(true);

  const openProcedure = () => setProcedureModal(true);

  const walletAccount = useAccount();

  useAuthentication();

  useEffect(() => {
    async function load() {
      try {
        // Fetching the password locally. Need a secure way to do this for prod
        const account = await wallet.login(localStorage.getItem('wpassword'));
        // Update the account context by using a callback function
        walletAccount.changeAccount({
          privateKey: account[0],
          orionPublicKey: localStorage.getItem('orionKey')
        });

        const client = await authorizeUser(localStorage.getItem('wpassword'))
        setClient(client)
        const users = await getAllUsers(client,account[0])
        const address = await getProcedureContractAddress(client, account[0])
        setProcedureAddress(address)
        setProceduresLoading(false)
        setParties(users.party);
        setCaller(users.caller);
        setArbitrator(users.arbitrator);
        setCourt(users.court);
      } catch (err) {
        return false;
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function procedureAddressCall() {
      try {
        if (!proceduresLoading) {
          let index = 0;
          const allDetails = [];
          while (index < parseInt(procedureAddress.length)) {
            const details = await getProcedureMetaData(
              dbClient,
              procedureAddress[index].metaData
            );
            allDetails.push(details);
            index++;
          }
          setArbitrationDetails(allDetails);
          setLoading(false);
        }
      } catch (err) {
        return false;
      }
    }
    procedureAddressCall();
  }, [proceduresLoading]);

  if (arbitrationDetails.length !== 0) {
    console.log('All Arbitration Details', arbitrationDetails);
  }

  return (
    <>
      <ButtonContainer>
        <div className='ProcedureModal'>
          <ProcedureForm
            procedureModal={procedureModal}
            setProcedureModal={setProcedureModal}
            account={walletAccount.account}
            node={NODES[0]}
            counterParties={parties}
            caller={caller}
          />
        </div>

        <Button
          label='+NEW PROCEDURE'
          onClick={() => {
            openProcedure();
          }}
        />
      </ButtonContainer>

      <Bar>
        <BarContainer>
          <DropDown
            header='Status'
            placeholder='Status'
            // selected={disputeStatusFilter}
            // onChange={handleDisputeStatusFilterChange}
            items={[
              // eslint-disable-next-line
              <div>
                All
                <span className='span'>
                  <Tag limitDigits={4} label={disputes.length} size='small' />
                </span>
              </div>,
              'Open',
              'Closed',
            ]}
            width='128px'
          />
          <DateRangePicker
          // startDate={disputeDateRangeFilter.start}
          // endDate={disputeDateRangeFilter.end}
          // onChange={handleDisputeDateRangeFilterChange}
          />
          {/* <Button>My disputes</Button> */}
        </BarContainer>
      </Bar>

      {loading || proceduresLoading ? (
        <Loader>
          <LoadingRing mode='half-circle' />
          <br />
          <span> Fetching arbitrations </span>
        </Loader>
      ) : procedureAddress.length ? (
        arbitrationDetails.map((arbitration, index) => {
          return (
            <ArbitrationCard
              key={index}
              arbitration={arbitration}
              selectDispute={selectDispute}
              procedureAddress={procedureAddress[index]}
            />
          );
        })
      ) : (
        <EmptyStateCard text='No arbitrations found.' />
      )}
    </>
  );
}

export default ArbitrationList;
