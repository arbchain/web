import React, { useState } from 'react';
import {
  Main,
  Button,
  SidePanel,
  TextInput,
  useTheme,
  DropDown,
  LoadingRing,
  IconUpload,
  ToastHub,
  Toast,
} from '@aragon/ui';
import { Upload, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { createStatement, signDocuments } from '../../../../lib/contracts/SPC';
import styled from 'styled-components';

import { uploadDoc } from '../../../../lib/file-storage';

const networks = require('../../../../wallet/network');

const StatementContainer = styled.div`
  margin-top: 18px;

  .inputGroups {
    margin-left: 0.5rem;
    margin-bottom: 22px;
    justify-content: center;
  }
  .upload {
    width: 100%;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  .DropDown {
    border-color: #d9d9d9;
  }
`;

const Panel = styled(SidePanel)`
  z-index: 50;
  width: 50%;
`;

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

const antIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb' }} spin />
);

function StatementForm({
  opened,
  setOpened,
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

  const props = {
    name: 'file',

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

  const closePannel = () => {
    setOpened(false);
  };
  return (
    <>
      <Panel title='Create an Statement' opened={opened} onClose={closePannel}>
        <StatementContainer>
          <GridContainer>
            <div className='inputGroups '>
              <h3>Select Party</h3>
              <DropDown
                className='DropDown'
                wide
                items={parties.map((value) => {
                  return value.name;
                })}
                selected={party}
                onChange={(index, items) => {
                  setParty(index);
                }}
              />
            </div>
            <div className='inputGroups '>
              <h3>Stake Holder</h3>
              <DropDown
                className='DropDown'
                wide
                items={['Party', 'Expert', 'court', 'Witness', 'Arbitrator']}
                selected={stakeHolder}
                onChange={(index, items) => {
                  setStakeHolder(index);
                }}
              />
            </div>
          </GridContainer>
          <div className='inputGroups '>
            <h3>Subject</h3>
            <TextInput
              multiline
              wide
              value={subject}
              onChange={(event) => {
                setSubject(event.target.value);
              }}
            />
          </div>

          <GridContainer>
            <div className='inputGroups '>
              <h3>Statement Type</h3>
              <DropDown
                className='DropDown'
                wide
                items={['Normal', 'Claim', 'Written']}
                selected={statementType}
                onChange={(index, items) => {
                  setStatementType(index);
                }}
              />
            </div>
            <div className='inputGroups'>
              <h3>Upload Document</h3>
              <Upload {...props} className='upload'>
                <Button
                  icon={<IconUpload />}
                  label='Click to Upload'
                  className='upload'
                />
              </Upload>
            </div>
          </GridContainer>
          {statementSubmitting == false ? (
            <>
              <Button
                label='SUBMIT'
                wide
                style={{
                  backgroundColor: theme.selected,
                  color: 'white',
                }}
                onClick={handleClick}
              />
            </>
          ) : (
            <>
              <Button
                label={
                  statementSubmitting == true ? (
                    <>
                      <LoadingRing />
                      SUBMITTING
                    </>
                  ) : (
                    'SUBMITTED'
                  )
                }
                wide
                style={{
                  backgroundColor: theme.selected,
                  color: 'white',
                }}
                onClick={handleClick}
              />{' '}
            </>
          )}
        </StatementContainer>
      </Panel>
    </>
  );
}

export default StatementForm;
