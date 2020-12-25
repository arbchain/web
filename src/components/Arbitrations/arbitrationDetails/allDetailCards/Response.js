import React, { useState } from 'react';
import { GU, Text, textStyle, Button, useTheme } from '@aragon/ui';

import { roles, stages, actions } from '../../../../utils/actions/arbitration';

function Response({ currentStage, userRole }) {
  const theme = useTheme();
  const role = roles[userRole];
  const stage = stages[currentStage];
  const actionRole = actions[role];
  const stageAction = actionRole[stage] === 'respond';
  const handleClick = async () => {};

  return (
    <>
      {stageAction ? (
        <Button
          disabled={!stageAction}
          mode="strong"
          onClick={() => {
            handleClick();
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
          RESPOND
        </Button>
      ) : null}
    </>
  );
}

export default Response;
