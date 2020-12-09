import React, {useEffect, useState} from 'react';
import NominateArbitrator from './NominateArbitrator';
import NominateWitness from './NominateWitness';
import {getAllProposals} from "../../../lib/contracts/SPC";

function NominationPage({groupId, contractAddress, NODE, account}) {

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function getDetails() {
      try {
        if (Object.keys(account).length) {
          setLoading(true);
          const details = await getAllProposals(
            NODE,
            contractAddress,
            groupId,
            account
          );
          console.log("Proposals DETAILS:",details)
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
      {
        details && details[0].length>=1 ? (
          <NominateArbitrator
            contractAddress={contractAddress}
            groupId={groupId}
            NODE={NODE}
            account={account}
            nominatedArbitrator={details[0]}
          />
        ) : (
          <NominateArbitrator
            contractAddress={contractAddress}
            groupId={groupId}
            NODE={NODE}
            account={account}
            nominatedArbitrator={[]}
          />
        )
      }

      {
        details && details[1].length>=1 ? (
          <NominateWitness
            contractAddress={contractAddress}
            groupId={groupId}
            NODE={NODE}
            account={account}
            nominatedWitness={details[1]}
          />
        ) : (
          <NominateWitness
            contractAddress={contractAddress}
            groupId={groupId}
            NODE={NODE}
            account={account}
            nominatedWitness={[]}
          />
        )
      }
    </>
  );
}

export default NominationPage;
