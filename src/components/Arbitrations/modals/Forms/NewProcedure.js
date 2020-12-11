import React from 'react';
import { Main, Button, SidePanel, TextInput, useTheme } from '@aragon/ui';
import styled from 'styled-components';

const ProcedureForm = styled.div`
  margin-top: 18px;

  .inputGroups {
    margin-left: 0.5rem;
    margin-bottom: 22px;
    justify-content: center;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Panel = styled(SidePanel)`
  z-index: 50;
  width: 50%;
`;

function NewProcedure({ opened, setOpened }) {
  const theme = useTheme();
  const closePannel = () => {
    setOpened(false);
  };
  return (
    <>
      <Panel title='Create New Procedure' opened={opened} onClose={closePannel}>
        <ProcedureForm>
          <GridContainer>
            <div className='inputGroups '>
              <h3>Name</h3>
              <TextInput wide />
            </div>
            <div className='inputGroups '>
              <h3>Agreement Address</h3>
              <TextInput wide />
            </div>
          </GridContainer>
          <div className='inputGroups '>
            <h3>Description</h3>
            <TextInput multiline wide />
          </div>

          <div className='inputGroups '>
            <h3>Respondant Address</h3>
            <TextInput wide />
          </div>
          <GridContainer>
            <div className='inputGroups '>
              <h3>Seat</h3>
              <TextInput wide />
            </div>
            <div className='inputGroups '>
              <h3>Language</h3>
              <TextInput wide />
            </div>
          </GridContainer>
          <div className='inputGroups '>
            <h3>Court Address</h3>
            <TextInput wide />
          </div>
          <div className='inputGroups '>
            <h3>Upload Documents </h3>
            <TextInput wide />
          </div>
          <Button
            wide
            label='SUBMIT'
            style={{
              backgroundColor: theme.selected,
              color: 'white',
            }}
          />
        </ProcedureForm>
      </Panel>
    </>
  );
}

export default NewProcedure;
