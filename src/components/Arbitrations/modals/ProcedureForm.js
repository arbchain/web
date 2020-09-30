import { Result, Spin } from 'antd';
import React, { useState } from 'react';
import { Button, DropDown, Modal, TextInput, useTheme } from '@aragon/ui';
// import {} from '../../../lib/contracts/'
import '../../../css/result.css';
import { LoadingOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { deployProcedureContract } from '../../../lib/contracts/DeployWorkflow';

const antIcon = <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb' }} spin />;

const ageementAddr = [
  '0x958543756A4c7AC6fB361f0efBfeCD98E4D297Db',
  '0xd5B5Ff46dEB4baA8a096DD0267C3b81Bda65e943',
];

const courtAddr = [
  '0x958543756A4c7AC6fB361f0efBfeCD98E4D297Db',
  '0xd5B5Ff46dEB4baA8a096DD0267C3b81Bda65e943',
];

export default function ProcedureForm({ procedureModal, setProcedureModal, account, node }) {
  const theme = useTheme();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [agreementAddress, setAgreementAddress] = useState(0);
  const [claimantAddress, setClaimantAddress] = useState('');
  const [respondentAddress, setRespondentAddress] = useState('');
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

  const handleClick = () => {
    setProcedureSubmit(true);
    createProcedureContract(account, [
      name,
      description,
      ageementAddr[agreementAddress],
      claimantAddress, // Add user public key not private key!//
      respondentAddress,
      courtAddr[courtAddress],
    ]);
  };

  const createAgain = () => {
    setProcedureSubmit(false);
  };

  return (
    <Modal width="50rem" visible={procedureModal} onClose={closeProcedure}>
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
            onChange={event => {
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
            onChange={event => {
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

        <div
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
            onChange={event => {
              setClaimantAddress(event.target.value);
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
          <div style={{ flexBasis: '100%' }}> Respondent Address:</div>
          <TextInput
            style={{ flexBasis: '100%' }}
            value={respondentAddress}
            onChange={event => {
              setRespondentAddress(event.target.value);
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
          <div style={{ flexBasis: '100%' }}> Court Address:</div>
          <DropDown
            style={{ borderColor: '#D9D9D9' }}
            items={courtAddr.map(party => {
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
          label="SUBMIT"
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
