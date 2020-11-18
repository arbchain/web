import React from 'react';

import { useTheme, Button, LoadingRing, DropDown } from '@aragon/ui';

function NominateArbitrator() {
  const theme = useTheme();
  return (
    <>
      <div
        className='nomination__container'
        css={`
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-column-gap: 8px;
          margin-bottom: 18px;
        `}
      >
        <div>
          <h1
            css={`
              color: ${theme.surfaceContentSecondary};
            `}
          >
            Select Arbitrator
          </h1>
          <DropDown
            placeholder='Select an Arbitrator'
            style={{
              flexBasis: '100%',
              borderColor: '#D9D9D9',
            }}
            disabled={false}
            items={['lorem', 'lorem']}
            wide
          />
        </div>

        <div
          css={`
            align-self: end;
          `}
        >
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
            Nominate
          </Button>
        </div>
      </div>
    </>
  );
}

export default NominateArbitrator;
