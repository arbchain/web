import React, { useEffect, useState } from 'react';
import { Box, GU, Text, textStyle, useTheme, EmptyStateCard } from '@aragon/ui';
import { Skeleton } from 'antd';

import ArbitrationCardDispute from '../../../assets/ArbitrationCardDispute.svg';
import { getArbitrationDetails } from '../../../lib/contracts/SPC';
import Respond from './allDetailCards/Response';
import Statement from './allDetailCards/Statement';
import SectionWrapper, {
  Description,
  GridGroup,
  ProcedureDetails,
  Actions,
} from './styles';

import user from '../../../assets/icons/user.png';

import check from '../../../assets/icons/check.png';
import Button from '@aragon/ui/dist/Button';

function ArbDetails({
  groupId,
  contractAddress,
  NODE,
  account,
  caller,
  parties,
}) {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);

  const status = ['Open', 'Close'];

  useEffect(() => {
    async function getDetails() {
      try {
        console.log(account);
        if (Object.keys(account).length) {
          setLoading(true);
          const details = await getArbitrationDetails(
            NODE,
            contractAddress,
            groupId,
            account
          );
          // There is an addition call being made that replaces the details. A quick fix
          if (details) {
            setDetails(details);
          }
          setLoading(false);
        }
      } catch (err) {
        return false;
      }
    }
    getDetails();
  }, [account]);

  return (
    <>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : details ? (
        <>
          <Box>
            <SectionWrapper>
              <div className='title__container'>
                <div className='title__container-titleGroup'>
                  <img src={ArbitrationCardDispute} />

                  <Text className='title__heading'>{details[0]}</Text>
                </div>
                <div className='status'>
                  <h1>
                    <span default>{status[details[3]]}</span>
                  </h1>
                </div>
              </div>
              <Description>
                <h2>Description</h2>
                <Text className='description'>
                  {/* {details[1]} */}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  illo consequatur velit aspernatur iusto quos porro saepe rem
                  tenetur, labore aliquam iste aperiam reprehenderit non debitis
                  sint vel! Dolorum, ex.
                </Text>
              </Description>
              <GridGroup>
                <div className='claiment'>
                  <h2>Claiment</h2>
                  <Text className='description'>
                    {/* {details[1]} */}
                    Koushith
                  </Text>
                </div>
                <div className='respondant'>
                  <h2>Respondant</h2>
                  <Text className='description'>
                    {/* {details[1]} */}
                    Shubam
                  </Text>
                </div>
                <div className='agreement'>
                  <h2>Arbitration Agreement</h2>
                  <Text className='description'>
                    {/* {details[1]} */}
                    Rental
                  </Text>
                </div>
              </GridGroup>

              <ProcedureDetails>
                <div className='title__container-titleGroup'>
                  <h2 className='title__heading'>Procedure Status</h2>
                </div>
                <div className='status'>
                  <h1>
                    <span className='pro-status'>Pending</span>
                  </h1>
                </div>
              </ProcedureDetails>
              <div className='procedure-status'>
                <GridGroup>
                  <div className='claiment'>
                    <h2>CREATED ON</h2>
                    <Text className='description mb-6'>
                      {/* {details[1]} */}
                      24-12-2020
                    </Text>
                  </div>
                  <div className='respondant'>
                    <h2>selected language</h2>
                    <Text className='description mb-6'>
                      {/* {details[1]} */}
                      English
                    </Text>
                  </div>
                  <div className='agreement'>
                    <h2>selected arbitration seat</h2>
                    <Text className='description mb-6'>
                      {/* {details[1]} */}
                      London
                    </Text>
                  </div>
                  <div className='agreement '>
                    <h2>Signed On</h2>
                    <Text className='description mb-6'>
                      {/* {details[1]} */}
                      {/* conditional rendering for color */}
                      pending
                    </Text>
                  </div>
                  <div className='agreement'>
                    <h2>Attached Documents</h2>
                    <Text className='description mb-6'>
                      {/* {details[1]} */}
                      docs.png
                    </Text>
                  </div>
                </GridGroup>

                {/* conditional rendering for buttons */}

                <Actions>
                  <Button className='btn success'>Accept</Button>
                  <Button className='btn error'>Reject</Button>
                </Actions>
              </div>
            </SectionWrapper>
          </Box>
        </>
      ) : (
        <EmptyStateCard width='100%' text='No arbitrations details found.' />
      )}
    </>
  );
}

export default ArbDetails;
