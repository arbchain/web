import React, { useState } from 'react';
import {
  DropDown,
  GU,
  Text,
  textStyle,
  IdentityBadge,
  useTheme,
  Button,
} from '@aragon/ui';
import {downloadFile} from "../../../../lib/file-storage";

const stakeHolders = ['Party', 'Expert', 'Court', 'Witness', 'Arbitrator'];
const statementTypes = ['Normal', 'Claim', 'Written'];

function AllAgreementStatements({subject, stakeHolder, statementType, documentLocation, documentName, cipherKey}) {
  const theme = useTheme();

  const handleClick = async ()=>{
    const res = await downloadFile(documentName, documentLocation, cipherKey)
  }

  return (
    <>
      <section
        css={`
          align-items: center;
          margin: 18px 0 18px 0;

          width: 100%;
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            grid-column-gap: 8px;
            margin-bottom: 18px;
            width: 100%;
          `}
        >
          <div
            css={`
              margin-bottom: 18px;
            `}
          >
            <h2
              css={`
                ${textStyle('label2')};
                color: ${theme.surfaceContentSecondary};
                margin-bottom: ${2 * GU}px;
              `}
            >
              Subject
            </h2>
            <Text
              css={`
                ${textStyle('body2')};
              `}
            >
              {subject}
            </Text>
          </div>
        </div>
        <div
          css={`
            display: grid;
            grid-template-columns: repeat(3, 2fr);
            grid-column-gap: 8px;
            margin-bottom: 18px;
            width: 100%;
          `}
        >
          <div>
            <h2
              css={`
                ${textStyle('label2')};
                color: ${theme.surfaceContentSecondary};
                margin-bottom: ${2 * GU}px;
              `}
            >
              Stake Holder
            </h2>
            <Text
              css={`
                ${textStyle('body2')};
              `}
            >
              {stakeHolders[stakeHolder]}
            </Text>
          </div>

          <div>
            <h2
              css={`
                ${textStyle('label2')};
                color: ${theme.surfaceContentSecondary};
                margin-bottom: ${2 * GU}px;
              `}
            >
              Statement Type
            </h2>
            <Text
              css={`
                ${textStyle('body2')};
              `}
            >
              {statementTypes[statementType]}
            </Text>
          </div>

          <div>
            <h2
              css={`
                ${textStyle('label2')};
                color: ${theme.surfaceContentSecondary};
                margin-bottom: ${2 * GU}px;
              `}
            >
              Document
            </h2>
            <Text
              css={`
                ${textStyle('body2')};
                cursor: pointer;
              `}
              onClick = {handleClick}
            >
              {documentName}
              <h2>Download btn</h2>
            </Text>
          </div>
        </div>
      </section>
    </>
  );
}

export default AllAgreementStatements;
