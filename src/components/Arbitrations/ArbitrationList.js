/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Bar,
  Button,
  EmptyStateCard,
  LoadingRing,
  DateRangePicker,
  DropDown,
  IconRefresh,
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

const Web3 = require('web3');
const networks = require('../../wallet/network');

const web3 = new Web3();
const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

function ArbitrationList({ disputes, arbitrations, selectDispute }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [agreementModal, setAgreementModal] = useState(false);
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
  const history = useHistory();

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

        const client = await authorizeUser(localStorage.getItem('wpassword'));
        setClient(client);
        const users = await getAllUsers(client, account[0]);
        const address = await getProcedureContractAddress(client, account[0]);
        setProcedureAddress(address);
        setProceduresLoading(false);

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
          console.log(allDetails);
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

  useEffect(() => {
    async function load() {
      try {
        // Fetching the password locally.
        const account = await wallet.login(localStorage.getItem('wpassword'));
        const OrianKey = await localStorage.getItem('orionKey');
        console.log('OIARKEY', OrianKey);

        if (
          account === null ||
          account === undefined ||
          OrianKey === null ||
          OrianKey === undefined
        ) {
          setIsAuth(false);
          history.push('/login');
        }
        console.log('ACCOUNT from Dashboard', account);
      } catch (err) {
        console.log(err);
      }
    }
    load();
  }, [isAuth]);
  console.log('ISAUTH', isAuth);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div />
        {/* procedure modal */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <ProcedureForm
            procedureModal={procedureModal}
            setProcedureModal={setProcedureModal}
            account={walletAccount.account}
            node={NODES[0]}
            counterParties={parties}
            caller={caller}
          />
        </div>

        <div style={{ display: 'flex', marginBottom: '12px' }}>
          <div style={{ marginLeft: '0.5rem' }}>
            <Button
              label='+NEW PROCEDURE'
              onClick={() => {
                openProcedure();
              }}
            />
          </div>
        </div>
      </div>

      <Bar>
        <div
          css={`
            height: ${8 * GU}px;
            display: grid;
            grid-template-columns: auto auto 1fr auto;
            grid-gap: ${1 * GU}px;
            align-items: center;
            padding: 0 ${3 * GU}px;
          `}
        >
          <DropDown
            header='Status'
            placeholder='Status'
            // selected={disputeStatusFilter}
            // onChange={handleDisputeStatusFilterChange}
            items={[
              // eslint-disable-next-line
              <div>
                All
                <span
                  css={`
                    margin-left: ${1.5 * GU}px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: ${theme.info};
                    ${textStyle('label3')};
                  `}
                >
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
        </div>
      </Bar>

      {loading || proceduresLoading ? (
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            height: '300px',
            alignItems: 'center',
          }}
        >
          <span> Fetching arbitrations </span> <br />
          <LoadingRing mode='half-circle' />
        </div>
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
