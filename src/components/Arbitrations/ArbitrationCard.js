/*eslint-disable */
import React from 'react'
import { textStyle } from '@aragon/ui'
import ArbitrationCardName from '../../assets/ArbitrationCardName.svg'
import ArbitrationArgument from '../../assets/ArbitrationArgument.svg'
import ArbitrationCardDispute from '../../assets/ArbitrationCardDispute.svg'
import ArbitrationCompanyName from '../../assets/ArbitrationCompanyName.svg'
import Arbitrators from '../../assets/Arbitrators.svg'
import DisputeStatus from './DisputeStatus'
import styled from "styled-components";

const ArbitrationCardNameStyle = <img src={ArbitrationCardName} />
const ArbitrationCardDisputeStyle = <img src={ArbitrationCardDispute} />
const ArbitratorsStyle = <img src={Arbitrators} />
const ArbitrationArgumentStyle = <img src={ArbitrationArgument} />
const ArbitrationCompanyNameStyle = <img src={ArbitrationCompanyName} />

function ArbitrationCard({ arbitration, selectDispute }) {
  //note: If undefined error try doing conditional rendering here.

  // const status = [DISPUTE_STATUS_OPEN,
  //   DISPUTE_STATUS_APPEAL,
  //   DISPUTE_STATUS_CLOSED,]
  console.log("Card logging", arbitration)
  return (
    <>
      <section>
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
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 2fr 1fr' }}>
            <div
              css={`
                ${textStyle('title4')}
              `}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 7fr' }}>
                <p>{ArbitrationCardDisputeStyle}</p>
                <p>{arbitration[0]}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 7fr' }}>
                <p>{ArbitrationCardNameStyle}</p>
                <CardSubText>{arbitration[5]}</CardSubText>
              </div>
            </div>
            <div
              css={`
                ${textStyle('body1')}
              `}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 7fr' }}>
                <p>{ArbitratorsStyle}</p>
                <CardSubText>{arbitration[4]} arbitrators</CardSubText>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 7fr' }}>
                <p>{ArbitrationCompanyNameStyle}</p>
                <CardSubText>{arbitration[6]}</CardSubText>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 7fr' }}>
                <p>{ArbitrationArgumentStyle}</p>
                <CardSubText>3</CardSubText>
              </div>
            </div>
            {/* <div>
              <DisputeStatus dispute={DISPUTE_STATUS_OPEN} />
            </div> */}
          </div>
        </div>
      </section>
    </>
  )
}

const CardSubText = styled.span`
        ${textStyle('label2')}
      font-weight: 300;
      color: ${({ labelColor }) => labelColor};
`

export default ArbitrationCard
