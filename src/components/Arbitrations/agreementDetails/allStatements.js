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

function AllStatements(props) {
  console.log('PROPS', props);

  const [tabs, setSelectTabs] = useState(0);
  const openStatement = () => setStatementModal(true);
  const [statementModal, setStatementModal] = useState(false);

  return (
    <>
      <Accordion
        accordion
        items={[['All Statements', [<AllAgreementStatements />]]]}
      />
    </>
  );
}

export default AllStatements;
