/* eslint-disable */
import React, { useState } from 'react'
import {
  Bar,
  Button,
  CardLayout,
  DateRangePicker,
  DropDown,
  IconRefresh,
  GU,
  Modal,
  Tabs,
  Tag,
  TextInput,
  textStyle,
  useTheme,
} from '@aragon/ui'

import '../../css/result.css'
import { Result, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 50, color: '#4d4cbb'}} spin />;

import { createAgreement, fetchAgreement } from '../../lib/contracts/Agreement.js'
import {useAccount} from '../../wallet/Account.js'

const accounts = require("../../wallet/keys");
const networks = require("../../wallet/network");

const NODES = Object.keys(networks).map(node => {return `${networks[node].host}:${networks[node].port}`})
import DisputeCard from './DisputeCard'

import ArbitrationCard from './ArbitrationCard.js'
import {fetchCount, increaseCounter} from "../../lib/contracts/Counter";

function ArbitrationList({ disputes, arbitrations, selectDispute }) {
  const theme = useTheme()
  const [selected, setSelected] = useState(0)
  const [agreementModal, setAgreementModal] = useState(false)
  const [agreementSubmit, setAgreementSubmit] = useState(false)

  const openAgreement = () => setAgreementModal(true)
  const closeAgreement = () => { setAgreementModal(false); setAgreementSubmit(false); setResult(false)}
  const createAgain = () => {setAgreementSubmit(false); setResult(false)}
  const walletAccount = useAccount()

  const {result, setResult, create} =  createAgreement(NODES[selected])
  const agreementDetails = fetchAgreement(NODES[selected], accounts[walletAccount.account])
  console.log(agreementDetails)


  return (
    <div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >

          <Modal visible={agreementModal} onClose={closeAgreement}>
              <div
                  style={{
                      fontSize: '1.5rem',
                      letterSpacing: '1px',
                      fontWeight: '900',
                      color: '#3D4857   ',
                      textAlign: 'center'
                  }}
              >
                  Create an Arbitration Agreement

              </div>

              {agreementSubmit ?
                  (
                      result ?
                      <Result
                      status="success"
                      title="Successfully created Arbitration Agreement!"
                      subTitle= {"Transaction ID: " + result.transactionHash}
                      extra={[
                          <Button  onClick={closeAgreement}>
                              Done
                          </Button>,
                          <Button style={{
                              backgroundColor: theme.selected,
                              color: 'white'
                          }} onClick={createAgain}>Create Again</Button>,
                      ]}
                  /> :
                  <div style={{textAlign: 'center', padding: '150px'}}>
                  <Spin indicator={antIcon}/>
                      <span> Submitting agreement</span>
                  </div>) :
                  <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 10,
                      borderColor: '#D9D9D9',
                      borderWidth: 'thin',
                      borderStyle: 'solid',
                      margin: '30px',
                      padding: '30px'
                  }}>

                      <div
                          style={{
                              display: 'flex',
                              flexDirection: 'row',
                              margin: '20px',
                              alignItems: 'center'
                          }}
                      >
                          <div
                              style={{flexBasis: '100%'}}
                          > Dispute Type:
                          </div>
                          <DropDown
                              style={{flexBasis: '100%', borderColor: '#D9D9D9'}}
                              items={['Existing', 'Future']}
                              selected={0}
                              // onChange={setAccount}
                          />
                      </div>

                      <div
                          style={{
                              display: 'flex',
                              flexDirection: 'row',
                              margin: '20px',
                              alignItems: 'center'
                          }}
                      >
                          <div
                              style={{flexBasis: '100%'}}
                          > Arbitration Seat:
                          </div>
                          <TextInput
                              style={{flexBasis: '100%'}}
                              value={'asd'}/>
                      </div>

                      <div
                          style={{
                              display: 'flex',
                              flexDirection: 'row',
                              margin: '20px',
                              alignItems: 'center'
                          }}
                      >
                          <div
                              style={{flexBasis: '100%'}}
                          > Arbitration Language:
                          </div>
                          <DropDown
                              style={{flexBasis: '100%', borderColor: '#D9D9D9'}}
                              items={['Existing', 'Future']}
                              selected={'Existing'}
                              // onChange={setAccount}
                          />
                      </div>

                      <div
                          style={{
                              display: 'flex',
                              flexDirection: 'row',
                              margin: '20px',
                              alignItems: 'center'
                          }}
                      >
                          <div
                              style={{flexBasis: '100%'}}
                          > Counter Party:
                          </div>
                          <DropDown
                              style={{flexBasis: '100%', borderColor: '#D9D9D9'}}
                              items={['Existing', 'Future']}
                              selected={'Existing'}
                              // onChange={setAccount}
                          />
                      </div>
                      <div
                          style={{
                              display: 'flex',
                              flexDirection: 'row',
                              margin: '20px',
                              alignItems: 'center'
                          }}
                      >
                          <div
                              style={{flexBasis: '100%'}}
                          > Agreement Document:
                          </div>
                          <TextInput
                              style={{flexBasis: '100%'}}
                              value={'asd'}/>
                      </div>

                      <Button label="SUBMIT" style={{
                          backgroundColor: theme.selected,
                          color: 'white'
                      }} onClick={() => {
                          setAgreementSubmit(true);
                          create(accounts[walletAccount.account])
                      }}/>

                  </div>
              }



          </Modal>
        <div />
        <div style={{ display: 'flex', marginTop: '1rem' }}>
          <div style={{ marginLeft: '0.5rem', marginRight: '0.25rem' }}>
            <Button
              label="+NEW AGREEMENT"
              onClick={() => {openAgreement()}}
            />
          </div>
          <div style={{ marginLeft: '0.25rem', marginRight: '0.5rem' }}>
            <Button
              label="+ ADD REQUEST"
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
              size="medium"
            />
          </p>
        </div>
      </div>

      <Tabs
        items={['All requests', 'My claims']}
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
            return (
              <DisputeCard
                key={dispute.id}
                dispute={dispute}
                selectDispute={selectDispute}
              />
            )
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
          )
        })
      )}
    </div>
  )
}

export default ArbitrationList
