import React, { useState } from 'react';
import { Button, useTheme } from '@aragon/ui';
import styled from 'styled-components';
import ProposalForm from '../../modals/Forms/ProposalForm';

import { roles, stages, actions } from '../../../../utils/actions/arbitration';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  button {
    display: flex;
    margin: 25px;
    width: auto;
    background-color: #4d4cbb;
    color: #fff;
  }
`;

function Proposal({ currentStage, userRole, contractAddress, groupId, node, account,arbitrator }) {
  const theme = useTheme();
  const role = roles[userRole];
  const stage = stages[currentStage];
  const actionRole = actions[role];
  const stageAction = actionRole[stage] === 'nominate';
  const [opened, setOpened] = useState(false);
  const openSidePanel = () => setOpened(true);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <ProposalForm
          opened={opened}
          setOpened={setOpened}
          contractAddress={contractAddress}
          groupId={groupId}
          account={account}
          node={node}
          arbitrator={arbitrator}
        />
      </div>
      {stageAction ? (
        <ButtonContainer>
          <Button
            disabled={!stageAction}
            mode="strong"
            onClick={() => {
              openSidePanel();
            }}
            wide
            css={
              stageAction
                ? `
                  background: ${theme.selected};
                `
                : null
            }
          >
            NEW PROPOSAL
          </Button>
        </ButtonContainer>
      ) : null}
    </>
  );
}

export default Proposal;
