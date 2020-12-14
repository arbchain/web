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
} from '@aragon/ui';

import Stepper from '../Stepper';
import Step from '../Step';

import { getTimeLine } from '../../lib/contracts/SPC';

function DisputeTimeline({ NODE, account, contractAddress, groupId }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeLine] = useState(null);
  const current = 4;

  // useEffect(() => {
  //   async function getDetails() {
  //     try {
  //       console.log(account);
  //       if (Object.keys(account).length) {
  //         setLoading(true);
  //         const res = await getTimeLine(NODE, contractAddress, groupId, account);
  //         // There is an addition call detailsbeing made that replaces the details. A quick fix
  //         if (res) {
  //           console.log(res);
  //           setTimeLine(res);
  //         }
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       return false;
  //     }
  //   }
  //   getDetails();
  // }, [account]);
  // const arbitrationCreation = new Date(contractTime * 1000);

  const stages = [
    {
      label: 'Aribtration Created',
      date: '20/11/2019',
      Icon: IconFundraising,
    },
    {
      label: 'Response Submitted',
      date: '20/11/2019',
      Icon: IconChat,
    },
    {
      label: 'Tribunal Formed',
      date: '20/11/2019',
      Icon: IconChat,
    },
    {
      label: 'Challenge Arbitrator',
      date: '20/11/2019',
      Icon: IconFolder,
    },
    {
      label: 'Nomination',
      date: '20/11/2019',
      Icon: IconGroup,
    },
    {
      label: 'Arbitration Started',
      date: '20/11/2019',
      Icon: IconFlag,
    },
    {
      label: 'Award',
      date: '20/11/2019',
      Icon: IconFlag,
    },
  ];

  return (
    <div>
      <Stepper
        lineColor={theme.surfaceIcon}
        lineTop={15}
        css={`
          padding: ${3 * GU}px 0;
        `}
      >
        {stages.map(({ label, date, Icon }, index) => {
          const active = current === index;
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
                      {date}
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
        })}
      </Stepper>
    </div>
  );
}

export default DisputeTimeline;
