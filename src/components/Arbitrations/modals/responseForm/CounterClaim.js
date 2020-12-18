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
    margin-left: 0.5rem;
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
  .DropDown {
    border-color: #d9d9d9;
  }
`;

function CounterClaim({ setOpenClain, openClaim }) {
  const [note, setNote] = useState('');
  const [upload, setUpload] = useState();
  const closePannel = () => {
    setOpenClain(false);
  };

  const theme = useTheme();
  return (
    <SidePanel title='Counter Claim' opened={openClaim} onClose={closePannel}>
      <ResponseContainer>
        <div className='inputGroups '>
          <h3>Title </h3>
          <TextInput
            wide
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
          />
        </div>

        <div className='inputGroups '>
          <h3>Description </h3>
          <TextInput
            multiline
            wide
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
          />
        </div>

        <div className='inputGroups '>
          <h3>Respondent Address </h3>
          <DropDown
            className='dropDown'
            multiline
            wide
            value={note}
            items={['res1', 'res2', 'res3']}
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

        <Button
          label='SUBMIT'
          wide
          style={{
            backgroundColor: theme.selected,
            color: 'white',
          }}
          onClick={() => console.log('clicked')}
        />
      </ResponseContainer>
    </SidePanel>
  );
}

export default CounterClaim;
