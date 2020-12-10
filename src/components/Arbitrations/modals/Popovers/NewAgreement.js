import React, { useState } from 'react';
import { Main, Button, SidePanel, TextInput, useTheme } from '@aragon/ui';
import { Result, Spin } from 'antd';
import { Upload, message } from 'antd';
import styled from 'styled-components';

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
  return (
    <Panel title='Create New Agreement' opened={opened} onClose={closePannel}>
      <ProcedureForm>
        <GridContainer>
          <div className='inputGroups '>
            <h3>Dispuit Type</h3>
            <TextInput wide />
          </div>
          <div className='inputGroups '>
            <h3>Arbitration Seat</h3>
            <TextInput wide />
          </div>
        </GridContainer>

        <GridContainer>
          <div className='inputGroups '>
            <h3> Language</h3>
            <TextInput wide />
          </div>
          <div className='inputGroups '>
            <h3> Counter Party</h3>
            <TextInput wide />
          </div>
        </GridContainer>

        <div className='inputGroups '>
          <h3>Agreement Document </h3>
          <TextInput wide />
        </div>
        <Button
          wide
          label='SUBMIT'
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
