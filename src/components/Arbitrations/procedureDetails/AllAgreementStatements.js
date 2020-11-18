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

const languages = ['English', 'French', 'Spanish'];
const arbitrationSeats = ['London', 'lorem', 'lorem'];

function AllAgreementStatements({
  subject,
  stakeHolder,
  statementType,
  documentIPFS,
}) {
  const [language, setLanguage] = useState(0);
  const [seat, setSeat] = useState(0);
  const theme = useTheme();
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
            grid-template-columns: repeat(2, 1fr);
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
              {stakeHolder}
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
              {statementType}
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
              Document IPFS Hash
            </h2>
            <Text
              css={`
                ${textStyle('body2')};
              `}
            >
              {documentIPFS}
            </Text>
          </div>
        </div>
      </section>
    </>
  );
}

export default AllAgreementStatements;
