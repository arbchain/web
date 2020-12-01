/* eslint-disable */

import { Result, Spin } from 'antd';
import React, { useState } from 'react';
import { Button, DropDown, Modal, TextInput, useTheme } from '@aragon/ui';

import '../../../css/result.css';
import { LoadingOutlined } from '@ant-design/icons';
import { createAgreement } from '../../../lib/contracts/DeployWorkflow';
import { addAgreementContract } from '../../../lib/contracts/MasterContract';
import styled from 'styled-components';
import {authorizeUser} from "../../../lib/db/threadDB";

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

const Web3 = require('web3');
const antIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb' }} spin />
);

/*const counterParties = [
  '0x958543756A4c7AC6fB361f0efBfeCD98E4D297Db',
  '0xd5B5Ff46dEB4baA8a096DD0267C3b81Bda65e943',
];*/
const languages = ['English', 'French', 'Spanish'];

export default function AgreementForm({
  agreementModal,
  setAgreementModal,
  account,
  node,
  counterParties,
  caller
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

  console.log('Agreement Addition Status', agreementAdditionStatus);
  console.log(' Agreement Contract', result);

  const createAgain = () => {
    setAgreementSubmit(false);
    setResult(false);
  };

  const handleClick = async () => {
    setAgreementSubmit(true);
    const dbClient = await authorizeUser(localStorage.getItem('wpassword'))
    create(account, [
      2,
      seat,
      languages[language],
      'LCIA',
      'Consenso Labs',
      counterParties[counterParty].address,
      'Apple Inc',
      disputeType + 1,
      docHash,
    ], dbClient, caller, counterParties[counterParty]);
    if (result !== false && resultProcedureContract) {
      agreementAddition(result.contractAddress, result.privacyGroupId, account);
    }
  };

  return (
    <ModalWrapper
      width='50rem'
      visible={agreementModal}
      onClose={closeAgreement}
    >
      <Title>Create an Arbitration Agreement</Title>

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
            <div style={{ flexBasis: '100%' }}> Dispute Type:</div>
            <DropDown
              style={{ flexBasis: '100%', borderColor: '#D9D9D9' }}
              items={['Existing', 'Future']}
              selected={disputeType}
              onChange={(index, items) => {
                setDisputeType(index);
                setAgreementModal(true);
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
            <div style={{ flexBasis: '100%' }}> Arbitration Seat:</div>
            <TextInput
              style={{ flexBasis: '100%' }}
              value={seat}
              onChange={(event) => {
                setSeat(event.target.value);
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
            <div style={{ flexBasis: '100%' }}> Arbitration Language:</div>
            <DropDown
              style={{ flexBasis: '100%', borderColor: '#D9D9D9' }}
              items={languages}
              selected={language}
              onChange={(index, items) => {
                setLanguage(index);
                setAgreementModal(true);
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
            <div style={{ flexBasis: '100%' }}> Counter Party:</div>
            <div style={{ flexBasis: '100%' }}>
              <DropDown
                style={{ borderColor: '#D9D9D9' }}
                items={counterParties.map((party) => {
                  //return party.address.slice(0, 15) + '...';
                  return party.name
                })}
                selected={counterParty}
                onChange={(index, items) => {
                  setCounterParty(index);
                  setAgreementModal(true);
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
            <div style={{ flexBasis: '100%' }}> Agreement Document:</div>
            <TextInput
              style={{ flexBasis: '100%' }}
              value={docHash}
              onChange={(event) => {
                setDocHash(event.target.value);
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
      )}
    </ModalWrapper>
  );
}
