import React, { useState } from 'react';
import {
  Box,
  GU,
  Text,
  TextInput,
  DropDown,
  useTheme,
  Button,
  IconUpload,
  SidePanel,
} from '@aragon/ui';
import { Upload, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import {uploadDoc} from "../../../../lib/file-storage";
import {createArbitrationResponse, signDocuments} from "../../../../lib/contracts/SPC";

// styled Component
const ResponseContainer = styled.div`
  margin-top: 18px;
  .inputGroups {
    margin-bottom: 22px;
    justify-content: center;
  }
  .upload {
    width: 100% !important;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  .DropDown {
    border-color: #d9d9d9;
  }
  .success {
    width: 95%;
    background-color: #21d48e;
    color: #fff;
    text-align: center;
    justify-content: center;
    height: 40px;
    border: 1px solid #dde4e9;
    border-radius: 3px;
    margin-right: 10px;
  }
  .error {
    width: 95%;
    background-color: #fb7777;
    color: #fff;
    text-align: center;
    justify-content: center;
    height: 40px;
    border: 1px solid #dde4e9;
    border-radius: 3px;
  }
`;

function AcceptResponse({ openResponse, setOpenResponse, procedureDocHash, contractAddress, groupId, NODE , account}) {
  const [note, setNote] = useState('');
  const [upload, setUpload] = useState();
  const [document, setDocument] = useState(null);

  const closePannel = () => {
    setOpenResponse(false);
  };

  const { connected, arbitrationResponseCreation } = createArbitrationResponse(NODE, contractAddress, groupId)

  const { connect, documentSign } = signDocuments(
    NODE,
    contractAddress,
    groupId
  );

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

  const handleClick = async ()=>{
    console.log("Signing procedure statement:")
    await documentSign(procedureDocHash, account);

    console.log("Document:", document)

    const docInfo = await uploadDoc(
      document,
      localStorage.getItem('wpassword'),
      'AWS'
    );

    const documentInfo = {
      cipherKey: docInfo. cipherKey,
      fileLocation: docInfo.fileLocation,
      fileName: docInfo.fileName,
      fileFormat: docInfo.fileFormat,
    }

    console.log('UploadStatus:', docInfo);
    await arbitrationResponseCreation(
      note,
      docInfo.fileHash,
      JSON.stringify(documentInfo),
      docInfo.fileLocation,
      100,
      false,
      0,
      account
    )

    console.log("Signing response!!")
    await documentSign(docInfo.fileHash, account);
    console.log("DONE!!!")
  }

  const theme = useTheme();
  return (
    <SidePanel
      title='Accept Response'
      opened={openResponse}
      onClose={closePannel}
    >
      <ResponseContainer>
        <div className='inputGroups '>
          <h3>Summary </h3>
          <TextInput
            multiline
            wide
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
          />
        </div>

        <div className='inputGroups'>
          <h3>Upload Document</h3>
          <Upload {...props}>
            <Button
              icon={<IconUpload />}
              label='Click to Upload'
              className='upload'
            />
          </Upload>
        </div>

        <GridContainer>
          <Button wide className='btn success' onClick={handleClick}>
            Accept
          </Button>
          <Button wide className='btn error'>
            Reject
          </Button>
        </GridContainer>
      </ResponseContainer>
    </SidePanel>
  );
}

export default AcceptResponse;
