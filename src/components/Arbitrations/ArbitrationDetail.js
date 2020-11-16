/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
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
  LoadingRing,
  EmptyStateCard,
} from '@aragon/ui';
import { useHistory } from 'react-router-dom';

import DisputeEvidences from './DisputeEvidences';
import DisputeTimeline from './DisputeTimeline';
import StatementForm from './modals/StatementForm';
import ArbitrationCardDispute from '../../assets/ArbitrationCardDispute.svg';
import { getAllStatements, getArbitrationDetails } from '../../lib/contracts/SPC';
import { useAccount } from '../../wallet/Account';
import wallet from 'wallet-besu';
const networks = require('../../wallet/network');

const NODES = Object.keys(networks).map(node => {
  return `${networks[node].host}:${networks[node].port}`;
});

const ArbitrationDetail = props => {
  const [statementModal, setStatementModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const openStatement = () => setStatementModal(true);
  const history = useHistory();
  const theme = useTheme();

  const contractAddress = props.match.params.address;
  const groupId = props.match.params.groupId;
  const status = ['Open', 'Close'];
  const walletAccount = useAccount();
  console.log(props.match.params.groupId);

  useEffect(() => {
    async function load() {
      try {
        // Fetching the password locally. Need a secure way to do this for prod
        const account = await wallet.login(localStorage.getItem('wpassword'));

        // Update the account context by using a callback function
        walletAccount.changeAccount({
          privateKey: account[0],
          orionPublicKey: localStorage.getItem('orionKey'),
        });
        console.log(walletAccount);
      } catch (err) {
        return false;
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function getDetails() {
      try {
        if (walletAccount.account) {
          setLoading(true);
          const details = await getArbitrationDetails(
            NODES[0],
            contractAddress,
            groupId,
            walletAccount.account
          );
          console.log(details);
          setDetails(details);
          setLoading(false);
        }
      } catch (err) {
        return false;
      }
    }
    getDetails();
  }, [walletAccount.account]);

  return (
    <div>
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
          contractAddress={contractAddress}
          groupId={groupId}
          account={walletAccount.account}
        />
      </div>
      <Bar style={{ marginTop: '12px' }}>
        <BackButton onClick={() => history.goBack()} />
      </Bar>

      {loading ? (
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            height: '300px',
            alignItems: 'center',
          }}
        >
          <span> Fetching arbitrations </span> <br />
          <LoadingRing mode="half-circle" />
        </div>
      ) : details ? (
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
                          {details[2]}
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
                        {details[7]}
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
            <div>
              <Box heading="Dispute timeline" padding={0}>
                <DisputeTimeline />
              </Box>
            </div>
          }
        />
      ) : (
        <EmptyStateCard text="No arbitrations details found." />
      )}
    </div>
  );
};

export default ArbitrationDetail;
