import React, { useEffect, useState } from 'react';
// import { AgreementContext } from './Contexts';
import { Accordion } from '@aragon/ui';

import AllProcedureStatements from './allDetailCards/AllProcedureStatements';

const networks = require('../../../wallet/network');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

function AllProcedure(props) {
  return (
    <div>
      <Accordion
        accordion
        items={[['Procedure Statements', [<AllProcedureStatements />]]]}
      />
    </div>
  );
}

export default AllProcedure;
