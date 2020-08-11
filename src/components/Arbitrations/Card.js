/*eslint-disable */
import React from 'react'
import { Button, textStyle } from '@aragon/ui'
import ArbitrationCardName from '../../assets/ArbitrationCardName.svg'
import ArbitrationArgument from '../../assets/ArbitrationArgument.svg'
import ArbitrationCardDispute from '../../assets/ArbitrationCardDispute.svg'
import ArbitrationCompanyName from '../../assets/ArbitrationCompanyName.svg'
import Arbitrators from '../../assets/Arbitrators.svg'

const ArbitrationCardNameStyle = <img src={ArbitrationCardName} />
const ArbitrationCardDisputeStyle = <img src={ArbitrationCardDispute} />
const ArbitratorsStyle = <img src={Arbitrators} />
const ArbitrationArgumentStyle = <img src={ArbitrationArgument} />
const ArbitrationCompanyNameStyle = <img src={ArbitrationCompanyName} />

function Card() {
  var primary = '#52006F'

  return (
    <>
      <section>
        <div
          style={{
            width: '65rem',
            height: '10rem',
            padding: '2rem',
            marginTop: '1.5rem',
            borderRadius: '0.7rem',
            boxShadow: '2px 2px 21px -9px rgba(0,0,0,0.5)',
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
            <div style={{ paddingTop: '0.5rem' }}>
              <Button
                style={{ backgroundColor: '#EBDEF0', color: primary }}
                size='small'
                label='REQUESTED'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Card
