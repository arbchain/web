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

function AcceptResponse({ openResponse, setOpenResponse }) {
  const [note, setNote] = useState('');
  const [upload, setUpload] = useState();
  const closePannel = () => {
    setOpenResponse(false);
  };

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
          <Upload>
            <Button
              icon={<IconUpload />}
              label='Click to Upload'
              className='upload'
            />
          </Upload>
        </div>

        <GridContainer>
          <Button wide className='btn success'>
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
