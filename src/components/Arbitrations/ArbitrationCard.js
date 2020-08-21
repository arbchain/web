import React from 'react'
import { textStyle } from '@aragon/ui'
import ArbitrationCardName from '../../assets/ArbitrationCardName.svg'
import ArbitrationArgument from '../../assets/ArbitrationArgument.svg'
import ArbitrationCardDispute from '../../assets/ArbitrationCardDispute.svg'
import ArbitrationCompanyName from '../../assets/ArbitrationCompanyName.svg'
import Arbitrators from '../../assets/Arbitrators.svg'
import DisputeStatus from './DisputeStatus'
import { disputes } from '../../mock-data'

const ArbitrationCardNameStyle = <img src={ArbitrationCardName} />
const ArbitrationCardDisputeStyle = <img src={ArbitrationCardDispute} />
const ArbitratorsStyle = <img src={Arbitrators} />
const ArbitrationArgumentStyle = <img src={ArbitrationArgument} />
const ArbitrationCompanyNameStyle = <img src={ArbitrationCompanyName} />

function ArbitrationCard() {
  return (
    <>
      <section>
        <div
          style={{
            padding: '2rem',
            marginTop: '1.5rem',
            borderRadius: '0.7rem',
            boxShadow: '0px 1px 3px rgba(51, 77, 117, 0.2)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 2fr 1fr' }}>
            <div
              css={`
                ${textStyle('title4')}
              `}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 7fr' }}>
                <p>{ArbitrationCardDisputeStyle}</p>
                <p>Consenso Corp project delivery dispute</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 7fr' }}>
                <p>{ArbitrationCardNameStyle}</p>
                <p>Consenso Corp</p>
              </div>
            </div>
            <div
              css={`
                ${textStyle('body1')}
              `}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 7fr' }}>
                <p>{ArbitratorsStyle}</p>
                <p>3 arbitrators</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 7fr' }}>
                <p>{ArbitrationCompanyNameStyle}</p>
                <p>Apple Inc</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 7fr' }}>
                <p>{ArbitrationArgumentStyle}</p>
                <p>10 arguments</p>
              </div>
            </div>
            <div>
              <DisputeStatus dispute={disputes[0]} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ArbitrationCard
