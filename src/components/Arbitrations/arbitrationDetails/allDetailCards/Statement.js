import React, { useState } from 'react';
import { GU, Text, textStyle, Button, useTheme } from '@aragon/ui';
import StatementForm from '../../modals/Forms/StatementForm';

import { roles, stages, actions } from '../../../../utils/actions/arbitration';

function Statement({ currentStage, userRole, contractAddress, groupId, account, caller, parties }) {
  const theme = useTheme();
  const role = roles[userRole];
  const stage = stages[currentStage];
  const actionRole = actions[role];
  const stageAction = actionRole[stage] === 'statement';
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
        <StatementForm
          opened={opened}
          setOpened={setOpened}
          contractAddress={contractAddress}
          groupId={groupId}
          account={account}
          caller={caller}
          parties={parties}
        />
      </div>
      {stageAction ? (
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
          + NEW STATEMENT
        </Button>
      ) : null}
    </>
  );
}

export default Statement;
