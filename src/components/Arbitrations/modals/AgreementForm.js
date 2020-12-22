/* eslint-disable */

import {Result, Spin, message, Upload} from 'antd';
import React, { useState } from 'react';
import { DropDown, Modal, TextInput, useTheme, Button } from '@aragon/ui';
import '../../../css/result.css';
import {LoadingOutlined, UploadOutlined} from '@ant-design/icons';
import { createAgreement } from '../../../lib/contracts/DeployWorkflow';
import styled from 'styled-components';
import { authorizeUser } from '../../../lib/db/threadDB';
import {uploadDoc} from "../../../lib/file-storage";

const Web3 = require('web3');

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

const AgreementContainer = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  border: 4px;
  border-color: #d9d9d9;
  border-width: thin;
  border-style: solid;
  margin: 30px;
  padding: 30px;
  .inputGroups {
    margin-bottom: 28px !important;
    justify-content: center;
    .dropDown {
      border-color: #d9d9d9;
    }
  }
  .upload {
    width: 100%;
  }
  .submit-btn {
    background-color: #4d4cbb;
    color: #fff;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 8px;
  .inputGroups {
    margin-bottom: 28px !important;
    justify-content: center;
  }
`;

const antIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb' }} spin />
);

const languages = ['English', 'French', 'Spanish'];

export default function AgreementForm({
  agreementModal,
  setAgreementModal,
  account,
  node,
  counterParties,
  caller,
  dbClient,
  updateAgreementList,
  updateAddressList
}) {
  const theme = useTheme();

  const [disputeType, setDisputeType] = useState(0);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState(0);
  const [counterParty, setCounterParty] = useState(0);
  const [seat, setSeat] = useState('London');
  const [docHash, setDocHash] = useState(Web3.utils.keccak256('Sample Doc'));
  const [agreementSubmit, setAgreementSubmit] = useState(false);
  const [document, setDocument] = useState(null);

  // file upload
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    customRequest: data => {
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

  const closeAgreement = () => {
    setAgreementModal(false);
    setAgreementSubmit(false);
  };
  const {
    result,
    agreementAdditionStatus,
    setResult,
    create,
  } = createAgreement(node);

  const createAgain = () => {
    setAgreementSubmit(false);
  };

  const handleClick = async () => {
    setAgreementSubmit(true);
    const fileDetails = await uploadDoc(document, localStorage.getItem('wpassword'), 'AWS');
    console.log('UploadStatus:', fileDetails);

    console.log("Caller:",caller.address)
    console.log("counterParties:",counterParties[counterParty].address)
    const claimant = {
      partyAddress: caller.address,
      name: caller.name,
      signed: false
    }

    const respondent = {
      partyAddress: counterParties[counterParty].address,
      name: counterParties[counterParty].name,
      signed: false
    }

    const doc = {
      cipherKey: fileDetails.cipherKey,
      fileLocation: fileDetails.fileLocation,
      fileName: fileDetails.fileName
    }

    const res = await create(
      account,
      [
        2,
        title,
        seat,
        languages[language],
        'LCIA',
        claimant,
        respondent,
        disputeType,
        fileDetails.fileHash,
        JSON.stringify(doc)
      ],
      fileDetails,
      dbClient,
      caller,
      counterParties[counterParty]
    );

    
      // updateAgreementList({
      //   claimantName: caller.name,
      //     createdAt: new Date().toDateString(),
      //     disputeType: disputeType,
      //     documentName: fileDetails.fileName,
      //     language:  languages[language],
      //     law: "LCIA",
      //     respondentName: counterParties[counterParty].name,
      //     seat: seat,
      //     title: title,
      //     role: 0
      // });

      // updateAddressList({
      //   contractAddress: res.contractAddress,
      //   groupId: res.privacyGroupId,
      // });
   

    
  };

  return (
    <ModalWrapper
      width='45rem'
      visible={agreementModal}
      onClose={closeAgreement}
    >
      <Title>Create New Agreement</Title>

      {agreementSubmit ? (
        result ? (
          <Result
            status='success'
            title='Successfully created Arbitration Agreement!'
            subTitle={'Transaction ID: ' + result.transactionHash}
            extra={[
              <Button
                style={{
                  backgroundColor: theme.selected,
                  color: 'white',
                }}
                onClick={createAgain}
              >
                Create Again
              </Button>,
              <Button onClick={closeAgreement}>Done</Button>,
            ]}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '150px' }}>
            <Spin indicator={antIcon} />
            <span> Submitting agreement</span>
          </div>
        )
      ) : (
        <>
          <AgreementContainer>
            <div className='inputGroups '>
              <h3>Title</h3>
              <TextInput
                wide
                value={title}
                onChange={event => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <GridContainer>
              <div className='inputGroups '>
                <h3>Dispute Type</h3>
                <DropDown
                  className='dropDown'
                  wide
                  items={['Future', 'Existing']}
                  selected={disputeType}
                  onChange={(index, items) => {
                    console.log(index);
                    setDisputeType(index);
                    setAgreementModal(true);
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
                <h3>Arbitration Language</h3>
                <DropDown
                  wide
                  className='dropDown'
                  items={languages}
                  selected={language}
                  onChange={(index, items) => {
                    setLanguage(index);
                    setAgreementModal(true);
                  }}
                />
              </div>
              <div className='inputGroups '>
                <h3>Counter Party</h3>
                <DropDown
                  wide
                  className='dropDown'
                  items={counterParties.map((party) => {
                    //return party.address.slice(0, 15) + '...';
                    return party.name;
                  })}
                  selected={counterParty}
                  onChange={(index, items) => {
                    setCounterParty(index);
                    setAgreementModal(true);
                  }}
                />
              </div>
            </GridContainer>

            <div className="inputGroups ">
              <h3>Upload Documents </h3>
              <Upload className="upload" {...props}>
                <Button
                  className="upload"
                  wide
                  icon={<UploadOutlined style={{ color: '#212b36' }} />}
                  label="Click to Upload"
                />
              </Upload>
            </div>

            <Button
              wide
              label='SUBMIT'
              className='submit-btn'
              label='SUBMIT'
              onClick={handleClick}
            />
          </AgreementContainer>
        </>
      )}
    </ModalWrapper>
  );
}
