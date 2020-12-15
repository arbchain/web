import React, { useState } from 'react';
import {
  GU,
  Text,
  textStyle,
  Button,
  useTheme,
} from '@aragon/ui';

const actions = require('../../../utils/actions/arbitration');

function Agree({stage, role}) {
  const theme = useTheme();
  const roleIndex = actions.roles[role]
  const stageAction = stage === 'response'
  const roleAction = actions.stages[1].actions.respond.indexOf(roleIndex) >= 0

  const handleClick = async ()=>{
    
  }

  return (
    <>
      {
      stage == 'response' ? <Button
                disabled = { !roleAction }
                mode='strong'
                onClick={() => {
                    handleClick();
                }}
                wide
                css={roleAction ? `
                  background: ${theme.selected};
                ` : null}
              >
                ACCEPT
              </Button> : null
}
    </>
  );
}

export default Agree;
