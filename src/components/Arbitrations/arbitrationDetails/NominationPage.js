import React, { useEffect, useState } from 'react';
import NominateArbitrator from './NominateArbitrator';
import NominateWitness from './NominateWitness';
import Proposal from './allDetailCards/Proposal';
import { getAllProposals } from '../../../lib/contracts/SPC';

function NominationPage({ groupId, contractAddress, NODE, account, role, details, arbitrator }) {
  const [loading, setLoading] = useState(true);
  const [proposals, setDetails] = useState(null);

  useEffect(() => {
    async function getDetails() {
      try {
        if (Object.keys(account).length) {
          setLoading(true);
          const res = await getAllProposals(NODE, contractAddress, groupId, account);
          console.log('Proposals DETAILS:', res);
          // There is an addition call being made that replaces the details. A quick fix
          if (res) {
            setDetails(res);
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
        currentStage={details ? parseInt(details[4]) : null}
        userRole={role}
        contractAddress={contractAddress}
        groupId={groupId}
        account={account}
        node={NODE}
        arbitrator={arbitrator}
      />
      {
        <NominateArbitrator
          contractAddress={contractAddress}
          groupId={groupId}
          NODE={NODE}
          account={account}
          nominatedArbitrator={
            proposals
              ? proposals[0].map((proposal, index) => ({
                  key: index,
                  arbitrator: proposal.arbitrator,
                  party: proposal.party,
                }))
              : []
          }
          loading={loading}
        />
      }

      {
        <NominateWitness
          contractAddress={contractAddress}
          groupId={groupId}
          NODE={NODE}
          account={account}
          nominatedWitness={proposals ? proposals[1] : []}
          loading={loading}
        />
      }
    </>
  );
}

export default NominationPage;
