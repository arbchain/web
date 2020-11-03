import { Result, Spin } from 'antd';
import React, { useState } from 'react';
import { Button, DropDown, Modal, TextInput, useTheme } from '@aragon/ui';
import '../../../css/result.css';
import { LoadingOutlined } from '@ant-design/icons';
import { deployProcedureContract } from '../../../lib/contracts/DeployWorkflow';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb' }} spin />
);

export default function StatementForm({
  statementModal,
  setStatementModal,
  account,
  node,
}) {
  const theme = useTheme();

  const [parties, setParties] = useState('');
  const [stakeHolder, setStakeHolder] = useState(0);
  const [StatementType, setStatementType] = useState(0);
  const [subject, setSubject] = useState('');
  const [documentHash, setDocumentHash] = useState('');
  const [documentIpfsHash, setDocumentIpfsHash] = useState('');
  const [statementSubmit, setStatementSubmit] = useState(false);

  const closeStatement = () => {
    setStatementModal(false);
    setStatementModal(false);
  };

  const handleClick = () => {
    statementSubmit(true);
    console.log('submitted');
  };

  const createAgain = () => {
    statementSubmit(false);
  };

  return (
    <Modal width='50rem' visible={statementModal} onClose={closeStatement}>
      <div
        style={{
          fontSize: '1.5rem',
          letterSpacing: '1px',
          fontWeight: '900',
          color: '#3D4857   ',
          textAlign: 'center',
        }}
      >
        <h2> Create an Statement Agreement</h2>
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
          <div style={{ flexBasis: '100%' }}> Stake Holders:</div>
          <DropDown
            style={{ flexBasis: '100%', borderColor: '#D9D9D9' }}
            items={['Party', 'Expert', 'court', 'Witness', 'Arbitrator']}
            selected={stakeHolder}
            onChange={(index, items) => {
              setStakeHolder(index);
              setStatementModal(true);
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
          <div style={{ flexBasis: '100%' }}> Statement Type:</div>
          <DropDown
            style={{ flexBasis: '100%', borderColor: '#D9D9D9' }}
            items={['Normal', 'Claim', 'Written']}
            selected={StatementType}
            onChange={(index, items) => {
              setStatementType(index);
              setStatementModal(true);
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
          <div style={{ flexBasis: '100%' }}> Subject :</div>
          <TextInput
            style={{ flexBasis: '100%' }}
            value={subject}
            onChange={(event) => {
              setSubject(event.target.value);
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

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '20px',
            alignItems: 'center',
          }}
        >
          <div style={{ flexBasis: '100%' }}> Document IPFS Hash:</div>
          <TextInput
            style={{ flexBasis: '100%' }}
            value={documentIpfsHash}
            onChange={(event) => {
              setDocumentIpfsHash(event.target.value);
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
