import React from 'react';
import { BackButton, Bar, Box, Split } from '@aragon/ui';

import DisputeInfo from './DisputeInfo';
import DisputeEvidences from './DisputeEvidences';
import DisputeTimeline from './DisputeTimeline';

function ArbitrationDetail({ arbitration, onBack }) {
  return (
    <React.Fragment>
      <Bar>
        <BackButton onClick={onBack} />
      </Bar>

      <Split
        primary={
          <React.Fragment>
            <DisputeInfo dispute={arbitration} />
            {arbitration.arguments && <DisputeEvidences evidences={arbitration.arguments} />}
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Box heading="Voting results">Results</Box>
            <Box heading="Dispute timeline" padding={0}>
              <DisputeTimeline />
            </Box>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}

export default ArbitrationDetail;
