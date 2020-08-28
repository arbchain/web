/*eslint-disable */
import React from 'react'
import {
  Box,
  Button,
  GU,
  Text,
  textStyle,
  IdentityBadge,
  useTheme,
} from '@aragon/ui'
import IconCourt from '../../assets/courtIcon.svg'
import ArbitrationCardDispute from '../../assets/ArbitrationCardDispute.svg'
import DisputeStatus from './DisputeStatus'

const DisputeInfo = ({ dispute }) => {
  const theme = useTheme()
  const {
    description,
    title,
    creator,
    claimant,
    respondent,
  } = dispute

  return (
    <Box>
      <section
        css={`
          display: grid;
          grid-template-columns: auto;
          grid-gap: ${2.5 * GU}px;
          align-items: center;
        `}
      >
        <div
          css={`
            display: flex;
            margin-bottom: ${3 * GU}px;
            justify-content: space-between;
          `}
        >
          <div
            css={`
              display: flex;
              align-items: center;
            `}
          >
            <div
            >
              <img
                  css={`
                width: ${5 * GU}px;
              `}
                 src={ArbitrationCardDispute} />
            </div>
            <div
              css={`
                margin-left: ${3 * GU}px;
              `}
            >
              <Text
                css={`
                  display: block;
                  margin-bottom: ${GU}px;
                  ${textStyle('title3')};
                `}
              >
                {title}
              </Text>
            </div>
          </div>
          <div>
            <DisputeStatus dispute={dispute} />
          </div>
        </div>

        <div
          css={`
            display: grid;
            grid-template-columns: 1fr minmax(250px, auto);
            grid-gap: ${5 * GU}px;
            margin-bottom: ${2 * GU}px;
          `}
        >
          <div>
            <h2
              css={`
                ${textStyle('label2')};
                color: ${theme.surfaceContentSecondary};
                margin-bottom: ${2 * GU}px;
              `}
            >
              Description
            </h2>
            <Text
              css={`
                ${textStyle('body2')};
              `}
            >
              {description}
            </Text>
          </div>
          <div>
            <h2
              css={`
                ${textStyle('label2')};
                color: ${theme.surfaceContentSecondary};
                margin-bottom: ${2 * GU}px;
              `}
            >
              Claimant
            </h2>
            <div
              css={`
                display: flex;
                align-items: flex-start;
              `}
            >
              <IdentityBadge
                // connectedAccount={addressesEqual(creator, connectedAccount)}
                entity={claimant}
              />
            </div>
          </div>
        </div>
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr minmax(250px, auto);
            margin-bottom: ${5 * GU}px;
          `}
        >
          <div>
            <span
              css={`
                ${textStyle('label2')}
                color: ${theme.contentSecondary};
                font-weight: 200;
                display: block;
                margin-bottom: ${1.5 * GU}px;
              `}
            >
              ARBITRATION AGREEMENT
            </span>
            <Text
              css={`
                display: inline-block;
                ${textStyle('body2')};
              `}
            >
              { `Apple Inc - Consenso Corp agreement`}
            </Text>
          </div>


          <div>
            <span
              css={`
                ${textStyle('label2')}
                color: ${theme.contentSecondary};
                font-weight: 200;
                display: block;
                margin-bottom: ${1.5 * GU}px;
              `}
            >
              Respondent
            </span>
            <IdentityBadge
              // connectedAccount={addressesEqual(creator, connectedAccount)}
              entity={respondent}
            />
          </div>

        </div>
        <Button
          mode="strong"
          onClick={() => {}}
          wide
          css={`
            background: ${theme.selected};
          `}
        >
          PERFORM ACTION
        </Button>
      </section>
    </Box>
  )
}

export default DisputeInfo
