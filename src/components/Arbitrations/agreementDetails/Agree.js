import React, { useState } from 'react';
import {
  GU,
  Text,
  textStyle,
  Button,
  useTheme,
} from '@aragon/ui';
import {signDocuments} from "../../../lib/contracts/SPC";
import {signAgreement} from "../../../lib/contracts/Agreement";

const actions = require('../../../utils/actions/arbitration');

function Agree({stage, role, node, contractAddress, groupId, documentHash, account}) {
  const theme = useTheme();
  const roleIndex = actions.roles[role]
  const stageAction = stage === 'response'
  const roleAction = actions.stages[1].actions.respond.indexOf(roleIndex) >= 0

  const { connect, documentSign} = signAgreement(
    node,
    contractAddress,
    groupId
  )

  const handleClick = async ()=>{
    console.log("Signing agreement:::")
    await documentSign(
      documentHash,
      account,
    )
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
