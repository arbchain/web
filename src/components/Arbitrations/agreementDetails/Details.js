import React, { useEffect, useState } from 'react';
import {
  Box,
  GU,
  Tag,
  Text,
  textStyle,
  useTheme,
  Button,
  LoadingRing,
  EmptyStateCard,
  Link,
} from '@aragon/ui';
import { Skeleton } from 'antd';
import { useHistory } from 'react-router-dom';
import ArbitrationCardDispute from '../../../assets/ArbitrationCardDispute.svg';
import { fetchAgreement } from '../../../lib/contracts/Agreement';
import { downloadFile } from '../../../lib/file-storage';
import Agree from './Agree';
import { getSignature, getSignatureStatus } from '../../../lib/contracts/SPC';

function Details({ groupId, contractAddress, NODE, account, caller, parties }) {
  const history = useHistory();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [cipherKey, setCipherKey] = useState('');
  const [docLocation, setDocLocation] = useState('');
  const [documentHash, setDocumentHash] = useState('');
  const [docName, setDocName] = useState('');
  const [signStatus, setSignStatus] = useState(false);
  const [signStatusLoading, setSignStatusLoading] = useState(false);
  const [userSignStatus, setUserSignStatus] = useState(false);

  const status = ['Open', 'Close'];

  useEffect(() => {
    async function getDetails() {
      try {
        if (Object.keys(account).length) {
          setLoading(true);
          const details = await fetchAgreement(NODE, contractAddress, groupId, account);
          // There is an addition call being made that replaces the details. A quick fix
          if (details) {
            setSignStatusLoading(true);
            setDetails(details);
            const documentInfo = JSON.parse(details[7]);
            console.log(documentInfo);
            setCipherKey(documentInfo.cipherKey);
            setDocLocation(documentInfo.fileLocation);
            setDocName(documentInfo.fileName);

            const res = await getSignature(NODE, contractAddress, groupId, account, details[5]);
            const { signStatus, userSignStatus } = await getSignatureStatus(res[0], account);
            setSignStatus(signStatus);
            setUserSignStatus(userSignStatus);
            setSignStatusLoading(false);
            setDocumentHash(details[5]);
          }
          setLoading(false);
        }
      } catch (err) {
        return false;
      }
    }
    getDetails();
  }, [account]);

  const handleClick = async () => {
    const res = await downloadFile(docName, docLocation, cipherKey);
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
                        ${textStyle('label2')};
                      `}
                    >
                      {details[6]}
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
                    Seat
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
                    Language
                  </h2>
                  <div
                    css={`
                      display: flex;
                      align-items: flex-start;
                    `}
                  >
                    {details[2]}
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
                    Governing Law
                  </h2>
                  <Text
                    css={`
                      display: inline-block;
                      ${textStyle('body2')};
                    `}
                  >
                    {details[3]}
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
                    Dispute Type
                  </h2>

                  <Text
                    css={`
                      display: inline-block;
                      ${textStyle('body2')};
                    `}
                  >
                    {['Future', 'Existing'][details[4]]}
                  </Text>
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
                    Document
                  </h2>
                  <Link external onClick={handleClick}>
                    {' '}
                    {docName}{' '}
                  </Link>
                </div>

                <div>
                  <h2
                    css={`
                      ${textStyle('label2')};
                      color: ${theme.surfaceContentSecondary};
                      margin-bottom: ${2 * GU}px;
                    `}
                  >
                    Agreement Sign Status
                  </h2>
                  <Text
                    css={`
                      display: inline-block;
                      ${textStyle('body2')};
                    `}
                  >
                    {signStatus ? (
                      <Tag mode="new">SIGNED</Tag>
                    ) : (
                      <Tag mode="new" color="#ff4d4f" background="#f2cfd0">
                        PENDING
                      </Tag>
                    )}
                  </Text>
                </div>
              </div>
              <Agree
                disable={userSignStatus || signStatusLoading}
                stage="response"
                role="respondant"
                account={account}
                contractAddress={contractAddress}
                groupId={groupId}
                documentHash={documentHash}
                node={NODE}
              />
            </section>
          </Box>
        </>
      ) : (
        <EmptyStateCard width="100%" text="No agreement details found." />
      )}
    </>
  );
}

export default Details;
