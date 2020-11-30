import React from 'react';
import {
  Main,
  Split,
  useTheme,
  GU,
  textStyle,
  DropDown,
  Text,
} from '@aragon/ui';
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

const RespondantContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(250px, auto);
  grid-gap: ${5 * GU}px;
  margin-bottom: ${2 * GU}px;
  margin-top: 50px;
  .dropdown {
    width: 300px;
    overflow: hidden;
  }
`;

const Title = styled.h1`
  ${textStyle('label2')};
  color: ${(theme) => theme.surfaceContentSecondary};
  margin-bottom: ${2 * GU}px;
`;

function NewAgreementCard() {
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
                      <h3>claimant Name</h3>
                      <h2>John Doe</h2>
                    </div>
                  </div>
                  <div className='date'>
                    <h3>Created At</h3>
                    <h2>30-11-2020</h2>
                  </div>
                </FlexContainer>

                <RespondantContainer>
                  <div>
                    <h3>Dispuit Type </h3>
                    <h2>Network Cash Agreement</h2>
                  </div>

                  <div>
                    <h3>Law</h3>

                    <h2>x0x0x0x</h2>
                  </div>

                  <div>
                    <h3>Respondant Name</h3>
                    <h2>Jane Doe</h2>
                  </div>

                  <div>
                    <h3>Document Name</h3>

                    <h2>x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x</h2>
                  </div>

                  <div>
                    <Title>Selected Language </Title>
                    <DropDown
                      className='dropdown'
                      style={{
                        flexBasis: '100%',
                        borderColor: '#D9D9D9',
                        background: '#fff',
                      }}
                      disabled={false}
                      items={[]}
                      placeholder='Langauge'
                    />
                  </div>

                  <div>
                    <Title>Selected Arbitration Seat</Title>
                    <DropDown
                      className='dropdown'
                      disabled={false}
                      style={{
                        flexBasis: '100%',
                        borderColor: '#D9D9D9',
                        background: '#fff',
                      }}
                      items={[]}
                      placeholder='Seat'
                    />
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

export default NewAgreementCard;
