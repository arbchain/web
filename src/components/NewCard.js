import React from 'react';
import {
  Box,
  Main,
  Split,
  Card,
  Button,
  useTheme,
  Text,
  GU,
  textStyle,
} from '@aragon/ui';
import Avatar from '../assets/Avatar.png';

import styled from 'styled-components';
import { Descriptions } from 'antd';

const OutterContainer = styled.div`
  border: 1px solid #dde4e9;
  padding: 1rem;
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
  }
  .date {
    h2 {
      font-weight: 500;
      font-size: 16px;
      color: #212b36;
    }
    h3 {
      color: #637381;
      ${textStyle('label2')};
      display: block;
      margin-bottom: 2px;
    }
  }
`;

const Description = styled.div`
  margin-top: 45px;

  .title {
    color: hsl(202, 57%, 15%);
    font-weight: 700;
    font-size: 24px;
  }

  .description {
    font-weight: 400;
    color: hsl(203, 15%, 47%);
  }
`;

const Container = styled.div.attrs(() => ({
  className: 'test',
}))`
  cursor: pointer;
  color: white;
`;

function NewCard() {
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
                      <h3>Name</h3>
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
                    mode='strong'
                    css={`
                      background: ${theme.selected};
                    `}
                  >
                    Read More
                  </Button>
                </Description>
                <Container>
                  <h2 className='test'>Respondant Name</h2>
                  <h2>Court Address</h2>
                </Container>
              </OutterContainer>
            </section>
          </>
        }
      />
    </Main>
  );
}

export default NewCard;
