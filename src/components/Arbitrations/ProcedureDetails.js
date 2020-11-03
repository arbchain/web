import React from 'react';
import {
  BackButton,
  Bar,
  Box,
  Split,
  GU,
  Text,
  textStyle,
  IdentityBadge,
  useTheme,
  Button,
} from '@aragon/ui';
import { useHistory } from 'react-router-dom';

import DisputeEvidences from './DisputeEvidences';
import DisputeTimeline from './DisputeTimeline';
import ArbitrationCardDispute from '../../assets/ArbitrationCardDispute.svg';

const ProcedureDetails = () => {
  let history = useHistory();
  const theme = useTheme();

  return (
    <React.Fragment>
      <Bar style={{ marginTop: '12px' }}>
        <BackButton onClick={() => history.goBack()} />
      </Bar>

      <Split
        primary={
          <React.Fragment>
            <Box heading='Procedure Details'>
              <Box>
                <section
                  css={`
                    display: grid;
                    grid-template-columns: auto;
                    grid-gap: ${2.5 * GU}px;
                    align-items: center;
                  `}
                >
                  <div
                    css={`
                      display: flex;
                      margin-bottom: ${3 * GU}px;
                      justify-content: space-between;
                    `}
                  >
                    <div
                      css={`
                        display: flex;
                        align-items: center;
                      `}
                    >
                      <div>
                        <img
                          css={`
                            width: ${5 * GU}px;
                          `}
                          src={ArbitrationCardDispute}
                        />
                      </div>
                      <div
                        css={`
                          margin-left: ${3 * GU}px;
                        `}
                      >
                        <Text
                          css={`
                            display: block;
                            margin-bottom: ${GU}px;
                            ${textStyle('title3')};
                          `}
                        >
                          Test Title
                        </Text>
                      </div>
                    </div>
                    <div>
                      {/* <DisputeStatus dispute={dispute} /> */}
                      <h1>Status</h1>
                    </div>
                  </div>

                  <div
                    css={`
                      display: grid;
                      grid-template-columns: 1fr minmax(250px, auto);
                      grid-gap: ${5 * GU}px;
                      margin-bottom: ${2 * GU}px;
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
                        Description
                      </h2>
                      <Text
                        css={`
                          ${textStyle('body2')};
                        `}
                      >
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Iste quod error ea esse inventore officia
                        obcaecati praesentium consequuntur id provident velit,
                        excepturi temporibus mollitia quaerat laudantium in
                        corporis rerum veniam!
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
                        Claimant
                      </h2>
                      <div
                        css={`
                          display: flex;
                          align-items: flex-start;
                        `}
                      >
                        <IdentityBadge
                        // connectedAccount={addressesEqual(creator, connectedAccount)}
                        //   entity={claimant}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    css={`
                      display: grid;
                      grid-template-columns: 1fr minmax(250px, auto);
                      margin-bottom: ${5 * GU}px;
                    `}
                  >
                    <div>
                      <span
                        css={`
                ${textStyle('label2')}
                color: ${theme.contentSecondary};
                font-weight: 200;
                display: block;
                margin-bottom: ${1.5 * GU}px;
              `}
                      >
                        ARBITRATION AGREEMENT
                      </span>
                      <Text
                        css={`
                          display: inline-block;
                          ${textStyle('body2')};
                        `}
                      >
                        {`Apple Inc - Consenso Corp agreement`}
                      </Text>
                    </div>

                    <div>
                      <span
                        css={`
                ${textStyle('label2')}
                color: ${theme.contentSecondary};
                font-weight: 200;
                display: block;
                margin-bottom: ${1.5 * GU}px;
              `}
                      >
                        Respondent
                      </span>
                      <IdentityBadge
                      // connectedAccount={addressesEqual(creator, connectedAccount)}
                      //entity={respondent}
                      />
                    </div>
                  </div>
                  <Button
                    mode='strong'
                    onClick={() => {}}
                    wide
                    css={`
                      background: ${theme.selected};
                    `}
                  >
                    PERFORM ACTION
                  </Button>
                </section>
              </Box>
            </Box>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Box heading='Dispute timeline' padding={0}>
              <DisputeTimeline />
            </Box>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default ProcedureDetails;
