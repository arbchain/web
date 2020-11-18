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
  Accordion,
  DropDown,
  Tabs,
} from '@aragon/ui';

import { useHistory } from 'react-router-dom';
import ProcedureStatementForm from './modals/ProcedureStatement';
import AllProcedureStatements from './procedureDetails/AllProcedureStatements';
import AllAgreementStatements from './procedureDetails/AllAgreementStatements';
import NominateArbitrator from './NominateArbitrator';
import DisputeEvidences from './DisputeEvidences';
import DisputeTimeline from './DisputeTimeline';
import StatementForm from './modals/StatementForm';
import ArbitrationCardDispute from '../../assets/ArbitrationCardDispute.svg';
import {
  getAllStatements,
  getArbitrationDetails,
  nominateArbitrator,
} from '../../lib/contracts/SPC';
import { useAccount } from '../../wallet/Account';
import wallet from 'wallet-besu';
const networks = require('../../wallet/network');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

const ArbitrationDetail = (props) => {
  const history = useHistory();
  const theme = useTheme();
  const [statementModal, setStatementModal] = useState(false);

  const [language, setLanguage] = useState(0);
  const [seat, setSeat] = useState(0);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [statement, setStatement] = useState(null);
  const openStatement = () => setStatementModal(true);

  const contractAddress = props.match.params.address;
  const groupId = decodeURIComponent(props.match.params.groupId);
  const status = ['Open', 'Close'];
  const walletAccount = useAccount();
  const [procedureStatement, setProcedureStatement] = useState([]);

  // Procedure statement modal
  const [ProcedureStatementModal, setProcedureStatementModal] = useState(false);

  // Procedure Statement form
  const openProcedureStatement = () => setProcedureStatementModal(true);

  const [tabs, selectTabs] = useState(0);

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
          console.log('DET', details);
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
          <LoadingRing mode='half-circle' />
        </div>
      ) : details ? (
        <>
          <Split
            primary={
              <React.Fragment>
                <Box heading='Agreement Details'>
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
                        mode='strong'
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
                          + NEW PROCEDURE STATEMENT
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

                  {details[9].length > 0 &&
                    details[9].map((value, index) => {
                      console.log('DETAILSSSS', value.documentIpfsHash);
                      return (
                        <Accordion
                          key={index}
                          accordion
                          items={[
                            [
                              'All Statements',
                              [
                                <AllAgreementStatements
                                  subject={value.subject}
                                  stakeHolder={value.stakeholder}
                                  statementType={value.statementType}
                                  documentIPFS={value.documentIpfsHash}
                                />,
                              ],
                            ],
                          ]}
                        />
                      );
                    })}

                  {details[8].length > 0 &&
                    details[8].map((value, index) => {
                      console.log('PRO Details:', value.seat);
                      return (
                        <Accordion
                          key={index}
                          accordion
                          items={[
                            [
                              'Procedure Statements',
                              [
                                <AllProcedureStatements
                                  documentIpfsHash={value.documentIpfsHash}
                                  language={value.language}
                                  seat={value.seat}
                                />,
                              ],
                            ],
                          ]}
                        />
                      );
                    })}

                  <Box heading='Arbitrator Nomination'>
                    <NominateArbitrator />
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
        </>
      ) : (
        <EmptyStateCard text='No arbitrations details found.' />
      )}
    </div>
  );
};

export default ArbitrationDetail;
