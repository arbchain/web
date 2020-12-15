import React, { useState } from 'react';
import { useTheme, Button, LoadingRing, DropDown, Box } from '@aragon/ui';
import { Table, Radio, Divider } from 'antd';
import { nominateWitness} from '../../../lib/contracts/SPC';
import styled from 'styled-components';

const NominateWrapper = styled.div`
  margin: 24px 0 18px 0;
`;

const networks = require('../../../wallet/network.js');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

function NominateWitness({contractAddress, account, groupId, NODE, nominatedWitness}) {
  console.log('nominatedWitness:', nominatedWitness);
  const theme = useTheme();
  const witnessList = ['wit1', 'wit2', 'wit3'];

  const [witness, setWitness] = useState(0);

  const { connected, witnessNomination } = nominateWitness(NODE, contractAddress, groupId);
  //   table data

  const columns = [
    {
      title: 'Witness Name',
      dataIndex: 'witnessAddress',
    }
  ];

  const handleClick = async () => {
    console.log('Nominated witness:', nominatedWitness[witness]);
    await witnessNomination('0xf17f52151EbEF6C7334FAD080c5704D77216b732', account);
    console.log('nominated!!!');
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
              Select Witness
            </h1>
            <DropDown
              placeholder='Select an Witness'
              style={{
                flexBasis: '100%',
                borderColor: '#D9D9D9',
              }}
              disabled={false}
              items={witnessList}
              onChange={(index)=> setWitness(index)}
              selected={witness}
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

        {
          nominatedWitness.length>=1 ?(
            <NominateWrapper>
              <div>
                <h1
                  css={`
                color: ${theme.surfaceContentSecondary};
              `}
                >
                  Nominated Witnesses
                </h1>

                <Table columns={columns} dataSource={nominatedWitness} pagination={false} style={{overflow:'hidden'}}/>
              </div>
            </NominateWrapper>
          ):null
        }

      </Box>
    </>
  );
}
export default NominateWitness;
