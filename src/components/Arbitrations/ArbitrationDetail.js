import React, { useEffect, useState } from 'react';
// import { AgreementContext } from './Contexts';
import {
  BackButton,
  Bar,
  Box,
  Split,
  GU,
  Text,
  textStyle,
  IdentityBadge,
  useTheme,
  Button,
  LoadingRing,
  EmptyStateCard,
  Accordion,
  DropDown,
  Tabs,
  Tag,
} from '@aragon/ui';

import { useHistory } from 'react-router-dom';

import DisputeTimeline from './DisputeTimeline';

import ArbDetails from './agreementDetails/arbDetails';
import AllStatements from './agreementDetails/allStatements';
import AllProcedure from './agreementDetails/allProcedures';
import NominationPage from './agreementDetails/NominationPage';
import { useAccount } from '../../wallet/Account';

const networks = require('../../wallet/network');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

const ArbitrationDetail = (props) => {
  const history = useHistory();
  const theme = useTheme();
  const [statementModal, setStatementModal] = useState(true);

  const [language, setLanguage] = useState(0);
  const [seat, setSeat] = useState(0);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [statement, setStatement] = useState(null);
  const openStatement = () => setStatementModal(true);

  const contractAddress = props.match.params.address;
  const groupId = decodeURIComponent(props.match.params.groupId);
  const status = ['Open', 'Close'];
  const walletAccount = useAccount();
  const [procedureStatement, setProcedureStatement] = useState([]);

  // Procedure statement modal
  const [ProcedureStatementModal, setProcedureStatementModal] = useState(false);

  // Procedure Statement form
  const openProcedureStatement = () => setProcedureStatementModal(true);

  const [tabs, setSelectTabs] = useState(0);

  const handleTabChange = (tabs) => {
    setSelectTabs(tabs);
  };

  console.log('TABSSS', tabs);

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

              {tabs == 0 ? (
                <>
                  <ArbDetails
                    contractAddress={contractAddress}
                    groupId={groupId}
                  />
                </>
              ) : null}

              {tabs == 1 ? (
                <>
                  <AllStatements />
                  <AllProcedure />
                </>
              ) : null}

              {tabs == 2 ? (
                <>
                  <NominationPage />
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
