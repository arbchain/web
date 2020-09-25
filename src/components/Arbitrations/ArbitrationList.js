import React, { useEffect, useState } from 'react';
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
import { getArbitrationDetails } from '../../lib/contracts/SPC';
import { useAccount } from '../../wallet/Account.js';
import { getProcedureAddress } from '../../lib/contracts/MasterContract';
import DisputeCard from './DisputeCard';

import ArbitrationCard from './ArbitrationCard.js';
import wallet from 'wallet-besu';

const Web3 = require('web3');
const accounts = require('../../wallet/keys');
const networks = require('../../wallet/network');

const web3 = new Web3();
const NODES = Object.keys(networks).map(node => {
  return `${networks[node].host}:${networks[node].port}`;
});

function ArbitrationList({ disputes, arbitrations, selectDispute }) {
  let data = null;
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const [agreementModal, setAgreementModal] = useState(false);
  const [arbitrationDetails, setArbitrationDetails] = useState([]);

  const openAgreement = () => setAgreementModal(true);

  const walletAccount = useAccount();
  
  useEffect(() => {
  
    async function load() { 
    try{
       //Fetching the password locally. Need a secure way to do this for prod
       const account = await wallet.login(localStorage.getItem('wpassword'));

       // Update the account context by using a callback function
       walletAccount.changeAccount({privateKey:account[0], orionPublicKey: localStorage.getItem('orionKey')});
      
    }catch(err) {
      return false
    }
  }
  load()
  
},[] )


  const { procedureAddress } = getProcedureAddress(
    NODES[selected],
    walletAccount.account
  )
  console.log(procedureAddress)

  useEffect(() => {
    async function agreementAddressCall(){
      try{
        if (procedureAddress.length) {
              let index = 0;
              let allDetails = [];
              while (index < parseInt(procedureAddress.length)) {
                const details = await getArbitrationDetails(
                  NODES[selected],
                  procedureAddress[index].procedureContractAddress,
                  procedureAddress[index].groupId,
                  walletAccount.account
                );
                allDetails.push(details)
                index++;
              }
              console.log(allDetails)
              setArbitrationDetails(allDetails)
          }

        
      }catch(err) {
        return false
      }
    }
    agreementAddressCall()
  }, [procedureAddress])

  try {
  console.log('Procedure Count', procedureAddress.length);
  console.log('Procedure Data', procedureAddress);

  console.log('All Arbitration Details', arbitrationDetails);
  }

  catch(err) {
    //pass
  }

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
          account={walletAccount.account}
          node={NODES[selected]}
        />
        <div />
        <div style={{ display: 'flex', marginTop: '1rem' }}>
          <div style={{ marginLeft: '0.5rem', marginRight: '0.25rem' }}>
            <Button
              label="+NEW AGREEMENT"
              onClick={() => {
                openAgreement();
              }}
            />
          </div>
          <div style={{ marginLeft: '0.25rem', marginRight: '0.5rem' }}>
            <Button
              label="+ ADD REQUEST"
              style={{ backgroundColor: theme.selected, color: 'white' }}
              onClick={() => console.log('clicked')}
            />
          </div>
          <p style={{ cursor: 'pointer' }} onClick={() => console.log('clicked')}>
            <IconRefresh
              css={`
                color: ${theme.selected};
              `}
              size="medium"
            />
          </p>
        </div>
      </div>

      <Tabs items={['All requests', 'My claims']} selected={selected} onChange={setSelected} />

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
            header="Status"
            placeholder="Status"
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
                  <Tag limitDigits={4} label={disputes.length} size="small" />
                </span>
              </div>,
              'Open',
              'Closed',
            ]}
            width="128px"
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
          {disputes.map(dispute => {
            return <DisputeCard key={dispute.id} dispute={dispute} selectDispute={selectDispute} />;
          })}
        </CardLayout>
      ) : (
        arbitrations.map(arbitration => {
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
