import React from 'react';
import { useTheme, EmptyStateCard, Box } from '@aragon/ui';
import { Table, Skeleton } from 'antd';
import empty from '../../../assets/empty.svg';
import styled from 'styled-components';

const NominateWrapper = styled.div`
  margin: 24px 0 18px 0;
`;


function NominateArbitrator({
  contractAddress,
  groupId,
  node,
  account,
  nominatedArbitrator,
  loading,
}) {
  const theme = useTheme();

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

  return (
    <>
      <Box heading="Arbitrator Nomination">
        {loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : nominatedArbitrator.length >= 1 ? (
          <NominateWrapper>
            <div>
              <h1
                css={`
                  color: ${theme.surfaceContentSecondary};
                `}
              >
                Nominated Arbitrators
              </h1>

              <Table
                columns={columns}
                dataSource={nominatedArbitrator}
                pagination={false}
                style={{ overflow: 'hidden' }}
              />
            </div>
          </NominateWrapper>
        ) : (
          <EmptyStateCard
            width="100%"
            illustration={<img src={empty} />}
            text="No Arbitrator Nominations."
          />
        )}
      </Box>
    </>
  );
}
export default NominateArbitrator;
