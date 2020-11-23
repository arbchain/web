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

function AllProcedureStatements() {
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
              // selected={language}
              wide
              // items={[language]}
              // placeholder={language}
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
              // items={[seat]}
              // selected={seat}
              // placeholder={seat}
            />
          </div>

          <div
            css={`
              margin: 18px 0 18px 0;
            `}
          >
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
              x0x0x0x0x0x0xx0
            </Text>
          </div>
        </div>
        <div>
          <Button
            mode='strong'
            onClick={() => {
              console.log('WORKSSSS');
            }}
            wide
            css={`
              background: ${theme.selected};
            `}
          >
            Agree and Continue
          </Button>
        </div>
      </section>
    </>
  );
}

export default AllProcedureStatements;
