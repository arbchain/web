/*eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { textStyle } from '@aragon/ui';
import ArbitrationCardName from '../../assets/ArbitrationCardName.svg';
import ArbitrationArgument from '../../assets/ArbitrationArgument.svg';
import ArbitrationCardDispute from '../../assets/ArbitrationCardDispute.svg';
import ArbitrationCompanyName from '../../assets/ArbitrationCompanyName.svg';
import Arbitrators from '../../assets/Arbitrators.svg';
import DisputeStatus from './DisputeStatus';
import styled from 'styled-components';

const ArbitrationCardNameStyle = <img src={ArbitrationCardName} />;
const ArbitrationCardDisputeStyle = <img src={ArbitrationCardDispute} />;
const ArbitratorsStyle = <img src={Arbitrators} />;
const ArbitrationArgumentStyle = <img src={ArbitrationArgument} />;
const ArbitrationCompanyNameStyle = <img src={ArbitrationCompanyName} />;

function ArbitrationCard({ arbitration, selectDispute, procedureAddress }) {
  //note: If undefined error try doing conditional rendering here.

  // const status = [DISPUTE_STATUS_OPEN,
  //   DISPUTE_STATUS_APPEAL,
  //   DISPUTE_STATUS_CLOSED,]
  //console.log('Address', procedureAddress);
  // const uriComponents = [procedureAddress.procedureContractAddress, procedureAddress.groupId]
  const groupId = encodeURIComponent(procedureAddress.groupId);
  console.log('Card logging', arbitration);
  return (
    <>
      <section>
        <Link
          to={{
            pathname: `/arbitrations/${procedureAddress.contractAddress}/${groupId}`,
          }}
          style={{ color: '#000000d9' }}
        >
          <div
            style={{
              padding: '2rem',
              marginTop: '1.5rem',
              borderRadius: '0.7rem',
              boxShadow: '0px 1px 3px rgba(51, 77, 117, 0.2)',
              cursor: 'pointer',
            }}
            // onClick={() => selectDispute(arbitration.id)}
          >
            <div
              style={{ display: 'grid', gridTemplateColumns: '5fr 2fr 1fr' }}
            >
              <div
                css={`
                  ${textStyle('title4')}
                `}
              >
                <div
                  style={{ display: 'grid', gridTemplateColumns: '1fr 7fr' }}
                >
                  <p>{ArbitrationCardDisputeStyle}</p>
                  <p>{arbitration.name}</p>
                </div>
                <div
                  style={{ display: 'grid', gridTemplateColumns: '1fr 7fr' }}
                >
                  <p>{ArbitrationCardNameStyle}</p>
                  <CardSubText>{arbitration.description}</CardSubText>
                </div>
              </div>
              <div
                css={`
                  ${textStyle('body1')}
                `}
              >
                <div
                  style={{ display: 'grid', gridTemplateColumns: '2fr 7fr' }}
                >
                  <p>{ArbitrationCompanyNameStyle}</p>
                  <CardSubText>Created By: {arbitration.claimantName}</CardSubText>
                </div>
                <div
                  style={{ display: 'grid', gridTemplateColumns: '2fr 7fr' }}
                >
                  <p>{ArbitrationCompanyNameStyle}</p>
                  <CardSubText>Respondent: {arbitration.respondentName}</CardSubText>
                </div>
                <div
                  style={{ display: 'grid', gridTemplateColumns: '2fr 7fr' }}
                >
                  <p>{ArbitrationArgumentStyle}</p>
                  <CardSubText>Date: {arbitration.createdAt}</CardSubText>
                </div>
              </div>
              {/* <div>
              <DisputeStatus dispute={DISPUTE_STATUS_OPEN} />
            </div> */}
            </div>
          </div>
        </Link>
      </section>
    </>
  );
}

const CardSubText = styled.span`
  ${textStyle('label2')}
  font-weight: 300;
  color: ${({ labelColor }) => labelColor};
`;

export default ArbitrationCard;
