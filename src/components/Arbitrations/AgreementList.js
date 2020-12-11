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
  Tabs,
  Tag,
  textStyle,
  useTheme,
} from '@aragon/ui';

import AgreementForm from './modals/AgreementForm';
//import NewAgreement from './modals/Popovers/NewAgreement';
import AgreementCard from './AgreementCard';
import { useAccount } from '../../wallet/Account.js';
import {
  authorizeUser,
  getAllUsers,
  getAgreementContractAddress,
  getAgreementMetaData,
} from '../../lib/db/threadDB';
import useAuthentication from '../../utils/auth';
import wallet from 'wallet-besu';
import styled from 'styled-components';

const Web3 = require('web3');
const networks = require('../../wallet/network');

const web3 = new Web3();
const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

// styles

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

  .AgreementModal {
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
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [agreementModal, setAgreementModal] = useState(false);
  const [caller, setCaller] = useState(null);
  const [parties, setParties] = useState([]);
  const [arbitrator, setArbitrator] = useState([]);
  const [court, setCourt] = useState([]);
  const [dbClient, setClient] = useState(null);
  const [agreementDetails, setAgreementDetails] = useState([]);
  const [agreementAddress, setAgreementAddress] = useState(null);
  const [agreementsLoading, setAgreementsLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  const openAgreement = () => setAgreementModal(true);
  const openSidePanel = () => setOpened(true);

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
          orionPublicKey: localStorage.getItem('orionKey'),
        });

        const client = await authorizeUser(localStorage.getItem('wpassword'));
        setClient(client);
        const users = await getAllUsers(client, account[0]);
        const address = await getAgreementContractAddress(client, account[0]);
        setAgreementAddress(address);
        setAgreementsLoading(false);
        console.log('ADRess:', address);
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
    async function agreementAddressCall() {
      try {
        if (agreementAddress.length) {
          setLoading(true);
          console.log('Agreement adrees length', agreementAddress.length);
          let index = 0;
          const allDetails = [];
          while (index < parseInt(agreementAddress.length)) {
            /* const details = await fetchAgreement(
              NODES[0],
              agreementAddress[index].contractAddress,
              agreementAddress[index].groupId,
              walletAccount.account
            ); */
            const details = await getAgreementMetaData(
              dbClient,
              agreementAddress[index].metaData
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

  return (
    <>
      <ButtonContainer>
        <AgreementForm
          agreementModal={agreementModal}
          setAgreementModal={setAgreementModal}
          account={walletAccount.account}
          node={NODES[0]}
          counterParties={parties}
          caller={caller}
        />

        {/* <NewAgreement
          opened={opened}
          setOpened={setOpened}
          account={walletAccount.account}
          node={NODES[0]}
          counterParties={parties}
          caller={caller}
        /> */}

        <Button
          label='+NEW AGREEMENT'
          onClick={() => {
            openAgreement();
          }}
        />
        <Button
          label='+NEW '
          onClick={() => {
            openSidePanel();
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
                <span>
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

      {loading || agreementsLoading ? (
        <Loader>
          <span> Fetching arbitrations </span> <br />
          <LoadingRing mode='half-circle' />
        </Loader>
      ) : agreementAddress.length ? (
        agreementDetails.map((agreement) => {
          return (
            <AgreementCard
              key={agreement[0]}
              agreement={agreement}
              selectDispute={selectDispute}
            />
          );
        })
      ) : (
        <EmptyStateCard style={{ width: '100%' }} text='No Agreements found.' />
      )}
    </>
  );
}

export default ArbitrationList;
