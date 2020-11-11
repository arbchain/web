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
  Accordion,
  DropDown,
} from '@aragon/ui';
import { useHistory } from 'react-router-dom';
import ProcedureStatementForm from './modals/ProcedureStatement';
import DisputeEvidences from './DisputeEvidences';
import DisputeTimeline from './DisputeTimeline';
import StatementForm from './modals/StatementForm';
import ArbitrationCardDispute from '../../assets/ArbitrationCardDispute.svg';
import {getAllStatements, getProcedureStatements} from '../../lib/contracts/SPC';
import { useAccount } from '../../wallet/Account';
import wallet from 'wallet-besu';
const networks = require('../../wallet/network');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

const languages = ['English', 'French', 'Spanish'];
const arbitrationSeats = ['London', 'lorem', 'lorem'];

const ArbitrationDetail = (props) => {
  const [statementModal, setStatementModal] = useState(false);

  const [language, setLanguage] = useState(0);
  const [seat, setSeat] = useState(0);
  const [loading, setLoading] = useState(false);
  const [procedureStatement, setProcedureStatement] = useState([]);
  const [statement, setStatement] = useState([]);

  const openStatement = () => setStatementModal(true);
  const history = useHistory();
  const theme = useTheme();
  const status = ['Open', 'Close'];
  const walletAccount = useAccount();
  const { procedureAddress, arbitration } = props.location;

  // Procedure statement modal

  const [ProcedureStatementModal, setProcedureStatementModal] = useState(false);

  // Procedure Statement form
  const openProcedureStatement = () => setProcedureStatementModal(true);

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
      } catch (err) {
        return false;
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function getStatement() {
      try {
        if (procedureAddress) {
          let result = await getAllStatements(
            NODES[0],
            procedureAddress.procedureContractAddress,
            procedureAddress.groupId,
            walletAccount.account
          );
          console.log("Statements:",result[0]);
          setStatement(result[0])

          result = await getProcedureStatements(
              NODES[0],
              procedureAddress.procedureContractAddress,
              procedureAddress.groupId,
              walletAccount.account
          );
          console.log("ProcedureStatement:",result[0]);
          setProcedureStatement(result[0])
        }
      } catch (err) {
        return false;
      }
    }
    getStatement()
  }, []);

  const StatementDetails = (
    <>
      <section
        css={`
          align-items: center;
          margin: 18px 0 18px 0;

          width: 100%;
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-column-gap: 8px;
            margin-bottom: 18px;
            width: 100%;
          `}
        >
          <div
            css={`
              margin-bottom: 18px;
            `}
          >
            <h2
              css={`
                ${textStyle('label2')};
                color: ${theme.surfaceContentSecondary};
                margin-bottom: ${2 * GU}px;
              `}
            >
              Initiated By
            </h2>
            <Text
              css={`
                ${textStyle('body2')};
              `}
            >
              0x0x0x0x
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
              Initiated Date
            </h2>
            <Text
              css={`
                ${textStyle('body2')};
              `}
            >
              Date
            </Text>
          </div>

          <div>
            <h1
              css={`
                color: ${theme.surfaceContentSecondary};
              `}
            >
              Selected Language{' '}
            </h1>
            <DropDown
              style={{
                flexBasis: '100%',
                borderColor: '#D9D9D9',
                background: '#fff',
              }}
              disabled={true}
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
            </h1>
            <DropDown
              wide
              disabled={true}
              style={{
                flexBasis: '100%',
                borderColor: '#D9D9D9',
                background: '#fff',
              }}
              items={arbitrationSeats}
              selected={seat}
              onChange={(index, items) => {
                setLanguage(index);
              }}
            />
          </div>
        </div>
        <div>
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
            Agree and Continue
          </Button>
        </div>
      </section>
    </>
  );

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
          procedureAddress={procedureAddress}
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
          procedureAddress={procedureAddress}
          account={walletAccount.account}
        />
      </div>
      <Bar style={{ marginTop: '12px' }}>
        <BackButton onClick={() => history.goBack()} />
      </Bar>

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
                      {arbitration[2]}
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
                    {arbitration[7]}
                    {/* <IdentityBadge
                      // connectedAccount={addressesEqual(creator, connectedAccount)}
                      // entity={respondent}
                      /> */}
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

              {
                statement.length>0 && statement.map((value => {
                  return(
                      <
                          Accordion
                          style={{}}
                          accordion
                          items={[['Statements', [StatementDetails]]]}
                      />
                  )
                }))
              }

              <Box heading='Arbitrator Nomination'>
                <>
                  <div
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
                  </div>
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

export default ArbitrationDetail;
