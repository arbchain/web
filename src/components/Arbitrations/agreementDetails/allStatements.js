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

import AllAgreementStatements from './allDetailCards/AllAgreementStatements';

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

function AllStatements() {
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
