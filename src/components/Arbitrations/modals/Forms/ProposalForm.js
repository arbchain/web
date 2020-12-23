import React, { useState } from 'react';
import { Button, SidePanel, useTheme, DropDown, LoadingRing } from '@aragon/ui';
import { nominateArbitrator, nominateWitness } from '../../../../lib/contracts/SPC';
import styled from 'styled-components';

const ProposalContainer = styled.div`
  margin-top: 18px;

  .inputGroups {
    margin-left: 0.5rem;
    margin-bottom: 22px;
    justify-content: center;
  }
  .upload {
    width: 100%;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  .DropDown {
    border-color: #d9d9d9;
  }
`;

const Panel = styled(SidePanel)`
  z-index: 50;
  width: 50%;
`;

function ProposalForm({ opened, setOpened, contractAddress, groupId, account, node }) {
  const theme = useTheme();

  const [proposalType, setProposalType] = useState(0);
  const [nominationType, setNominationType] = useState(0);
  const [nominationParty, setNominationParty] = useState(0);
  const [statementSubmitting, setStatementSubmitting] = useState(false);

  const { arbitratorNomination } = nominateArbitrator(node, contractAddress, groupId);
  const { witnessNomination } = nominateWitness(node, contractAddress, groupId);

  // Replace it with the dynamically fetched parties/ arbitrators/ witnesses
  const nominationParties = [
    '0xf17f52151EbEF6C7334FAD080c5704D77216b732',
    '0x84a0d77c693adabe0ebc48f88b3ffff010577051',
  ];

  const handleClick = async () => {
    setStatementSubmitting(true);
    if (nominationType === 0) {
      await arbitratorNomination(nominationParties[nominationParty], account);
    } else {
      await witnessNomination(nominationParties[nominationParty], account);
    }
    setStatementSubmitting(false);
    closePannel();
  };

  const closePannel = () => {
    setOpened(false);
  };
  return (
    <>
      <Panel title="Create a proposal" opened={opened} onClose={closePannel}>
        <ProposalContainer>
          <GridContainer>
            <div className="inputGroups ">
              <h3>Proposal Type</h3>
              <DropDown
                className="DropDown"
                wide
                items={['Nomination', 'Tribunal Challenge']}
                selected={proposalType}
                onChange={(index, items) => {
                  setProposalType(index);
                }}
              />
            </div>
          </GridContainer>
          {proposalType === 0 ? (
            <GridContainer>
              <div className="inputGroups ">
                <h3>Nomination Type</h3>
                <DropDown
                  className="DropDown"
                  wide
                  items={['Arbitration', 'Witness']}
                  selected={nominationType}
                  onChange={(index, items) => {
                    setNominationType(index);
                  }}
                />
              </div>
              <div className="inputGroups ">
                <h3>Select the party</h3>
                <DropDown
                  className="DropDown"
                  wide
                  items={nominationParties}
                  selected={nominationParty}
                  onChange={(index, items) => {
                    setNominationParty(index);
                  }}
                />
              </div>
            </GridContainer>
          ) : null}

          {!statementSubmitting ? (
            <>
              <Button
                label="SUBMIT"
                wide
                style={{
                  backgroundColor: theme.selected,
                  color: 'white',
                }}
                onClick={handleClick}
              />
            </>
          ) : (
            <>
              <Button
                label={
                  statementSubmitting ? (
                    <>
                      <LoadingRing />
                      SUBMITTING
                    </>
                  ) : (
                    'SUBMITTED'
                  )
                }
                wide
                style={{
                  backgroundColor: theme.selected,
                  color: 'white',
                }}
                onClick={handleClick}
              />{' '}
            </>
          )}
        </ProposalContainer>
      </Panel>
    </>
  );
}

export default ProposalForm;
