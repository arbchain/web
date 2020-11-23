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
import ProcedureStatementForm from '.././modals/ProcedureStatement';
import AllProcedureStatements from '../procedureDetails/AllProcedureStatements';
import AllAgreementStatements from '../procedureDetails/AllAgreementStatements';

import StatementForm from '../modals/StatementForm';
import ArbitrationCardDispute from '../../../assets/ArbitrationCardDispute.svg';
import {
  getAllStatements,
  getArbitrationDetails,
  nominateArbitrator,
} from '../../../lib/contracts/SPC';
import { useAccount } from '../../../wallet/Account';
import wallet from 'wallet-besu';
const networks = require('../../../wallet/network');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

function AllProcedure(props) {
  console.log('PROPS', props);

  const [tabs, setSelectTabs] = useState(0);
  const openStatement = () => setStatementModal(true);
  const [statementModal, setStatementModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const status = ['Open', 'Close'];
  const [procedureStatement, setProcedureStatement] = useState([]);
  const walletAccount = useAccount();

  return (
    <div>
      {/* {details[8].length > 0 &&
        details[8].map((value, index) => {
          console.log('PRO Details:', value.seat);
          return (
            <Accordion
              key={index}
              accordion
              items={[
                [
                  'Procedure Statements',
                  [
                    <AllProcedureStatements
                      documentIpfsHash={value.documentIpfsHash}
                      language={value.language}
                      seat={value.seat}
                    />,
                  ],
                ],
              ]}
            />
          );
        })} */}

      <Accordion
        accordion
        items={[['Procedure Statements', [<AllProcedureStatements />]]]}
      />
    </div>
  );
}

export default AllProcedure;
