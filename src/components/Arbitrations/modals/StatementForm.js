import { Result, Spin } from 'antd';
import React, { useState } from 'react';
import {
  Button,
  DropDown,
  IconUpload,
  LoadingRing,
  Modal,
  TextInput,
  useTheme,
} from '@aragon/ui';
import '../../../css/result.css';
import { LoadingOutlined } from '@ant-design/icons';
import { createStatement, signDocuments } from '../../../lib/contracts/SPC';
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

export default function StatementForm({
  statementModal,
  setStatementModal,
  contractAddress,
  groupId,
  account,
  caller,
  parties,
}) {
  const theme = useTheme();
  const [network, setNetwork] = useState(0);
  const [party, setParty] = useState(0);
  const [stakeHolder, setStakeHolder] = useState(0);
  const [statementType, setStatementType] = useState(0);
  const [subject, setSubject] = useState('');
  const [documentHash, setDocumentHash] = useState('0x646f632068617368');
  const [documentIpfsHash, setDocumentIpfsHash] = useState('');
  const [statementSubmitting, setStatementSubmitting] = useState(false);
  const [document, setDocument] = useState(null);

  // file upload
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

  const { connected, statementCreation } = createStatement(
    NODES[0],
    contractAddress,
    groupId
  );

  const closeStatement = () => {
    setStatementModal(false);
    setStatementModal(false);
  };

  const { connect, documentSign } = signDocuments(
    NODES[0],
    contractAddress,
    groupId
  );

  const handleClick = async () => {
    setStatementSubmitting(true);
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

    await statementCreation(
      partiesInvolved,
      stakeHolder,
      statementType,
      subject,
      uploadStatus.fileHash,
      uploadStatus.cipherKey,
      uploadStatus.fileLocation,
      uploadStatus.fileName,
      account
    );

    await documentSign(uploadStatus.fileHash, account);

    console.log('submitted');
    setStatementSubmitting(false);
  };

  return (
    <ModalWrapper
      width='50rem'
      visible={statementModal}
      onClose={closeStatement}
    >
      <Title> Create an Statement </Title>

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
                setStatementModal(true);
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
          <div style={{ flexBasis: '100%' }}> Upload Document:</div>
          <div style={{ flexBasis: '100%' }}>
            <Upload style={{ flexBasis: '100%' }} {...props}>
              <Button icon={<IconUpload />} label='Click to Upload' />
            </Upload>
          </div>
        </div>

        <Button
          label='SUBMIT'
          disabled={statementSubmitting}
          children={statementSubmitting ? <LoadingRing /> : null}
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
