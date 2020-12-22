import React, { useState } from 'react';
import { GU, Text, textStyle, Button, useTheme } from '@aragon/ui';
import StatementForm from '../../modals/Forms/StatementForm';

const actions = require('../../../../utils/actions/arbitration');

function Statement({
  stage,
  role,
  contractAddress,
  groupId,
  account,
  caller,
  parties,
}) {
  const theme = useTheme();
  const roleIndex = actions.roles[role];
  const stageAction = stage === 'hearing';
  const roleAction =
    actions.stages[3].actions.statement.indexOf(roleIndex) >= 0;

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
          disabled={!roleAction}
          mode='strong'
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
          + NEW STATEMENT
        </Button>
      ) : null}
    </>
  );
}

export default Statement;
