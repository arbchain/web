import React, { useState } from 'react';
import { BackButton, Bar, Box, Split, Tabs } from '@aragon/ui';
import { useHistory } from 'react-router-dom';
import DisputeTimeline from './DisputeTimeline';
import ArbDetails from './agreementDetails/arbDetails';
import AllStatements from './agreementDetails/allStatements';
import NominationPage from './agreementDetails/NominationPage';
import useAuthentication from '../../utils/auth';
import { useAccount } from '../../wallet/Account';

const networks = require('../../wallet/network');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

const ArbitrationDetail = (props) => {
  const [tabs, setSelectTabs] = useState(0);

  useAuthendication();
  const history = useHistory();
  const contractAddress = props.match.params.address;
  const groupId = decodeURIComponent(props.match.params.groupId);
  const walletAccount = useAccount();

  const handleTabChange = (tabs) => {
    setSelectTabs(tabs);
  };

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
                    'Agreement Details',
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
