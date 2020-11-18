import { Result, Spin } from 'antd';
import React, { useState } from 'react';
import { Button, DropDown, Modal, TextInput, useTheme } from '@aragon/ui';
import '../../../css/result.css';
import { LoadingOutlined } from '@ant-design/icons';
import { createStatement } from '../../../lib/contracts/SPC';
import styled from 'styled-components';

// styledcomponent -css

const Title = styled.div`
  font-size: 1.5rem;
  letter-spacing: 1px;
  font-weight: 500;

  color: #3d4857;
  text-align: center;
`;

const ModalWrapper = styled(Modal)`
  z-index: 50;
`;

const networks = require('../../../wallet/network.js');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

const stakeHolders = ['Party', 'Expert', 'court', 'Witness', 'Arbitrator'];

const antIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb' }} spin />
);

export default function StatementForm({
  statementModal,
  setStatementModal,
  contractAddress,
  groupId,
  account,
}) {
  const theme = useTheme();
  const [network, setNetwork] = useState(0);
  const [parties, setParties] = useState('');
  const [stakeHolder, setStakeHolder] = useState(0);
  const [statementType, setStatementType] = useState(0);
  const [subject, setSubject] = useState('');
  const [documentHash, setDocumentHash] = useState('0x646f632068617368');
  const [documentIpfsHash, setDocumentIpfsHash] = useState('');
  const [statementSubmit, setStatementSubmit] = useState(false);

  const { connected, statementCreation } = createStatement(
    NODES[0],
    contractAddress,
    groupId
  );

  // const [ proceduresLoading, procedureAddress ] = getProcedureAddress(NODES[0], walletAccount.account);

  const closeStatement = () => {
    setStatementModal(false);
    setStatementModal(false);
  };

  const handleClick = async () => {
    setStatementSubmit(true);
    const partiesInvolved = [
      ['0xf17f52151EbEF6C7334FAD080c5704D77216b732', parties],
    ];
    await statementCreation(
      partiesInvolved,
      stakeHolder,
      statementType,
      subject,
      documentHash,
      documentIpfsHash,
      account
    );
    console.log('submitted');
    setStatementSubmit(false);
  };

  return (
    <ModalWrapper
      width='50rem'
      visible={statementModal}
      onClose={closeStatement}
    >
      <Title> Create an Statement Agreement</Title>

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
            items={stakeHolders}
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
            selected={statementType}
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
    </ModalWrapper>
  );
}
