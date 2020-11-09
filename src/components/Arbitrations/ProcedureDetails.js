import React, { useState } from 'react';
import {
  BackButton,
  DropDown,
  IconEdit,
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
import ProcedureStatementForm from './modals/ProcedureStatement';
import DisputeEvidences from './DisputeEvidences';
import DisputeTimeline from './DisputeTimeline';
import ArbitrationCardDispute from '../../assets/ArbitrationCardDispute.svg';

const languages = ['English', 'French', 'Spanish'];
const arbitrationSeats = ['London', 'lorem', 'lorem'];

const ProcedureDetails = () => {
  let history = useHistory();
  const theme = useTheme();

  const [language, setLanguage] = useState(0);
  const [seat, setSeat] = useState(0);

  const [ProcedureStatementModal, setProcedureStatementModal] = useState(false);
  const openProcedureStatement = () => setProcedureStatementModal(true);

  return (
    <React.Fragment>
      <Bar style={{ marginTop: '12px' }}>
        <BackButton onClick={() => history.goBack()} />
      </Bar>

      <div
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
      </div>

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
                  <div
                    css={`
                      display: grid;
                      grid-template-columns: 1fr minmax(250px, auto);
                      margin-bottom: ${5 * GU}px;
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
                        ARBITRATION AGREEMENT
                      </h2>
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
                  </div>
                  <div
                    css={`
                      display: grid;
                      grid-template-columns: repeat(2, 1fr);
                      grid-column-gap: 8px;
                    `}
                  >
                    <div>
                      <h1
                        css={`
                          color: ${theme.surfaceContentSecondary};
                        `}
                      >
                        Selected Language{' '}
                        <span>
                          <IconEdit />
                        </span>
                      </h1>
                      <DropDown
                        style={{ flexBasis: '100%', borderColor: '#D9D9D9' }}
                        disabled
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
                        <span>
                          <IconEdit />
                        </span>
                      </h1>
                      <DropDown
                        wide
                        disabled={true}
                        style={{ flexBasis: '100%', borderColor: '#D9D9D9' }}
                        items={arbitrationSeats}
                        selected={seat}
                        onChange={(index, items) => {
                          setLanguage(index);
                        }}
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

                  <div>
                    <Button
                      mode='strong'
                      onClick={() => {
                        openProcedureStatement();
                        console.log('WORKSSSS');
                      }}
                      wide
                      css={`
                        background: ${theme.selected};
                      `}
                    >
                      + New LOREM---
                    </Button>
                  </div>
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
