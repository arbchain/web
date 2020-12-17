/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
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
// import NewAgreement from './modals/Popovers/NewAgreement';
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
const NODES = Object.keys(networks).map(node => {
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
  justify-content: flex-end;
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

  const updateAgreementData = useCallback(
    (agreementData, addressData) => {
      console.log('Agreement Data', agreementData);
      console.log('Agreement Address', addressData);
      setAgreementDetails([...agreementDetails, agreementData]);
      setAgreementAddress([...agreementAddress, addressData]);
    },
    [agreementDetails, agreementAddress]
  );

  const updateAddressList = useCallback(
    addressData => {
      setAgreementAddress([...agreementAddress, addressData]);
    },
    [agreementAddress]
  );

  const updateAgreementList = useCallback(
    agreementData => {
      console.log(agreementData);
      setAgreementDetails([...agreementDetails, agreementData]);
    },
    [agreementDetails]
  );

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
          let index = 0;
          const allDetails = [];
          while (index < parseInt(agreementAddress.length)) {
            allDetails.push(agreementAddress[index].metaData);
            index++;
          }
          setAgreementDetails(allDetails);
          console.log(allDetails);
          setLoading(false);
        }
      } catch (err) {
        return false;
      }
    }
    agreementAddressCall();
  }, [agreementAddress]);

  if (agreementDetails) {
    console.log('Agreement Details', agreementDetails);
    console.log('Agreement Addresses', agreementAddress);
  }

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
          updateAgreementList={updateAgreementList}
          updateAddressList={updateAddressList}
          updateAgreementData={updateAgreementData}
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
          label="+NEW AGREEMENT"
          onClick={() => {
            openAgreement();
          }}
        />
      </ButtonContainer>

      <Bar>
        <BarContainer>
          <DropDown
            header="Status"
            placeholder="Status"
            // selected={disputeStatusFilter}
            // onChange={handleDisputeStatusFilterChange}
            items={[
              // eslint-disable-next-line
              <div>
                All
                <span>
                  <Tag limitDigits={4} label={disputes.length} size="small" />
                </span>
              </div>,
              'Open',
              'Closed',
            ]}
            width="128px"
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
          <span> Fetching agreements </span> <br />
          <LoadingRing mode="half-circle" />
        </Loader>
      ) : agreementAddress.length ? (
        agreementDetails.map((agreement, index) => {
          return (
            <AgreementCard
              key={index}
              agreement={agreement}
              selectDispute={selectDispute}
              agreementAddress={agreementAddress[index]}
            />
          );
        })
      ) : (
        <EmptyStateCard width="100%" text="No Agreements found." />
      )}
    </>
  );
}

export default ArbitrationList;
