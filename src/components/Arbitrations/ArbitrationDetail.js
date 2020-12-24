import React, { useEffect, useState } from 'react';
import { BackButton, Bar, Box, Split, useTheme, Tabs } from '@aragon/ui';
import { Skeleton } from 'antd';
import { useHistory } from 'react-router-dom';
import DisputeTimeline from './DisputeTimeline';
import ArbDetails from './arbitrationDetails/arbDetails';
import AllStatements from './arbitrationDetails/allStatements';
import NominationPage from './arbitrationDetails/NominationPage';
import useAuthentication from '../../utils/auth';
import { useAccount } from '../../wallet/Account';
import { getArbitrationDetails } from '../../lib/contracts/SPC';
import wallet from 'wallet-besu';

import { authorizeUser, getAllUsers } from '../../lib/db/threadDB';
const networks = require('../../wallet/network');
const Web3 = require('web3');
const web3 = new Web3();
const NODES = Object.keys(networks).map(node => {
  return `${networks[node].host}:${networks[node].port}`;
});

const ArbitrationDetail = props => {
  const history = useHistory();
  const contractAddress = props.match.params.address;
  const groupId = decodeURIComponent(props.match.params.groupId);
  const walletAccount = useAccount();
  const role = props.match.params.role;

  const [tabs, setSelectTabs] = useState(0);
  const [dbClient, setClient] = useState(null);
  const [caller, setCaller] = useState(null);
  const [parties, setParties] = useState([]);
  const [arbitrator, setArbitrator] = useState([]);
  const [court, setCourt] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);

  const handleTabChange = tabs => {
    setSelectTabs(tabs);
  };

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
        const users = await getAllUsers(client, account[0]);
        setClient(client);
        setParties(users.party);
        setCaller(users.caller);
        setArbitrator(users.arbitrator);
        setCourt(users.court);
      } catch (err) {
        console.log('ERROR', err);
        return false;
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function getDetails() {
      try {
        console.log(walletAccount.account);
        if (Object.keys(walletAccount.account).length) {
          setLoading(true);
          const details = await getArbitrationDetails(
            NODES[0],
            contractAddress,
            groupId,
            walletAccount.account
          );
          // There is an addition call being made that replaces the details. A quick fix
          if (details) {
            setDetails(details);
          }
          setLoading(false);
        }
      } catch (err) {
        return false;
      }
    }
    getDetails();
  }, [walletAccount.account]);

  useAuthentication();

  return (
    <div>
      {/* statement  modal */}

      <Bar style={{ marginTop: '12px' }}>
        <BackButton onClick={() => history.goBack()} />
      </Bar>

      <>
        <Split
          primary={
            <React.Fragment>
              <div style={{ marginTop: '14px' }}>
                <Tabs
                  items={['Arbitration Details', 'All Statements', 'All Proposals']}
                  selected={tabs}
                  onChange={handleTabChange}
                />
              </div>

              {tabs === 0 ? (
                <>
                  <ArbDetails
                    loading={loading}
                    details={details}
                    contractAddress={contractAddress}
                    groupId={groupId}
                    NODE={NODES[0]}
                    caller={caller}
                    parties={parties}
                    account={walletAccount.account}
                    role={role}
                  />
                </>
              ) : null}

              {tabs === 1 ? (
                <>
                  <AllStatements
                    contractAddress={contractAddress}
                    groupId={groupId}
                    NODE={NODES[0]}
                    account={walletAccount.account}
                    role={role}
                  />
                  {/* <AllProcedure /> */}
                </>
              ) : null}

              {tabs === 2 ? (
                <>
                  <NominationPage
                    contractAddress={contractAddress}
                    groupId={groupId}
                    NODE={NODES[0]}
                    account={walletAccount.account}
                    role={role}
                    details={details}
                  />
                </>
              ) : null}
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Box heading="Dispute timeline" padding={0}>
                <DisputeTimeline
                  NODE={NODES[0]}
                  account={walletAccount.account}
                  contractAddress={contractAddress}
                  groupId={groupId}
                />
              </Box>
            </React.Fragment>
          }
        />
      </>
    </div>
  );
};

export default ArbitrationDetail;
