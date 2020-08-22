/* eslint-disable prettier/prettier */

import {
  DISPUTE_STATUS_OPEN,
  DISPUTE_STATUS_CLOSED,
} from './dispute-status-type'

import {
  IconChat,
  IconFolder,
  IconFlag,
  IconGroup,
  IconFundraising,
} from '@aragon/ui'

import DAIIcon from './assets/dai.svg'
import ANTIcon from './assets/ant.svg'
import ANJIcon from './assets/anj.svg'

export const balances = {
  wallet: [
    { amount: '3.304,76', tokenSymbol: 'DAI', value: '3.300', icon: DAIIcon },
    { amount: '3.304,76', tokenSymbol: 'ANT', value: '3.300', icon: ANTIcon },
  ],
  staked: [
    { amount: '3.304,76', tokenSymbol: 'ANJ', value: '3.300', icon: ANJIcon },
  ],
  active: [
    { amount: '3.304,76', tokenSymbol: 'ANJ', value: '3.300', icon: ANJIcon },
  ],
  rewards: [
    { amount: '3.304,76', tokenSymbol: 'DAI', value: '3.300', icon: DAIIcon },
    { amount: '3.304,76', tokenSymbol: 'ANJ', value: '3.300', icon: ANJIcon },
  ],
}

export const latestActivity = [
  {
    account: '0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb',
    action: 'Started',
    target: { label: 'review evidence', link: 'url' },
    date: '26/11/19 AT 16:00',
  },
  {
    account: '0xb4124cEB3451635DAcedd11767f004d8a28c6eE7',
    action: 'Comitted their',
    target: { label: 'vote', link: 'url' },
    date: '26/11/19 AT 16:00',
  },
  {
    account: '0x49C01b61Aa3e4cD4C4763c78EcFE75888b49ef50',
    action: 'Executed',
    target: { label: 'ruling', link: 'url' },
    date: '26/11/19 AT 16:00',
  },
]

export const arbitrations = [
  {
    id: 0,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    status: DISPUTE_STATUS_OPEN,
    title: 'Consenso Corp project delivery dispute',
    creator: '0xb4124cEB3451635DAcedd11767f004d8a28c6eE7',
    claimant: 'Consenso Labs',
    respondent: 'Apple Inc',
    arbitratorCount: 2,
    arguments: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.']
  },
  {
    id: 1,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    status: DISPUTE_STATUS_CLOSED,
    title: 'Microsoft patent dispute',
    creator: '0xb4124cEB3451635DAcedd11767f004d8a28c6eE7',
    claimant: 'Microsoft Inc',
    respondent: 'Samung Inc',
    arbitratorCount: 3,
    arguments: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.']
  },
  {
    id: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    status: DISPUTE_STATUS_CLOSED,
    title: 'Google design patent dispute',
    creator: '0xb4124cEB3451635DAcedd11767f004d8a28c6eE7',
    claimant: 'Google Inc',
    respondent: 'Facebook Inc',
    arbitratorCount: 2,
    arguments: [],
  },
  {
    id: 3,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    status: DISPUTE_STATUS_CLOSED,
    creator: '0xb4124cEB3451635DAcedd11767f004d8a28c6eE7',
    title: 'Google automobile patent dispute',
    claimant: 'Google Inc',
    respondent: 'Tesla Inc',
    arbitratorCount: 2,
    arguments: [],
  },
]

export const timeline = [
  {
    label: 'Award announced',
    date: '20/11/2019',
    Icon: IconFundraising,
  },
  {
    label: 'Expert hearing',
    date: '20/11/2019',
    Icon: IconChat,
  },
  {
    label: 'Witness hearing',
    date: '20/11/2019',
    Icon: IconChat,
  },
  {
    label: 'Arguments submitted',
    date: '20/11/2019',
    Icon: IconFolder,
  },
  {
    label: 'Tribunal created',
    date: '20/11/2019',
    Icon: IconGroup,
  },
  {
    label: 'Arbitration requested',
    date: '20/11/2019',
    Icon: IconFlag,
  },
]

export const tasks = [
  {
    taskName: 'Finish reviewing evidence',
    disputeId: 12,
    priority: 'High',
    juror: '0x593e1F9809658d0c92e9f092cF01Aad7D0d734f3',
    dueDate: 1575391948390,
  },
  {
    taskName: 'Reveal vote',
    disputeId: 15,
    priority: 'Medium',
    juror: '0x099278297012066d61c9505132b3Aa71F625E414',
    dueDate: 1575592000000,
  },
  {
    taskName: 'Start reviewing evidence',
    disputeId: 20,
    priority: 'Low',
    juror: '0x593e1F9809658d0c92e9f092cF01Aad7D0d734f3',
    dueDate: 1576393000000,
  },
  {
    taskName: 'Commit vote',
    disputeId: 14,
    priority: 'Medium',
    juror: '0x099278297012066d61c9505132b3Aa71F625E414',
    dueDate: 1575394000000,
  },
]
