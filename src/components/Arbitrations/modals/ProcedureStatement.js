import { Result, Spin } from 'antd';
import React, { useState } from 'react';
import { Button, DropDown, Modal, TextInput, useTheme } from '@aragon/ui';
import '../../../css/result.css';
import { LoadingOutlined } from '@ant-design/icons';
import { createProcedureStatement } from '../../../lib/contracts/SPC';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { uploadDoc } from '../../../lib/file-storage';

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

const antIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb' }} spin />
);

const languages = ['English', 'French', 'Spanish'];
const arbitrationSeats = ['London', 'lorem', 'lorem'];

export default function ProcedureStatementForm({
  ProcedureStatementModal,
  setProcedureStatementModal,
  contractAddress,
  groupId,
  account,
  caller,
  parties,
}) {
  const theme = useTheme();
  const [party, setParty] = useState(0);
  const [seat, setSeat] = useState(0);
  const [language, setLanguage] = useState(0);
  const [documentHash, setDocumentHash] = useState('0x646f632068617368');
  const [documentIpfsHash, setDocumentIpfsHash] = useState('');
  const [document, setDocument] = useState(null);
  //   loader
  const [statementSubmit, setStatementSubmit] = useState(false);

  const { connected, procedureStatementCreation } = createProcedureStatement(
    NODES[0],
    contractAddress,
    groupId
  );

  const closeProcedureStatement = () => {
    setProcedureStatementModal(false);
  };

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    customRequest: (data) => {
      setDocument(data.file);
    },
    onChange(status) {
      if (status) {
        message.success(` file uploaded successfully.`);
      } else {
        message.error(`file upload failed.`);
      }
    },
  };

  const handleClick = async () => {
    setStatementSubmit(true);
    const uploadStatus = await uploadDoc(
      document,
      localStorage.getItem('wpassword'),
      'AWS'
    );
    console.log('UploadStatus:', uploadStatus);
    const partiesInvolved = [
      {
        partyAddress: caller.address,
        name: caller.name,
      },
      {
        partyAddress: parties[party].address,
        name: parties[party].name,
      },
    ];
    await procedureStatementCreation(
      partiesInvolved,
      arbitrationSeats[seat],
      languages[language],
      uploadStatus.fileLocation,
      uploadStatus.fileName,
      uploadStatus.fileHash,
      uploadStatus.cipherKey,
      account
    );
    console.log('submitted');
    setStatementSubmit(false);
  };

  const createAgain = () => {
    setStatementSubmit(false);
  };

  return (
    <ModalWrapper
      width='50rem'
      visible={ProcedureStatementModal}
      onClose={closeProcedureStatement}
    >
      <Title> Create an Procedure Statement</Title>

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
          {/* <div style={{ flexBasis: '100%' }}> Parties:</div>
          <TextInput
            style={{ flexBasis: '100%' }}
            value={parties}
            onChange={(event) => {
              setParties(event.target.value);
            }}
          />*/}
          <div style={{ flexBasis: '100%' }}>Select Party:</div>
          <div style={{ flexBasis: '100%' }}>
            <DropDown
              style={{ borderColor: '#D9D9D9', width: '100%' }}
              items={parties.map((value) => {
                return value.name;
              })}
              selected={party}
              onChange={(index, items) => {
                setParty(index);
                setProcedureStatementModal(true);
              }}
            />
          </div>
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
            selected={seat}
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

        {/*<div
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
        </div>*/}

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '20px',
            alignItems: 'center',
          }}
        >
          <div style={{ flexBasis: '100%' }}> Document Hash:</div>
          <Upload {...props}>
            <button icon={<UploadOutlined />}>Click to Upload</button>
          </Upload>
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
