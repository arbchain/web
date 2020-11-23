import React, { useState } from 'react';
import { useTheme, Button, LoadingRing, DropDown, Box } from '@aragon/ui';
import { Table, Radio, Divider } from 'antd';
import { nominateArbitrator } from '../../../lib/contracts/SPC';
import styled from 'styled-components';

const NominateWrapper = styled.div`
  margin: 24px 0 18px 0;
`;

const networks = require('../../../wallet/network.js');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

function NominateWitness({}) {
  const theme = useTheme();
  const witnessist = ['wit1', 'wit2', 'wit3'];

  const [witness, setwitness] = useState(0);

  //   table data

  const columns = [
    {
      title: 'Arbitrators',
      dataIndex: 'arbitrators',
    },

    {
      title: 'Nominated By',
      dataIndex: 'nominatedBy',
    },
  ];
  const data = [
    {
      key: '1',
      arbitrators: 'John Brown',

      nominatedBy: '0x0x0x0x0x',
    },
    {
      key: '2',
      arbitrators: 'Jim Green',

      nominatedBy: '0x0x0x0x0x',
    },
  ];

  const handleClick = async () => {
    console.log('Clicked');
  };

  return (
    <>
      <Box heading='Witness Nomination'>
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
              placeholder='Select an Witness'
              style={{
                flexBasis: '100%',
                borderColor: '#D9D9D9',
              }}
              disabled={false}
              items={witnessist}
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
              onClick={handleClick}
              wide
              css={`
                background: ${theme.selected};
              `}
            >
              Nominate
            </Button>
          </div>
        </div>

        <NominateWrapper>
          <div>
            <h1
              css={`
                color: ${theme.surfaceContentSecondary};
              `}
            >
              Nominated Witnesses
            </h1>

            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
        </NominateWrapper>
      </Box>
    </>
  );
}
export default NominateWitness;
