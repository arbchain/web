import React, { useEffect, useState } from 'react';
import {
  Box,
  GU,
  Text,
  textStyle,
  useTheme,
  Button,
  LoadingRing,
  EmptyStateCard,
} from '@aragon/ui';
import { Skeleton } from 'antd';
import { useHistory } from 'react-router-dom';
import ProcedureStatementForm from '.././modals/ProcedureStatement';
import StatementForm from '../modals/StatementForm';
import ArbitrationCardDispute from '../../../assets/ArbitrationCardDispute.svg';

function ArbDetails({ groupId, contractAddress, details, caller, parties, account, loading }) {
  const history = useHistory();
  const theme = useTheme();
  const [statementModal, setStatementModal] = useState(false);

  const openStatement = () => setStatementModal(true);

  const status = ['Open', 'Close'];
  // Procedure statement modal
  const [ProcedureStatementModal, setProcedureStatementModal] = useState(false);
  // Procedure Statement form
  const openProcedureStatement = () => setProcedureStatementModal(true);

  return (
    <>
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
          contractAddress={contractAddress}
          groupId={groupId}
          account={account}
          caller={caller}
          parties={parties}
        />
      </div>

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
          contractAddress={contractAddress}
          groupId={groupId}
          account={account}
          caller={caller}
          parties={parties}
        />
      </div>

      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : details ? (
        <>
          <Box heading="Agreement Details">
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
                      {details[0]}
                    </Text>
                  </div>
                </div>
                <div>
                  {/* <DisputeStatus dispute={dispute} /> */}
                  <h1>{status[details[3]]}</h1>
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
                    {details[1]}
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
                    {details[6]}
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
                  {details[2]}
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

                <Text
                  css={`
                    display: inline-block;
                    ${textStyle('body2')};
                  `}
                >
                  {details[7]}
                </Text>
              </div>

              <Button
                mode="strong"
                onClick={() => {
                  openStatement();
                }}
                wide
                css={`
                  background: ${theme.selected};
                `}
              >
                + NEW STATEMENT
              </Button>

              <div>
                <Button
                  mode="strong"
                  onClick={() => {
                    openProcedureStatement();
                  }}
                  wide
                  css={`
                    background: ${theme.selected};
                  `}
                >
                  + NEW PROCEDURE STATEMENT
                </Button>
              </div>
            </section>
          </Box>
        </>
      ) : (
        <EmptyStateCard text="No arbitrations details found." />
      )}
    </>
  );
}

export default ArbDetails;
