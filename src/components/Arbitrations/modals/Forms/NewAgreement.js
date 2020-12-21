import React, { useState } from 'react';
import {
  Main,
  Button,
  SidePanel,
  TextInput,
  useTheme,
  DropDown,
} from '@aragon/ui';

import { Upload, message, Result, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { createAgreement } from '../../../../lib/contracts/DeployWorkflow';
import { authorizeUser } from '../../../../lib/db/threadDB';

const ProcedureForm = styled.div`
  margin-top: 18px;

  .inputGroups {
    margin-left: 0.5rem;
    margin-bottom: 22px;
    justify-content: center;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Panel = styled(SidePanel)`
  z-index: 50;
  width: 50%;
`;

const Web3 = require('web3');
const antIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb' }} spin />
);

const languages = ['English', 'French', 'Spanish'];

function NewAgreement({
  opened,
  setOpened,
  account,
  node,
  counterParties,
  caller,
}) {
  const [disputeType, setDisputeType] = useState(0);
  const [language, setLanguage] = useState(0);
  const [counterParty, setCounterParty] = useState(0);
  const [seat, setSeat] = useState('London');
  const [docHash, setDocHash] = useState(Web3.utils.keccak256('Sample Doc'));
  const [agreementSubmit, setAgreementSubmit] = useState(false);

  const theme = useTheme();
  const closePannel = () => {
    setOpened(false);
  };

  const {
    result,
    agreementAdditionStatus,
    setResult,
    create,
  } = createAgreement(node);

  console.log('Agreement Addition Status', agreementAdditionStatus);
  console.log(' Agreement Contract', result);

  const createAgain = () => {
    setAgreementSubmit(false);
    setResult(false);
  };

  const handleClick = async () => {
    setAgreementSubmit(true);
    const dbClient = await authorizeUser(localStorage.getItem('wpassword'));
    create(
      account,
      [
        2,
        seat,
        languages[language],
        'LCIA',
        'Consenso Labs',
        counterParties[counterParty].address,
        'Apple Inc',
        disputeType + 1,
        docHash,
      ],
      dbClient,
      caller,
      counterParties[counterParty]
    );
    if (result !== false && resultProcedureContract) {
      agreementAddition(result.contractAddress, result.privacyGroupId, account);
    }
  };

  return (
    <Panel title='Create New Agreement' opened={opened} onClose={closePannel}>
      <ProcedureForm>
        <GridContainer>
          <div className='inputGroups '>
            <h3>Dispuit Type</h3>
            <DropDown
              items={['Existing', 'Future']}
              selected={disputeType}
              onChange={(index, items) => {
                setDisputeType(index);
              }}
            />
          </div>
          <div className='inputGroups '>
            <h3>Arbitration Seat</h3>
            <TextInput
              wide
              value={seat}
              onChange={(event) => {
                setSeat(event.target.value);
              }}
            />
          </div>
        </GridContainer>

        <GridContainer>
          <div className='inputGroups '>
            <h3> Language</h3>
            <DropDown
              style={{ flexBasis: '100%', borderColor: '#D9D9D9' }}
              items={languages}
              selected={language}
              onChange={(index, items) => {
                setLanguage(index);
              }}
            />
          </div>
          <div className='inputGroups '>
            <h3> Counter Party</h3>
            <DropDown
              items={counterParties.map((party) => {
                //return party.address.slice(0, 15) + '...';
                return party.name;
              })}
              selected={counterParty}
              onChange={(index, items) => {
                setCounterParty(index);
              }}
            />
          </div>
        </GridContainer>

        <div className='inputGroups '>
          <h3>Agreement Document </h3>
          <TextInput
            wide
            value={docHash}
            onChange={(event) => {
              setDocHash(event.target.value);
            }}
          />
        </div>
        <Button
          wide
          label='SUBMIT'
          onClick={handleClick}
          style={{
            backgroundColor: theme.selected,
            color: 'white',
          }}
        />
      </ProcedureForm>
    </Panel>
  );
}

export default NewAgreement;
