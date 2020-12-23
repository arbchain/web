import React, { useState } from 'react';
import { Button, useTheme } from '@aragon/ui';
import styled from 'styled-components';
import ProposalForm from '../../modals/Forms/ProposalForm';

const actions = require('../../../../utils/actions/arbitration');

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

function Proposal({ stage, role, contractAddress, groupId, node, account }) {
  const theme = useTheme();
  const roleIndex = actions.roles[role];
  const stageAction = stage === 'hearing';
  const roleAction = actions.stages[3].actions.statement.indexOf(roleIndex) >= 0;

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
        />
      </div>
      {stageAction ? (
        <ButtonContainer>
          <Button
            disabled={!roleAction}
            mode="strong"
            onClick={() => {
              openSidePanel();
            }}
            wide
            css={
              roleAction
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
