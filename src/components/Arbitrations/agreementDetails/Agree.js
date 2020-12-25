import React, { useState } from 'react';
import { GU, Text, textStyle, Button, useTheme } from '@aragon/ui';
import { signAgreement } from '../../../lib/contracts/Agreement';

import { roles, stages, actions } from '../../../utils/actions/agreement';

function Agree({ disable, userRole, node, contractAddress, groupId, documentHash, account }) {
  const theme = useTheme();
  const role = roles[userRole];
  const stage = stages[1];
  const actionRole = actions[role];
  const stageAction = actionRole[stage] === 'respond';

  const { connect, documentSign } = signAgreement(node, contractAddress, groupId);

  const handleClick = async () => {
    console.log('Signing agreement:::');
    await documentSign(documentHash, account);
  };

  return (
    <>
      {stageAction ? (
        <Button
          disabled={!stageAction || disable}
          mode="strong"
          onClick={() => {
            handleClick();
          }}
          wide
          css={!stageAction || disable ? null : `background: ${theme.selected};`}
        >
          ACCEPT
        </Button>
      ) : null}
    </>
  );
}

export default Agree;
