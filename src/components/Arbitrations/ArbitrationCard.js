import React from 'react';
import { Main, Split, useTheme, GU, textStyle } from '@aragon/ui';
import Avatar from '../../assets/avatar.png';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const OutterContainer = styled.div`
  border: 1px solid #dde4e9;
  padding: 1.5rem;
  box-shadow: rgba(51, 77, 117, 0.2) 0px 1px 3px;
  border-radius: 4px;
  background-color: #fff !important;
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
    justify-content: flex-start;
    align-items: center;
    img {
      width: 50px;
      height: auto;
    }
  }
  .texts {
    margin-left: 0.5rem;
    justify-content: center;
  }
`;

const Description = styled.div`
  margin-top: 40px;

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

function ArbitrationCard({ arbitration, procedureAddress }) {
  const theme = useTheme();
  const groupId = encodeURIComponent(procedureAddress.groupId);
  console.log('Card logging', arbitration);

  return (
    <Main>
      <Link
        to={{
          pathname: `/arbitrations/${procedureAddress.contractAddress}/${groupId}`,
        }}
        style={{ color: '#000000d9' }}
      >
        <OutterContainer>
          <FlexContainer>
            <div className='image-block'>
              <div className='image'>
                <img src={Avatar} alt='' srcset='' />
              </div>
              <div className='texts'>
                <h3>Created By</h3>
                <h2>{arbitration.claimantName}</h2>
              </div>
            </div>
            <div className='date'>
              <h3>Created On</h3>
              <h2>{arbitration.createdAt}</h2>
            </div>
          </FlexContainer>

          <Description>
            <h1 className='title'>{arbitration.name}</h1>
            <p className='description'>{arbitration.description}</p>
          </Description>
          <RespondantContainer>
            <div>
              <h3>Respondant Name</h3>
              <h2>{arbitration.respondentName}</h2>
            </div>

            <div>
              <h3>Court Address</h3>
              <h2>{arbitration.courtAddress}</h2>
            </div>
          </RespondantContainer>
        </OutterContainer>
      </Link>
    </Main>
  );
}

export default ArbitrationCard;
