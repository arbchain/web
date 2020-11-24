import React, {useEffect, useState} from 'react';
import { useTheme, Button, LoadingRing, DropDown, Box } from '@aragon/ui';
import { Table, Radio, Divider } from 'antd';
import { nominateArbitrator } from '../../../lib/contracts/SPC';
import styled from 'styled-components';

const NominateWrapper = styled.div`
  margin: 24px 0 18px 0;
`;

function NominateArbitrator({contractAddress, groupId, node, account, nominatedArbitrator}) {
  console.log('nominatedArbitrator:', nominatedArbitrator);
  const theme = useTheme();
  const arbitratorList = ['arbitrator1', 'arbitrator2', 'arbitrator3'];

  const [arbitrator, setArbitrator] = useState(0);

  const { connected, arbitratorNomination } = nominateArbitrator(node, contractAddress, groupId);

  const columns = [
    {
      title: 'Arbitrator',
      dataIndex: 'arbitrator',
    },

    {
      title: 'Nominated By',
      dataIndex: 'party',
    },
  ];

  const handleClick = async () => {
    console.log('SElected arbitrator:', arbitratorList[arbitrator]);
    await arbitratorNomination('0xf17f52151EbEF6C7334FAD080c5704D77216b732', account);
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
              onChange={(index)=> setArbitrator(index)}
              selected={arbitrator}
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
          nominatedArbitrator.length>=1 ? (
            <NominateWrapper>
              <div>
                <h1
                  css={`
                color: ${theme.surfaceContentSecondary};
              `}
                >
                  Nominated Arbitrators
                </h1>

                <Table columns={columns} dataSource={nominatedArbitrator} pagination={false} />
              </div>
            </NominateWrapper>
          ) : null
        }

      </Box>
    </>
  );
}
export default NominateArbitrator;
