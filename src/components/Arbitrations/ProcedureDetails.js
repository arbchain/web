// -Offline testing page

import React, { useState } from 'react';
import {
  BackButton,
  DropDown,
  Bar,
  Box,
  Split,
  GU,
  Text,
  textStyle,
  IdentityBadge,
  useTheme,
  Button,
  Accordion,
  Tabs,
} from '@aragon/ui';

import { useHistory } from 'react-router-dom';
//import ProcedureStatementForm from './modals/ProcedureStatement';
import DisputeEvidences from './DisputeEvidences';
import DisputeTimeline from './DisputeTimeline';
import ArbitrationCardDispute from '../../assets/ArbitrationCardDispute.svg';

import AllProcedureStatements from './arbitrationDetails/allDetailCards/AllProcedureStatements';
import AllAgreementStatements from './arbitrationDetails/allDetailCards/AllProcedureStatements';
import NominateArbitrator from './arbitrationDetails/NominateArbitrator';

const ProcedureDetails = () => {
  let history = useHistory();
  const theme = useTheme();

  const [dropdown, setDropdown] = useState(0);

  const [tabs, selectTabs] = useState(0);

  const [ProcedureStatementModal, setProcedureStatementModal] = useState(false);
  const openProcedureStatement = () => setProcedureStatementModal(true);

  return (
    <React.Fragment>
      <Bar style={{ marginTop: '12px' }}>
        <BackButton onClick={() => history.goBack()} />
      </Bar>

      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <ProcedureStatementForm
          ProcedureStatementModal={ProcedureStatementModal}
          setProcedureStatementModal={setProcedureStatementModal}
        />
      </div> */}

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
                        Lorem ipsum dolor sit amet.
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2
                      css={`
                        ${textStyle('label2')};
                        color: ${theme.surfaceContentSecondary};
                        margin-bottom: ${2 * GU}px;
                      `}
                    >
                      ARBITRATION AGREEMENT
                    </h2>
                    <Text
                      css={`
                        display: inline-block;
                        ${textStyle('body2')};
                      `}
                    >
                      {`Apple Inc - Consenso Corp `}
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
                      Respondent
                    </h2>
                    <IdentityBadge
                    // connectedAccount={addressesEqual(creator, connectedAccount)}
                    //entity={respondent}
                    />
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

                  <div>
                    <Button
                      mode='strong'
                      onClick={() => {
                        openProcedureStatement();
                      }}
                      wide
                      css={`
                        background: ${theme.selected};
                      `}
                    >
                      + New Procedure Statement
                    </Button>
                  </div>
                </section>
              </Box>

              <div style={{ marginTop: '14px' }}>
                <Tabs
                  items={[
                    'All Statements',
                    'All Procedure Statements',
                    'All Proposals',
                  ]}
                  selected={tabs}
                  onChange={selectTabs}
                />
              </div>

              {tabs ? (
                <Accordion
                  style={{}}
                  accordion
                  items={[
                    ['Procedure Statements', [<AllProcedureStatements />]],
                  ]}
                />
              ) : (
                <Accordion
                  style={{}}
                  accordion
                  items={[
                    ['Agreement Statements', [<AllAgreementStatements />]],
                  ]}
                />
              )}

              <Box heading='Arbitrator Nomination'>
                <>
                  {/* <div
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
                        style={{ flexBasis: '100%', borderColor: '#D9D9D9' }}
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
                  </div> */}
                  <NominateArbitrator />
                </>
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
