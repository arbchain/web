/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
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
import { useMetaData } from '../../contexts/MetaData.js';
import { authorizeUser, getAllUsers, getProcedureContractAddress } from '../../lib/db/threadDB';
import ArbitrationCard from './ArbitrationCard.js';
import wallet from 'wallet-besu';
import styled from 'styled-components';
import useAuthentication from '../../utils/auth';

// testing

import NewProcedure from './modals/Forms/NewProcedure';

const Web3 = require('web3');
const networks = require('../../wallet/network');

const web3 = new Web3();
const NODES = Object.keys(networks).map(node => {
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
    width: auto;
    background-color: #4d4cbb;
    color: #fff;
  }
`;

function ArbitrationList({ disputes, arbitrations, selectDispute }) {
  const walletAccount = useAccount();
  const metaDataContext = useMetaData();

  const [loading, setLoading] = useState(!metaDataContext.metadata.length);
  const [procedureModal, setProcedureModal] = useState(false);
  const [arbitrationDetails, setArbitrationDetails] = useState([]);
  const [caller, setCaller] = useState(null);
  const [parties, setParties] = useState([]);
  const [arbitrator, setArbitrator] = useState([]);
  const [court, setCourt] = useState([]);
  const [dbClient, setClient] = useState(null);
  const [agreementContracts, setAgreementContracts] = useState([]);
  const [procedureAddress, setProcedureAddress] = useState(metaDataContext.metadata);
  const [proceduresLoading, setProceduresLoading] = useState(!metaDataContext.metadata.length);
  const [opened, setOpened] = useState(false);

  const openProcedure = () => setProcedureModal(true);

  useAuthentication();

  const updateProcedureList = useCallback(
    procedureData => {
      setArbitrationDetails([...arbitrationDetails, procedureData]);
    },
    [arbitrationDetails]
  );

  const updateAddressList = useCallback(
    addressData => {
      setProcedureAddress([...procedureAddress, addressData]);
    },
    [procedureAddress]
  );

  useEffect(() => {
    async function load() {
      try {
        // Fetching the password locally. Need a secure way to do this for prod
        const account = await wallet.login(localStorage.getItem('wpassword'));
        // Update the account context by using a callback function
        const user = await web3.eth.accounts.privateKeyToAccount(`0x${account[0]}`);
        walletAccount.changeAccount({
          privateKey: account[0],
          orionPublicKey: localStorage.getItem('orionKey'),
          address: user.address,
          sign: user,
        });

        const client = await authorizeUser(localStorage.getItem('wpassword'));
        setClient(client);
        const users = await getAllUsers(client, account[0]);
        let address = []
        if (users.caller.procedureContract[0].id !== '-1') {
          address = users.caller.procedureContract
        }
        if (users.caller.agreementContracts[0].id !== '-1') {
          setAgreementContracts(users.caller.agreementContracts)
        }
        // console.log("Meta:",users.caller)
        setProcedureAddress(address);
        metaDataContext.changeMetaData(address);
        setProceduresLoading(false);
        setParties(users.party);
        setCaller(users.caller);
        setParties(users.party);
        setArbitrator(users.arbitrator);
        setCourt(users.court);
        setProceduresLoading(false);
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
            // const details = await getProcedureMetaData(dbClient, procedureAddress[index].metaData);
            allDetails.push(procedureAddress[index].metaData);
            index++;
            setArbitrationDetails(allDetails);
          }
          setLoading(false);
        }
      } catch (err) {
        return false;
      }
    }
    procedureAddressCall();
  }, [proceduresLoading]);

  return (
    <>
      <ButtonContainer>
        <div className="ProcedureModal">
          <ProcedureForm
            procedureModal={procedureModal}
            setProcedureModal={setProcedureModal}
            account={walletAccount.account}
            node={NODES[0]}
            counterParties={parties}
            caller={caller}
            client={dbClient}
            updateProcedureList={updateProcedureList}
            updateAddressList={updateAddressList}
            agreementContracts={agreementContracts}
          />
        </div>

        <NewProcedure opened={opened} setOpened={setOpened} />

        <Button
          label="+NEW PROCEDURE"
          onClick={() => {
            openProcedure();
          }}
        />

        {/* <Button
          label='+NEW test Proc'
          onClick={() => {
            setOpened();
          }}
        /> */}
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
                <span className="span">
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

      {loading || proceduresLoading ? (
        <Loader>
          <LoadingRing mode="half-circle" />
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
        <EmptyStateCard style={{ width: '100%' }} text="No Arbitrations found." />
      )}
    </>
  );
}

export default ArbitrationList;
