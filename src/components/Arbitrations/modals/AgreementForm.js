/* eslint-disable */

import { Result, Spin, message } from 'antd';
import React, { useState } from 'react';
import { DropDown, Modal, TextInput, useTheme, Button } from '@aragon/ui';
import '../../../css/result.css';
import { LoadingOutlined } from '@ant-design/icons';
import { createAgreement } from '../../../lib/contracts/DeployWorkflow';
import styled from 'styled-components';
import { authorizeUser } from '../../../lib/db/threadDB';

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

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function AgreementForm({
  agreementModal,
  setAgreementModal,
  account,
  node,
  counterParties,
  caller,
  updateAgreementList,
  updateAddressList,
  updateAgreementData
}) {
  const theme = useTheme();

  const [disputeType, setDisputeType] = useState(0);
  const [language, setLanguage] = useState(0);
  const [counterParty, setCounterParty] = useState(0);
  const [seat, setSeat] = useState('London');
  const [docHash, setDocHash] = useState(Web3.utils.keccak256('Sample Doc'));
  const [agreementSubmit, setAgreementSubmit] = useState(false);

  const closeAgreement = () => {
    setAgreementModal(false);
    setAgreementSubmit(false);
    setResult(false);
  };
  const {
    result,
    agreementAdditionStatus,
    setResult,
    create,
  } = createAgreement(node);

  const createAgain = () => {
    setAgreementSubmit(false);
    setResult(false);
  };

  const handleClick = async () => {
    setAgreementSubmit(true);
    const dbClient = await authorizeUser(localStorage.getItem('wpassword'));
    const res = await create(
      account,
      [
        2,
        seat,
        languages[language],
        'LCIA',
        'Consenso Labs',
        counterParties[counterParty].address,
        'Apple Inc',
        disputeType,
        docHash,
      ],
      dbClient,
      caller,
      counterParties[counterParty]
    );

    // updateAgreementData({
    //   claimantName: caller.name,
    //   createdAt: new Date().toDateString(),
    //   disputeType: disputeType,
    //   documentName: "DEMO DOC",
    //   language:  languages[language],
    //   law: "LCIA",
    //   respondentName: counterParties[counterParty].name,
    //   seat: seat
    // }, {contractAddress: res.contractAddress,
    //   groupId: res.privacyGroupId,})
    
    updateAgreementList({
      claimantName: caller.name,
      createdAt: new Date().toDateString(),
      disputeType: disputeType,
      documentName: "DEMO DOC",
      language:  languages[language],
      law: "LCIA",
      respondentName: counterParties[counterParty].name,
      seat: seat
    });
    
    if(res){
      updateAddressList({
        contractAddress: res.contractAddress,
        groupId: res.privacyGroupId,
      });
    }
  

  
   
  };

  return (
    <ModalWrapper
      width='40rem'
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

            <div className='inputGroups '>
              <h3>Agreement Document</h3>
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
