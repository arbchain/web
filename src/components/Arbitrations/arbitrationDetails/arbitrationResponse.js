import React from 'react';
import {
  Box,
  GU,
  Text,
  textStyle,
  useTheme,
  EmptyStateCard,
  IconWarning,
  IconUser,
  IconFile,
} from '@aragon/ui';

import SectionWrapper, {
  Description,
  GridGroup,
  ProcedureDetails,
  Actions,
  Info,
  SubmittedResponse,
} from './styles';

function arbitrationResponse() {
  return (
    <>
      <SubmittedResponse>
        <div className='heading-container'>
          <h2 className='title__heading'>Submitted Response</h2>
          <h1>Submitted On -Date-</h1>
        </div>

        <div className='summary'>
          <h2>Summary</h2>
          <Text className='description' style={{ fontSize: '16px' }}>
            {/* {details[1]} */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias illo
            consequatur velit aspernatur iusto quos porro saepe rem tenetur,
            labore aliquam iste aperiam reprehenderit non debitis sint vel!
            Dolorum, ex.
          </Text>

          <GridGroup>
            <div className='attachment'>
              <h2>Attached Documents</h2>
              <Text className='description mb-6'>
                {/* {details[1]} */}
                docs.png
              </Text>
            </div>
          </GridGroup>
        </div>
      </SubmittedResponse>
    </>
  );
}

export default arbitrationResponse;
