import React from 'react';
import { useTheme, EmptyStateCard, Box } from '@aragon/ui';
import { Table, Skeleton } from 'antd';
import empty from '../../../assets/empty.svg';
import styled from 'styled-components';

const NominateWrapper = styled.div`
  margin: 24px 0 18px 0;
`;

function NominateWitness({ contractAddress, account, groupId, NODE, nominatedWitness, loading }) {
  const theme = useTheme();

  const columns = [
    {
      title: 'Witness Name',
      dataIndex: 'witnessAddress',
    },
  ];

  return (
    <>
      <Box heading="Witness Nomination">
        {loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : nominatedWitness.length >= 1 ? (
          <NominateWrapper>
            <div>
              <h1
                css={`
                  color: ${theme.surfaceContentSecondary};
                `}
              >
                Nominated Witnesses
              </h1>

              <Table
                columns={columns}
                dataSource={nominatedWitness}
                pagination={false}
                style={{ overflow: 'hidden' }}
              />
            </div>
          </NominateWrapper>
        ) : (
          <EmptyStateCard
            width="100%"
            illustration={<img src={empty} />}
            text="No Witness Nominations."
          />
        )}
      </Box>
    </>
  );
}
export default NominateWitness;
