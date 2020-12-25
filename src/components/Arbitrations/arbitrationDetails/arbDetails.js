import React, { useEffect, useState } from 'react';
import {
  Box,
  GU,
  Text,
  textStyle,
  useTheme,
  EmptyStateCard,
  IconWarning,
  IconUser,
  IconFile,
  Link,
} from '@aragon/ui';
import { Skeleton } from 'antd';
import AcceptResponse from '../modals/Forms/AcceptResponse';
import ArbitrationResponse from './arbitrationResponse';
import ArbitrationCardDispute from '../../../assets/ArbitrationCardDispute.svg';
import {
  getArbitrationDetails,
  getSignature,
  getSignatureStatus,
} from '../../../lib/contracts/SPC';
import Respond from './allDetailCards/Response';
import Statement from './allDetailCards/Statement';
import SectionWrapper, {
  Description,
  GridGroup,
  ProcedureDetails,
  Actions,
  Info,
  SubmittedResponse,
} from './styles';

import Button from '@aragon/ui/dist/Button';
import { downloadFile } from '../../../lib/file-storage';

function ArbDetails({
  groupId,
  contractAddress,
  NODE,
  account,
  caller,
  parties,
  role,
  loading,
  details,
  procedureStatement,
  responseDetail,
  fileDetails,
  signStatus,
  userSignStatus,
}) {
  const theme = useTheme();

  // const [loading, setLoading] = useState(true);
  // const [details, setDetails] = useState(null);
  const [openResponse, setOpenResponse] = useState(false);
  const [openClaim, setOpenClaim] = useState(false);
  // const [procedureStatement, setProcedureStatement] = useState('');
  // const [responseDetail, setResponseDetail] = useState([]);
  // const [fileDetails, setFileDetails] = useState(null);
  // const [signStatus, setSignStatus] = useState(false);
  // const [userSignStatus, setUserSignStatus] = useState(false);

  const status = ['Open', 'Close'];

  // handlers
  const openResponsePanel = () => setOpenResponse(true);

  const openCounterClaimPanel = () => setOpenClaim(true);

  const downloadDoc = async () => {
    const res = await downloadFile(
      procedureStatement.documentName,
      procedureStatement.documentLocation,
      procedureStatement.cipherKey
    );
  };

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
          <Box>
            <SectionWrapper>
              <AcceptResponse
                openResponse={openResponse}
                setOpenResponse={setOpenResponse}
                procedureDocHash={procedureStatement.documentHash}
                groupId={groupId}
                contractAddress={contractAddress}
                NODE={NODE}
                account={account}
              />
              <div className="title__container">
                <div className="title__container-titleGroup">
                  <img src={ArbitrationCardDispute} />

                  <Text className="title__heading">{details[0]}</Text>
                </div>
                <div className="status">
                  <h1>
                    <span default>{status[details[3]]}</span>
                  </h1>
                </div>
              </div>
              <Description>
                <h2>Description</h2>
                <Text className="description" style={{ fontSize: '16px' }}>
                  {details[1]}
                </Text>
              </Description>
              <GridGroup>
                <div className="claiment">
                  <h2>Claimant</h2>
                  <Text className="description">
                    <span>
                      <IconUser style={{ marginRight: '2px' }} />
                    </span>
                    {details[6].name}
                  </Text>
                </div>
                <div className="respondant">
                  <h2>Respondent</h2>

                  <Text className="description">
                    <span>
                      <IconUser style={{ marginRight: '2px' }} />
                    </span>
                    {details[7].name}
                  </Text>
                </div>
                <div className="agreement">
                  <h2>Arbitration Agreement</h2>
                  <Text className="description">
                    <span>
                      <IconFile style={{ marginRight: '2px' }} />
                    </span>{' '}
                    {details[8]}
                  </Text>
                </div>
              </GridGroup>

              <Statement
                currentStage={parseInt(details[4])}
                userRole={parseInt(role)}
                contractAddress={contractAddress}
                groupId={groupId}
                account={account}
                caller={caller}
                parties={parties}
              />

              <ProcedureDetails>
                <div className="title__container-titleGroup">
                  <h2 className="title__heading">Procedure Status</h2>
                </div>
                <div className="status">
                  <h1>
                    {/* conditional rendering for status */}
                    {!signStatus ? (
                      <span className="pro-status">Pending</span>
                    ) : (
                      <span className="pro-status accepted">Accepted</span>
                    )}
                  </h1>
                </div>
              </ProcedureDetails>
              <div className="procedure-status">
                <GridGroup>
                  <div className="claiment">
                    <h2>CREATED BY</h2>
                    <Text className="description mb-6">{procedureStatement.parties[0].name}</Text>
                  </div>
                  <div className="respondant">
                    <h2>selected language</h2>
                    <Text className="description mb-6">{procedureStatement.language}</Text>
                  </div>
                  <div className="agreement">
                    <h2>selected seat</h2>
                    <Text className="description mb-6">{procedureStatement.seat}</Text>
                  </div>
                  <div className="agreement ">
                    <h2>Signed</h2>
                    <Text className="description mb-6">
                      {userSignStatus.toString().toUpperCase()}
                    </Text>
                  </div>
                  <div className="agreement">
                    <h2>Attached Documents</h2>
                    <Text className="description mb-6">
                      <Link external onClick={downloadDoc}>
                        {' '}
                        {procedureStatement.documentName}{' '}
                      </Link>
                    </Text>
                  </div>
                </GridGroup>

                {/* Conditional rendering for respondant- show this if this is accepted */}
                <Info>
                  <IconWarning style={{ marginRight: '4px' }} />
                  <Text>You have accepted this xxx on DATE</Text>
                </Info>

                {/* conditional rendering for buttons */}

                {!userSignStatus ? (
                  <Actions>
                    <Button
                      className="btn success"
                      onClick={() => {
                        openResponsePanel();
                      }}
                    >
                      Accept
                    </Button>
                    <Button className="btn error">Reject</Button>
                  </Actions>
                ) : null}
              </div>

              {/* Response submitted by the user */}

              {responseDetail.length >= 1 ? (
                <ArbitrationResponse responseDetail={responseDetail} fileDetails={fileDetails} />
              ) : null}
            </SectionWrapper>
          </Box>
        </>
      ) : (
        <EmptyStateCard width="100%" text="No arbitrations details found." />
      )}
    </>
  );
}
export default ArbDetails;
