import React, {useState} from 'react';
import { useTheme, Button, LoadingRing, DropDown } from '@aragon/ui';
import {nominateArbitrator} from '../../lib/contracts/SPC';

const networks = require('../../wallet/network.js');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

export default function NominateArbitrator({contractAddress, groupId, account, nominatedArbitrator}) {

  console.log("nominatedArbitrator:",nominatedArbitrator)
  const theme = useTheme();
  const arbitratorList = ['arbitrator1', "arbitrator2", "arbitrator3"]

  const [arbitrator, setArbitrator] = useState(0)

  const { connected, arbitratorNomination } = nominateArbitrator(NODES[0], contractAddress, groupId);

  const handleClick = async () => {
    console.log("SElected arbitrator:",arbitratorList[arbitrator])
    await arbitratorNomination('0xf17f52151EbEF6C7334FAD080c5704D77216b732', account)
    console.log('nominated!!!');
  };

  return (
    <>
      <div
        className='nomination__container'
        css={`
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-column-gap: 8px;
          margin-bottom: 18px;
        `}
      >
        <div>
          <h1
            css={`
              color: ${theme.surfaceContentSecondary};
            `}
          >
            Select Arbitrator
          </h1>
          <DropDown
            placeholder='Select an Arbitrator'
            style={{
              flexBasis: '100%',
              borderColor: '#D9D9D9',
            }}
            disabled={false}
            items={['lorem', 'lorem']}
            wide
          />
        </div>

        <div
          css={`
            align-self: end;
          `}
        >
          <Button
            mode='strong'
            onClick={() => {
              console.log('WORKSSSS');
            }}
            wide
            css={`
              background: ${theme.selected};
            `}
          >
            Nominate
          </Button>
        </div>
      </div>
    </>
  );
}
