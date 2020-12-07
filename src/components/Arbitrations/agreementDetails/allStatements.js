import React, { useEffect, useState } from 'react';
// import { AgreementContext } from './Contexts';

import { useTheme, Accordion, LoadingRing } from '@aragon/ui';
import { Skeleton } from 'antd';

import AllAgreementStatements from './allDetailCards/AllAgreementStatements';

import { getAllStatements } from '../../../lib/contracts/SPC';
import AllProcedureStatements from './allDetailCards/AllProcedureStatements';

function AllStatements({ groupId, contractAddress, NODE, account }) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function getDetails() {
      try {
        if (Object.keys(account).length) {
          setLoading(true);
          const details = await getAllStatements(
            NODE,
            contractAddress,
            groupId,
            account
          );
          console.log('Statement DETAILS:', details);
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
        </>
      ) : details && details[0].length >= 1 ? (
        details[0].map((value) => (
          <Accordion
            accordion
            items={[
              [
                'Procedure Statements',
                [
                  <AllProcedureStatements
                    seat={value.seat}
                    language={value.language}
                    createdBy={value.parties[0].name}
                    documentLocation={value.documentLocation}
                    documentName={value.documentName}
                    cipherKey={value.cipherKey}
                  />,
                ],
              ],
            ]}
          />
        ))
      ) : null}
      {details && details[1].length >= 1
        ? details[1].map((value) => {
            const heading = value.subject;
            return (
              <Accordion
                accordion
                items={[
                  [
                    heading,
                    [
                      <AllAgreementStatements
                        subject={value.subject}
                        stakeHolder={value.stakeholder}
                        statementType={value.statementType}
                        documentLocation={value.documentLocation}
                        documentName={value.documentName}
                        cipherKey={value.cipherKey}
                      />,
                    ],
                  ],
                ]}
              />
            );
          })
        : null}
    </>
  );
}

export default AllStatements;
