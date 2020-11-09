import { Result, Spin } from 'antd';
import React, { useState } from 'react';
import { Button, DropDown, Modal, TextInput, useTheme } from '@aragon/ui';
import '../../../css/result.css';
import { LoadingOutlined } from '@ant-design/icons';
import { deployProcedureContract } from '../../../lib/contracts/DeployWorkflow';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb' }} spin />
);

const languages = ['English', 'French', 'Spanish'];
const arbitrationSeats = ['London', 'lorem', 'lorem'];

export default function ProcedureStatementForm({
  ProcedureStatementModal,
  setProcedureStatementModal,
  account,
  node,
}) {
  const theme = useTheme();

  const [parties, setParties] = useState([]);
  const [seat, setSeat] = useState(0);
  const [language, setLanguage] = useState(0);
  const [stakeHolder, setStakeHolder] = useState(0);
  const [StatementType, setStatementType] = useState(0);
  const [subject, setSubject] = useState('');
  const [documentHash, setDocumentHash] = useState('');
  const [documentIpfsHash, setDocumentIpfsHash] = useState('');
  //   loader
  const [statementSubmit, setStatementSubmit] = useState(false);

  const closePeocedureStatement = () => {
    setProcedureStatementModal(false);
  };

  const handleClick = () => {
    statementSubmit(true);
    console.log('submitted');
  };

  const createAgain = () => {
    statementSubmit(false);
  };

  return (
    <Modal
      width='50rem'
      visible={ProcedureStatementModal}
      onClose={closePeocedureStatement}
    >
      <div
        style={{
          fontSize: '1.5rem',
          letterSpacing: '1px',
          fontWeight: '900',
          color: '#3D4857   ',
          textAlign: 'center',
        }}
      >
        <h2> Create an Procedure Statement</h2>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 10,
          borderColor: '#D9D9D9',
          borderWidth: 'thin',
          borderStyle: 'solid',
          margin: '30px',
          padding: '30px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '20px',
            alignItems: 'center',
          }}
        >
          <div style={{ flexBasis: '100%' }}> Parties:</div>
          <TextInput
            style={{ flexBasis: '100%' }}
            value={parties}
            onChange={(event) => {
              setParties(event.target.value);
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '20px',
            alignItems: 'center',
          }}
        >
          <div style={{ flexBasis: '100%' }}> Seat:</div>
          <DropDown
            style={{ flexBasis: '100%', borderColor: '#D9D9D9' }}
            items={['London', 'France', 'Lorem1']}
            selected={setSeat}
            onChange={(index, items) => {
              setSeat(index);
              setProcedureStatementModal(true);
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '20px',
            alignItems: 'center',
          }}
        >
          <div style={{ flexBasis: '100%' }}> Language:</div>
          <DropDown
            style={{ flexBasis: '100%', borderColor: '#D9D9D9' }}
            items={['English', 'French', 'Gernam']}
            selected={language}
            onChange={(index, items) => {
              setLanguage(index);
              setProcedureStatementModal(true);
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '20px',
            alignItems: 'center',
          }}
        >
          <div style={{ flexBasis: '100%' }}> Document IPFS Hash :</div>
          <TextInput
            style={{ flexBasis: '100%' }}
            value={documentIpfsHash}
            onChange={(event) => {
              setDocumentIpfsHash(event.target.value);
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '20px',
            alignItems: 'center',
          }}
        >
          <div style={{ flexBasis: '100%' }}> Document Hash:</div>
          <TextInput
            style={{ flexBasis: '100%' }}
            value={documentHash}
            onChange={(event) => {
              setDocumentHash(event.target.value);
            }}
          />
        </div>

        <Button
          label='SUBMIT'
          style={{
            backgroundColor: theme.selected,
            color: 'white',
          }}
          onClick={handleClick}
        />
      </div>
    </Modal>
  );
}
