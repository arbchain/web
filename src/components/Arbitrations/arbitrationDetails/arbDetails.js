import React, { useEffect, useState } from 'react';
import { Box, GU, Text, textStyle, useTheme, EmptyStateCard } from '@aragon/ui';
import { Skeleton } from 'antd';
import { useHistory } from 'react-router-dom';
import ArbitrationCardDispute from '../../../assets/ArbitrationCardDispute.svg';
import Respond from './allDetailCards/Response';
import Statement from './allDetailCards/Statement';

function ArbDetails({
  loading,
  details,
  groupId,
  contractAddress,
  NODE,
  account,
  caller,
  parties,
  role,
}) {
  const history = useHistory();
  const theme = useTheme();

  const status = ['Open', 'Close'];

  return (
    <>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : details ? (
        <>
          <Box heading="Arbitration Details">
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
                    {details[6].name}
                  </div>
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
                    Respondent
                  </h2>
                  <Text
                    css={`
                      ${textStyle('body2')};
                    `}
                  >
                    {details[7].name}
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
                    ARBITRATION AGREEMENT
                  </h2>
                  <div
                    css={`
                      display: flex;
                      align-items: flex-start;
                    `}
                  >
                    {details[8]}
                  </div>
                </div>
              </div>

              <Statement
                currentStage={parseInt(details[4])}
                userRole={parseInt(role)}
                contractAddress={contractAddress}
                groupId={groupId}
                account={account}
                caller={caller}
                parties={parties}
              />

              <div>
                <Respond currentStage={parseInt(details[4])} userRole={parseInt(role)} />
              </div>
            </section>
          </Box>
        </>
      ) : (
        <EmptyStateCard width="100%" text="No arbitrations details found." />
      )}
    </>
  );
}

export default ArbDetails;
