import { Result, Spin } from 'antd';
import React, { useState } from 'react';
import { Button, DropDown, Modal, TextInput, useTheme } from '@aragon/ui';
// import {} from '../../../lib/contracts/'
import '../../../css/result.css';
import { LoadingOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { deployProcedureContract } from '../../../lib/contracts/DeployWorkflow';
import { authorizeUser} from "../../../database/threadDB-utils";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb' }} spin />
);

const ageementAddr = [
  '0x958543756A4c7AC6fB361f0efBfeCD98E4D297Db',
  '0xd5B5Ff46dEB4baA8a096DD0267C3b81Bda65e943',
];

const courtAddr = [
  '0x958543756A4c7AC6fB361f0efBfeCD98E4D297Db',
  '0xd5B5Ff46dEB4baA8a096DD0267C3b81Bda65e943',
];

export default function ProcedureForm({
  procedureModal,
  setProcedureModal,
  account,
  node,
  counterParties,
  caller
}) {
  const theme = useTheme();
  console.log("Caller:",caller)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [agreementAddress, setAgreementAddress] = useState(0);
  const [claimantAddress, setClaimantAddress] = useState('');
  const [respondentAddress, setRespondentAddress] = useState(0);
  const [courtAddress, setCourtAddress] = useState(0);
  const [procedureSubmit, setProcedureSubmit] = useState(false);

  const closeProcedure = () => {
    setProcedureModal(false);
    setProcedureSubmit(false);
  };

  const {
    resultProcedureContract,
    procedureAdditionStatus,
    createProcedureContract,
  } = deployProcedureContract(node);

  console.log('Procedure Addition Staus', procedureAdditionStatus);
  console.log('Procedure Contract', resultProcedureContract);

  const handleClick = async () => {
    setProcedureSubmit(true);
    const dbClient = await authorizeUser(localStorage.getItem('wpassword'))
    await createProcedureContract(account, [
      name,
      description,
      ageementAddr[agreementAddress],
      caller.address, // Add user public key not private key!//
      counterParties[respondentAddress].address,
      courtAddr[courtAddress],
    ], dbClient, caller, counterParties[respondentAddress]);
  };

  const createAgain = () => {
    setProcedureSubmit(false);
  };

  return (
    <Modal width='50rem' visible={procedureModal} onClose={closeProcedure}>
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
            <div style={{ flexBasis: '100%' }}> Name </div>
            <TextInput
              style={{ flexBasis: '100%' }}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
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
            <div style={{ flexBasis: '100%' }}> Description</div>
            <TextArea
              style={{ flexBasis: '100%' }}
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
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
            <div style={{ flexBasis: '100%' }}> Agreement Addresses</div>
            <DropDown
              style={{ flexBasis: '100%', borderColor: '#D9D9D9' }}
              items={ageementAddr}
              selected={agreementAddress}
              onChange={(index, items) => {
                setAgreementAddress(index);
                setProcedureModal(true);
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
            <div style={{ flexBasis: '100%' }}> Claimant Address:</div>

            <TextInput
              style={{ flexBasis: '100%' }}
              value={claimantAddress}
              onChange={(event) => {
                setClaimantAddress(event.target.value);
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
            <div style={{ flexBasis: '100%' }}> Respondent Address:</div>
            {/*<TextInput
              style={{ flexBasis: '100%' }}
              value={respondentAddress}
              onChange={(event) => {
                setRespondentAddress(event.target.value);
              }}
            />*/}
            <div style={{ flexBasis: '100%' }}>
              <DropDown
                style={{ borderColor: '#D9D9D9' }}
                items={counterParties.map((party) => {
                  //return party.address.slice(0, 15) + '...';
                  return party.name
                })}
                selected={respondentAddress}
                onChange={(index, items) => {
                  setRespondentAddress(index);
                  setProcedureModal(true);
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
            <div style={{ flexBasis: '100%' }}> Court Address:</div>
            <DropDown
              style={{ borderColor: '#D9D9D9' }}
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
    </Modal>
  );
}
