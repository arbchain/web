import React, { useEffect, useState } from 'react';
import {
  GU,
  textStyle,
  useTheme,
  IconChat,
  IconFolder,
  IconFlag,
  IconGroup,
  IconFundraising,
  EmptyStateCard,
} from '@aragon/ui';

import Stepper from '../Stepper';
import Step from '../Step';
import { Skeleton } from 'antd';

import { getTimeLine } from '../../lib/contracts/SPC';

function DisputeTimeline({ NODE, account, contractAddress, groupId }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeLine] = useState(null);
  const [stages, setStages] = useState(null);

  const getDate = value => {
    const date = new Date(parseInt(value) * 1000);
    return date.toDateString();
  };

  useEffect(() => {
    async function getDetails() {
      try {
        console.log(account);
        if (Object.keys(account).length) {
          setLoading(true);
          const res = await getTimeLine(NODE, contractAddress, groupId, account);
          // There is an addition call detailsbeing made that replaces the details. A quick fix
          if (res) {
            console.log(res);
            setTimeLine(res);
            setStages([
              {
                label: 'Aribtration Created',
                date: res[1],
                Icon: IconFundraising,
              },
              {
                label: 'Response Submitted',
                date: res[2],
                Icon: IconChat,
              },
              {
                label: 'Tribunal Formed',
                date: res[3],
                Icon: IconChat,
              },
              {
                label: 'Challenge Arbitrator',
                date: res[4],
                Icon: IconFolder,
              },
              {
                label: 'Arbitration Started',
                date: res[5],
                Icon: IconFlag,
              },
              {
                label: 'Nomination',
                date: res[6],
                Icon: IconGroup,
              },
              {
                label: 'Award',
                date: '',
                Icon: IconFlag,
              },
            ]);
          }
          setLoading(false);
        }
      } catch (err) {
        return false;
      }
    }
    setTimeout(() => {
      getDetails();
    }, 3000);
  }, [account]);

  // const arbitrationCreation = new Date(contractTime * 1000);

  return (
    <div>
        {loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : timeline ? ( 
          <Stepper
        lineColor={theme.surfaceIcon}
        lineTop={15}
        css={`
          padding: ${3 * GU}px 0;
        `}
      >
        {
          stages.map(({ label, date, Icon }, index) => {
            const active = parseInt(timeline[0]) === index;
            return (
              <Step
                key={index}
                active={active}
                stepPoint={
                  <div
                    css={`
                      background: ${active ? theme.selected : '#ECEFF4'};
                      border-radius: 80%;
                      padding: 10px;
                      position: relative;
                      z-index: 2;
                      display: inline-flex;
                    `}
                  >
                    <Icon color={active ? '#fff' : theme.surfaceIcon} />
                  </div>
                }
                content={
                  <div>
                    <div>
                      <span css={textStyle('body1')}>{label}</span>
                    </div>
                    <div>
                      <span
                        css={`
                          color: ${theme.contentSecondary};
                          opacity: 0.6;
                        `}
                      >
                        {parseInt(date) > 0 ? getDate(date) : ''}
                      </span>
                    </div>
                    {active && (
                      <div>
                        <span
                          css={`
                            ${textStyle('label3')}
                            text-transform: Uppercase;
                            background: rgba(200, 215, 234, 0.4);
                            border-radius: 100px;
                            padding: 5px 10px;
                          `}
                        >
                          current
                        </span>
                      </div>
                    )}
                  </div>
                }
              />
            );
          })
        }
        </Stepper> 
          ) : (
          <EmptyStateCard text="No Timeline details found." />
        )}
      
    </div>
  );
}

export default DisputeTimeline;
