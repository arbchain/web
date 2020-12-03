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
import AgreementCard from './AgreementCard';
import { useAccount } from '../../wallet/Account.js';
import {
  authorizeUser,
  getAllUsers,
  getAgreementContractAddress, getAgreementMetaData
} from '../../lib/db/threadDB';
import wallet from 'wallet-besu';

const Web3 = require('web3');
const networks = require('../../wallet/network');

const web3 = new Web3();
const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

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
  const [agreementAddress, setAgreementAddress] = useState(null)
  const [agreementsLoading, setAgreementsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(true);


  const openAgreement = () => setAgreementModal(true);

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
        const address = await getAgreementContractAddress(client, account[0])
        setAgreementAddress(address)
        setAgreementsLoading(false)
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
            /*const details = await fetchAgreement(
              NODES[0],
              agreementAddress[index].contractAddress,
              agreementAddress[index].groupId,
              walletAccount.account
            );*/
            const details = await getAgreementMetaData(dbClient, agreementAddress[index].metaData)
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
        <AgreementForm
          agreementModal={agreementModal}
          setAgreementModal={setAgreementModal}
          account={walletAccount.account}
          node={NODES[0]}
          counterParties={parties}
          caller={caller}
        />
        <div />
        {/* procedure modal */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
        </div>

        <div style={{ display: 'flex', marginBottom: '12px' }}>
          <div style={{ marginLeft: '0.5rem', marginRight: '0.25rem' }}>
            <Button
              label='+NEW AGREEMENT'
              onClick={() => {
                openAgreement();
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

      {loading || agreementsLoading ? (
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
      ) :
      agreementAddress.length ?
      agreementDetails.map(agreement => {
        return (
          <AgreementCard key={agreement[0]} agreement={agreement} selectDispute={selectDispute} />
        );
      }): (
        <EmptyStateCard text='No arbitrations found.' />
      )}
    </>
  );
}

export default ArbitrationList;
