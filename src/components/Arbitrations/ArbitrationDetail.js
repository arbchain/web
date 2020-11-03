import React, { useState } from 'react';
// import { AgreementContext } from './Contexts';
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
import StatementForm from './modals/StatementForm';
import ArbitrationCardDispute from '../../assets/ArbitrationCardDispute.svg';

const ArbitrationDetail = props => {
  const [statementModal, setStatementModal] = useState(false);
  const openStatement = () => setStatementModal(true);
  const history = useHistory();
  const theme = useTheme();

  const status = ['Open', 'Close'];

  const { arbitration } = props.location;
  console.log();

  return (
    <React.Fragment>
      {/* statement  modal */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <StatementForm
          statementModal={statementModal}
          setStatementModal={setStatementModal}
          // account={walletAccount.account}
          // node={NODES[0]}
        />
      </div>
      <Bar style={{ marginTop: '12px' }}>
        <BackButton onClick={() => history.goBack()} />
      </Bar>

      <Split
        primary={
          <React.Fragment>
            <Box heading="Agreement Details">
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
                          {arbitration[0]}
                        </Text>
                      </div>
                    </div>
                    <div>
                      {/* <DisputeStatus dispute={dispute} /> */}
                      <h1>{status[arbitration[3]]}</h1>
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
                        {arbitration[1]}
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
                        {arbitration[6]}
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
                        {arbitration[2]}
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
                      {arbitration[7]}
                      {/* <IdentityBadge
                      // connectedAccount={addressesEqual(creator, connectedAccount)}
                      // entity={respondent}
                      /> */}
                    </div>
                  </div>
                  <Button
                    mode="strong"
                    onClick={() => {
                      openStatement();
                      console.log('WORKSSSS');
                    }}
                    wide
                    css={`
                      background: ${theme.selected};
                    `}
                  >
                    + NEW STATEMENT
                  </Button>
                </section>
              </Box>
            </Box>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Box heading="Dispute timeline" padding={0}>
              <DisputeTimeline />
            </Box>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default ArbitrationDetail;
