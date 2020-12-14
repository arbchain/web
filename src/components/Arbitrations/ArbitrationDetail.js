import React, { useEffect, useState } from 'react';
import {BackButton, Bar, Box, Split, useTheme, Tabs} from '@aragon/ui';
import { useHistory } from 'react-router-dom';
import DisputeTimeline from './DisputeTimeline';
import ArbDetails from './arbitrationDetails/arbDetails';
import AllStatements from './arbitrationDetails/allStatements';
import NominationPage from './arbitrationDetails/NominationPage';
import useAuthentication from '../../utils/auth';
import { useAccount } from '../../wallet/Account';
import wallet from 'wallet-besu';
import {authorizeUser, getAllUsers} from "../../lib/db/threadDB";
const networks = require('../../wallet/network');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

const ArbitrationDetail = (props) => {
  const history = useHistory();
  const contractAddress = props.match.params.address;
  console.log("address", contractAddress)
  const groupId = decodeURIComponent(props.match.params.groupId);
  console.log("group", groupId)
  const walletAccount = useAccount();
  // Procedure statement modal
  const [ProcedureStatementModal, setProcedureStatementModal] = useState(false);

  // Procedure Statement form
  const openProcedureStatement = () => setProcedureStatementModal(true);

  const [tabs, setSelectTabs] = useState(0);
  const [dbClient, setClient] = useState(null)
  const [caller, setCaller] = useState(null);
  const [parties, setParties] = useState([]);
  const [arbitrator, setArbitrator] = useState([]);
  const [court, setCourt] = useState([]);

  const handleTabChange = (tabs) => {
    setSelectTabs(tabs);
  };

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
        const users = await getAllUsers(client,account[0])
        setClient(client)
        setParties(users.party)
        setCaller(users.caller)
        setArbitrator(users.arbitrator)
        setCourt(users.court)
      } catch (err) {
        console.log('ERROR', err)
        return false;
      }
    }
    load();
  }, []);

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
                  items={[
                    'Arbitration Details',
                    'All Statements',
                    'All Proposals',
                  ]}
                  selected={tabs}
                  onChange={handleTabChange}
                />
              </div>

              {tabs === 0 ? (
                <>
                  <ArbDetails
                    contractAddress={contractAddress}
                    groupId={groupId}
                    NODE={NODES[0]}
                    account={walletAccount.account}
                    caller={caller}
                    parties={parties}
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
                  />
                  {/*<AllProcedure />*/}
                </>
              ) : null}

              {tabs === 2 ? (
                <>
                  <NominationPage
                    contractAddress={contractAddress}
                    groupId={groupId}
                    NODE={NODES[0]}
                    account={walletAccount.account}
                  />
                </>
              ) : null}
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Box heading='Dispute timeline' padding={0}>
                <DisputeTimeline />
              </Box>
            </React.Fragment>
          }
        />
      </>
    </div>
  );
};

export default ArbitrationDetail;
