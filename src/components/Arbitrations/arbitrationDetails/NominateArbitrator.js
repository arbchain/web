import React, { useState } from 'react';
import { useTheme, EmptyStateCard, Box } from '@aragon/ui';
import { Button, Table, Skeleton } from 'antd';
import empty from '../../../assets/empty.svg';
import styled from 'styled-components';

import { appointArbitrator } from '../../../lib/contracts/SPC';

const NominateWrapper = styled.div`
  margin: 10px 0 18px 0;
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [appointSubmitting, setAppointSubmitting] = useState(false);

  const { arbitratorAppointment } = appointArbitrator(node, contractAddress, groupId);

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

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const handleAppointArbitrator = async () => {
    setAppointSubmitting(true);
    console.log(selectedRowKeys)
    await arbitratorAppointment('0xf17f52151EbEF6C7334FAD080c5704D77216b732', '12323', account);
    setAppointSubmitting(false);
  };

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
            <Button
              type="primary"
              onClick={handleAppointArbitrator}
              disabled={!selectedRowKeys.length > 0}
              loading={appointSubmitting}
              css={`
                margin: 0px 0 30px 0;
              `}
            >
              Appoint Arbitrator
            </Button>
            <div>
              <h1
                css={`
                  color: ${theme.surfaceContentSecondary};
                `}
              >
                Nominated Arbitrators
              </h1>

              <Table
                rowSelection={rowSelection}
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
