import { Result, Spin } from 'antd';
import React, { useState } from 'react';
import { Button, DropDown, Modal, TextInput, useTheme } from '@aragon/ui';
import '../../../css/result.css';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { deployProcedureContract } from '../../../lib/contracts/DeployWorkflow';
import styled from 'styled-components';
import { uploadDoc } from '../../../lib/file-storage';
import { signDocuments } from '../../../lib/contracts/SPC';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb' }} spin />
);

const languages = ['English', 'French', 'Spanish'];
const arbitrationSeats = ['London', 'lorem', 'lorem'];

const ageementAddr = [
  '0x958543756A4c7AC6fB361f0efBfeCD98E4D297Db',
  '0xd5B5Ff46dEB4baA8a096DD0267C3b81Bda65e943',
];

const courtAddr = [
  '0x958543756A4c7AC6fB361f0efBfeCD98E4D297Db',
  '0xd5B5Ff46dEB4baA8a096DD0267C3b81Bda65e943',
];

const ProcedureContainer = styled.div`
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

export default function ProcedureForm({
  procedureModal,
  setProcedureModal,
  account,
  node,
  counterParties,
  caller,
  client,
}) {
  const theme = useTheme();
  //console.log('Caller:', caller);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [agreementAddress, setAgreementAddress] = useState(0);
  const [claimantAddress, setClaimantAddress] = useState('');
  const [respondentAddress, setRespondentAddress] = useState(0);
  const [courtAddress, setCourtAddress] = useState(0);
  const [procedureSubmit, setProcedureSubmit] = useState(false);
  const [seat, setSeat] = useState(0);
  const [language, setLanguage] = useState(0);
  const [document, setDocument] = useState(null);

  const closeProcedure = () => {
    setProcedureModal(false);
    setProcedureSubmit(false);
  };

  const {
    resultProcedureContract,
    procedureAdditionStatus,
    createProcedureContract,
  } = deployProcedureContract(node);

  const handleClick = async () => {
    setProcedureSubmit(true);
    const partiesInvolved = [
      {
        partyAddress: caller.address,
        name: caller.name,
      },
      {
        partyAddress: counterParties[respondentAddress].address,
        name: counterParties[respondentAddress].name,
      },
    ];

    const fileDetails = await uploadDoc(
      document,
      localStorage.getItem('wpassword'),
      'AWS'
    );
    console.log('UploadStatus:', fileDetails);
    await createProcedureContract(
      account,
      [
        name,
        description,
        ageementAddr[agreementAddress],
        caller.address, // Add user public key not private key!//
        counterParties[respondentAddress].address,
        courtAddr[courtAddress],
      ],
      client,
      caller,
      counterParties[respondentAddress],
      partiesInvolved,
      arbitrationSeats[seat],
      languages[language],
      fileDetails
    );
  };

  const createAgain = () => {
    setProcedureSubmit(false);
  };

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

  return (
    <Modal
      style={{ zIndex: '50' }}
      width='50rem'
      visible={procedureModal}
      onClose={closeProcedure}
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
        <h2> Create New Procedure</h2>
      </div>
      {procedureSubmit ? (
        resultProcedureContract ? (
          <Result
            status='success'
            title='Successfully created Procedure Agreement!'
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
              <Button onClick={closeProcedure}>Done</Button>,
            ]}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '150px' }}>
            <Spin indicator={antIcon} />
            <span> Submitting Procedure</span>
          </div>
        )
      ) : (
        <ProcedureContainer>
          <GridContainer>
            <div className='inputGroups '>
              <h3>Name</h3>
              <TextInput
                wide
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className='inputGroups '>
              <h3>Agreement Address</h3>
              <DropDown
                className='dropDown'
                wide
                items={ageementAddr}
                selected={agreementAddress}
                onChange={(index, items) => {
                  setAgreementAddress(index);
                  setProcedureModal(true);
                }}
              />
            </div>
          </GridContainer>
          <div className='inputGroups '>
            <h3>Description</h3>
            <TextInput
              multiline
              wide
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>

          <div className='inputGroups '>
            <h3>Respondant Address</h3>
            <DropDown
              className='dropDown'
              wide
              items={counterParties.map((party) => {
                //return party.address.slice(0, 15) + '...';
                return party.name;
              })}
              selected={respondentAddress}
              onChange={(index, items) => {
                setRespondentAddress(index);
                setProcedureModal(true);
              }}
            />
          </div>
          <GridContainer>
            <div className='inputGroups '>
              <h3>Seat</h3>
              <DropDown
                className='dropDown'
                wide
                items={arbitrationSeats}
                selected={seat}
                onChange={(index, items) => {
                  setSeat(index);
                  setProcedureModal(true);
                }}
              />
            </div>
            <div className='inputGroups '>
              <h3>Language</h3>
              <DropDown
                className='dropDown'
                wide
                items={languages}
                selected={language}
                onChange={(index, items) => {
                  setLanguage(index);
                  setProcedureModal(true);
                }}
              />
            </div>
          </GridContainer>

          <GridContainer>
            <div className='inputGroups '>
              <h3>Court Address</h3>
              <DropDown
                className='dropDown'
                wide
                items={courtAddr.map((party) => {
                  return party.slice(0, 20) + '...';
                })}
                selected={courtAddress}
                onChange={(index, items) => {
                  setCourtAddress(index);
                  setProcedureModal(true);
                }}
              />
            </div>
            <div className='inputGroups '>
              <h3>Upload Documents </h3>
              <Upload className='upload' {...props}>
                <Button
                  className='upload'
                  wide
                  icon={<UploadOutlined style={{ color: '#212b36' }} />}
                  label='Click to Upload'
                />
              </Upload>
            </div>
          </GridContainer>
          <Button
            wide
            label='SUBMIT'
            className='submit-btn'
            label='SUBMIT'
            onClick={handleClick}
          />
        </ProcedureContainer>
      )}
    </Modal>
  );
}
