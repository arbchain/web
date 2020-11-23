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

function NominateArbitrator({
  contractAddress,
  groupId,
  account,
  nominatedArbitrator,
}) {
  console.log('nominatedArbitrator:', nominatedArbitrator);
  const theme = useTheme();
  const arbitratorList = ['arbitrator1', 'arbitrator2', 'arbitrator3'];

  const [arbitrator, setArbitrator] = useState(0);

  const { connected, arbitratorNomination } = nominateArbitrator(
    NODES[0],
    contractAddress,
    groupId
  );

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
    console.log('SElected arbitrator:', arbitratorList[arbitrator]);
    await arbitratorNomination(
      '0xf17f52151EbEF6C7334FAD080c5704D77216b732',
      account
    );
    console.log('nominated!!!');
  };

  return (
    <>
      <Box heading='Arbitrator Nomination'>
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
              items={arbitratorList}
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
              Nominated Arbitrators
            </h1>

            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
        </NominateWrapper>
      </Box>
    </>
  );
}
export default NominateArbitrator;
