import React from 'react';
import { Main, Split, useTheme, GU, textStyle } from '@aragon/ui';
import { Button } from 'antd';
import Avatar from '../assets/Avatar.png';

import styled from 'styled-components';

const OutterContainer = styled.div`
  border: 1px solid #dde4e9;
  padding: 1.5rem;
  box-shadow: rgba(51, 77, 117, 0.2) 0px 1px 3px;
  border-radius: 4px;
  h3 {
    color: #637381;
    ${textStyle('label2')};
    display: block;
    margin-bottom: 2px;
  }
  h2 {
    display: block;
    ${textStyle('body2')};
    font-weight: 500;
    color: #212b36;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .image-block {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      border-radius: 50%;
      width: 50px;
      height: auto;
    }
  }
  .texts {
    margin-left: 1rem;
    justify-content: center;
  }
`;

const Description = styled.div`
  margin-top: 45px;

  .title {
    color: hsl(202, 57%, 15%);
    font-weight: 500;
    font-size: 24px;
  }

  .description {
    font-weight: 400;
    color: hsl(203, 15%, 47%);

    .primary {
      background: #4d4cbb;
      color: #fff;
    }
  }
`;

const RespondantContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(250px, auto);
  grid-gap: ${5 * GU}px;
  margin-bottom: ${2 * GU}px;
  margin-top: 28px;
`;

function NewProcedureCard() {
  const theme = useTheme();
  return (
    <Main>
      <Split
        primary={
          <>
            <section>
              <OutterContainer>
                <FlexContainer>
                  <div className='image-block'>
                    <div className='image'>
                      <img src={Avatar} alt='' srcset='' />
                    </div>
                    <div className='texts'>
                      <h3>Created By</h3>
                      <h2>John Doe</h2>
                    </div>
                  </div>
                  <div className='date'>
                    <h3>Created On</h3>
                    <h2>30-11-2020</h2>
                  </div>
                </FlexContainer>

                <Description>
                  <h1 className='title'>Title</h1>
                  <p className='description'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Vero culpa expedita minima dolorum, maxime obcaecati ratione
                    voluptas ex voluptatum illum!
                  </p>
                  <Button
                    style={{ background: '#4d4cbb', color: 'white' }}
                    className='primary'
                  >
                    Read More
                  </Button>
                </Description>
                <RespondantContainer>
                  <div>
                    <h3>Respondant Name</h3>
                    <h2>Jane Doe</h2>
                  </div>

                  <div>
                    <h3>Court Address</h3>

                    <h2>x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x</h2>
                  </div>
                </RespondantContainer>
              </OutterContainer>
            </section>
          </>
        }
      />
    </Main>
  );
}

export default NewProcedureCard;
