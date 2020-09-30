import React, { useState } from 'react';
import {
  Bar,
  Button,
  CardLayout,
  DateRangePicker,
  DropDown,
  IconRefresh,
  GU,
  Tabs,
  Tag,
  textStyle,
  useTheme,
} from '@aragon/ui';

import AgreementForm from './modals/AgreementForm';
import ProcedureForm from './modals/ProcedureForm';

import { fetchAgreement } from '../../lib/contracts/Agreement.js';
import { useAccount } from '../../wallet/Account.js';
import DisputeCard from './DisputeCard';

import ArbitrationCard from './ArbitrationCard.js';

const accounts = require('../../wallet/keys');
const networks = require('../../wallet/network');

const NODES = Object.keys(networks).map((node) => {
  return `${networks[node].host}:${networks[node].port}`;
});

function ArbitrationList({ disputes, arbitrations, selectDispute }) {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const [agreementModal, setAgreementModal] = useState(false);
  const [procedureModal, setProcedureModal] = useState(false);

  const openAgreement = () => setAgreementModal(true);

  const openProcedure = () => setProcedureModal(true);
  const walletAccount = useAccount();

  const agreementDetails = fetchAgreement(
    NODES[selected],
    accounts[walletAccount.account]
  );
  console.log(agreementDetails);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <AgreementForm
          agreementModal={agreementModal}
          setAgreementModal={setAgreementModal}
          account={accounts[walletAccount.account]}
          node={NODES[selected]}
        />
        <div />
        {/* procedure modal */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <ProcedureForm
            procedureModal={procedureModal}
            setProcedureModal={setProcedureModal}
          />
        </div>

        <div style={{ display: 'flex', marginTop: '1rem' }}>
          <div style={{ marginLeft: '0.5rem' }}>
            <Button
              label='+NEW PROCEDURE'
              onClick={() => {
                openProcedure();
              }}
            />
          </div>

          <div style={{ marginLeft: '0.5rem', marginRight: '0.25rem' }}>
            <Button
              label='+NEW AGREEMENT'
              onClick={() => {
                openAgreement();
              }}
            />
          </div>
          <div style={{ marginLeft: '0.25rem', marginRight: '0.5rem' }}>
            <Button
              label='+ ADD REQUEST'
              style={{ backgroundColor: theme.selected, color: 'white' }}
              onClick={() => console.log('clicked')}
            />
          </div>
          <p
            style={{ cursor: 'pointer' }}
            onClick={() => console.log('clicked')}
          >
            <IconRefresh
              css={`
                color: ${theme.selected};
              `}
              size='medium'
            />
          </p>
        </div>
      </div>

      <Tabs
        items={['All requests', 'My claims', 'Agreement Details']}
        selected={selected}
        onChange={setSelected}
      />

      <Bar>
        <div
          css={`
            height: ${8 * GU}px;
            display: grid;
            grid-template-columns: auto auto 1fr auto;
            grid-gap: ${1 * GU}px;
            align-items: center;
            padding: 0 ${3 * GU}px;
          `}
        >
          <DropDown
            header='Status'
            placeholder='Status'
            // selected={disputeStatusFilter}
            // onChange={handleDisputeStatusFilterChange}
            items={[
              // eslint-disable-next-line
              <div>
                All
                <span
                  css={`
                    margin-left: ${1.5 * GU}px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: ${theme.info};
                    ${textStyle('label3')};
                  `}
                >
                  <Tag limitDigits={4} label={disputes.length} size='small' />
                </span>
              </div>,
              'Open',
              'Closed',
            ]}
            width='128px'
          />
          <DateRangePicker
          // startDate={disputeDateRangeFilter.start}
          // endDate={disputeDateRangeFilter.end}
          // onChange={handleDisputeDateRangeFilterChange}
          />
          {/* <Button>My disputes</Button> */}
        </div>
      </Bar>

      {selected ? (
        <CardLayout columnWidthMin={30 * GU} rowHeight={307}>
          {disputes.map((dispute) => {
            return (
              <DisputeCard
                key={dispute.id}
                dispute={dispute}
                selectDispute={selectDispute}
              />
            );
          })}
        </CardLayout>
      ) : (
        arbitrations.map((arbitration) => {
          return (
            <ArbitrationCard
              key={arbitration.id}
              arbitration={arbitration}
              selectDispute={selectDispute}
            />
          );
        })
      )}
    </div>
  );
}

export default ArbitrationList;
