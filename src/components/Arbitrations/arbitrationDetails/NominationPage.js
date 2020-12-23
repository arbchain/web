import React, { useEffect, useState } from 'react';
import NominateArbitrator from './NominateArbitrator';
import NominateWitness from './NominateWitness';
import Proposal from './allDetailCards/Proposal';
import { getAllProposals } from '../../../lib/contracts/SPC';

function NominationPage({ groupId, contractAddress, NODE, account }) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function getDetails() {
      try {
        if (Object.keys(account).length) {
          setLoading(true);
          const details = await getAllProposals(NODE, contractAddress, groupId, account);
          console.log('Proposals DETAILS:', details);
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
      <Proposal
        stage="hearing"
        role="respondant"
        contractAddress={contractAddress}
        groupId={groupId}
        account={account}
        node={NODE}
      />
      {
        <NominateArbitrator
          contractAddress={contractAddress}
          groupId={groupId}
          NODE={NODE}
          account={account}
          nominatedArbitrator={details ? details[0] : []}
          loading={loading}
        />
      }

      {
        <NominateWitness
          contractAddress={contractAddress}
          groupId={groupId}
          NODE={NODE}
          account={account}
          nominatedWitness={details ? details[1] : []}
          loading={loading}
        />
      }
    </>
  );
}

export default NominationPage;
