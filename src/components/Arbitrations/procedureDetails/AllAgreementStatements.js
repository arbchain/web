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

function AllAgreementStatements() {
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
              Initiated By
            </h2>
            <Text
              css={`
                ${textStyle('body2')};
              `}
            >
              0x0x0x0x
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
              Initiated Date
            </h2>
            <Text
              css={`
                ${textStyle('body2')};
              `}
            >
              Date
            </Text>
          </div>

          <div>
            <h1
              css={`
                color: ${theme.surfaceContentSecondary};
              `}
            >
              Selected Language{' '}
            </h1>
            <DropDown
              style={{
                flexBasis: '100%',
                borderColor: '#D9D9D9',
                background: '#fff',
              }}
              disabled={true}
              items={languages}
              selected={language}
              wide
              onChange={(index, items) => {
                setLanguage(index);
              }}
            />
          </div>

          <div>
            <h1
              css={`
                color: ${theme.surfaceContentSecondary};
              `}
            >
              Selected Arbitration Seat
            </h1>
            <DropDown
              wide
              disabled={true}
              style={{
                flexBasis: '100%',
                borderColor: '#D9D9D9',
                background: '#fff',
              }}
              items={arbitrationSeats}
              selected={seat}
              onChange={(index, items) => {
                setLanguage(index);
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default AllAgreementStatements;
