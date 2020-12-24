import React from 'react';
import { Main, Split, useTheme, GU, textStyle, DropDown, Text } from '@aragon/ui';

import Avatar from '../../assets/avatar.png';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const OuterContainer = styled.div`
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
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
      height: auto;
    }
  }
  .texts {
    margin-left: 1rem;
    justify-content: center;
  }
`;

const RespondentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 22px;
  margin-bottom: ${2 * GU}px;
  margin-top: 30px;
  .dropdown {
    width: 300px;
    overflow: hidden;
  }
`;

const DisputeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 22px;
  margin-top: 28px;
`;

function AgreementCard({ agreement, agreementAddress }) {
  const theme = useTheme();
  const groupId = encodeURIComponent(agreementAddress.groupId);
  const disputeType = ['Future', 'Existing'];
  const role = agreement.role;
  return (
    <Main>
      <Link
        to={{
          pathname: `/agreements/${agreementAddress.contractAddress}/${groupId}`,
        }}
        style={{ color: '#000000d9' }}
      >
        <>
          <section>
            <OuterContainer>
              <FlexContainer>
                <div className="image-block">
                  <div className="image">
                    <img src={Avatar} alt="" srcSet="" />
                  </div>
                  <div className="texts">
                    <h3>Agreement Title</h3>
                    <h2>{agreement.title}</h2>
                  </div>
                </div>
                <div className="date">
                  <h3>Created At</h3>
                  <h2>{agreement.createdAt}</h2>
                </div>
              </FlexContainer>
              <DisputeContainer>
                <div>
                  <h3>Dispute Type </h3>
                  <h2>{disputeType[parseInt(agreement.disputeType)]}</h2>
                </div>
                <div>
                  <h3>Law</h3>
                  <h2>{agreement.law}</h2>
                </div>

                <div>
                  <h3>Seat</h3>
                  <h2>{agreement.seat}</h2>
                </div>
              </DisputeContainer>

              <RespondentContainer>
                <div>
                  <h3>Claimant Name</h3>
                  <h2>{agreement.claimantName}</h2>
                </div>

                <div>
                  <h3>Respondent Name</h3>
                  <h2>{agreement.respondentName}</h2>
                </div>

                <div>
                  <h3>Language</h3>
                  <h2>{agreement.language}</h2>
                </div>
              </RespondentContainer>
            </OuterContainer>
          </section>
        </>
      </Link>
    </Main>
  );
}

export default AgreementCard;
