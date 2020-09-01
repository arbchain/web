/* eslint-disable */
// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Web3Contract } from '../../utils/web3-contracts'

const ContractAbi = require('../../build/ArbitrationAgreement_abi.json')
const Web3 = require('web3')
const ContractBin = require('../../build/ArbitrationAgreement_bin.json').binary
const ContractReceipt = {
  contractAddress: '0x7095807ac6a7d58035e2750eaa3bfd90146c461d',
  privacyGroupId: "afOSOq5kUQQOdVMcWvxqwUUzvs3eHhayT8LMnqARNz8="
}
const web3Contract = new Web3Contract()

export function createAgreement(nodeSelected) {
  // eslint-disable-next-line no-unused-vars
  const [connected, setConnected] = useState(false)
  const [result, setResult] = useState(false)

  const create = useCallback(
    async (account, args) => {
      setConnected(await web3Contract.connect(nodeSelected))
      setResult(
        await web3Contract.deploy(
          ContractAbi,
          ContractBin,
            args,
          [],
          account
        )
      )
    },
    [nodeSelected]
  )

  return { result, setResult, create }
}

export function useContract(nodeSelected) {
  const [connected, setConnected] = useState(false)

  useMemo(async () => {
    setConnected(await web3Contract.connect(nodeSelected))
    await web3Contract.create(
      ContractAbi,
      ContractReceipt.contractAddress,
      [],
      ContractReceipt.privacyGroupId
    )
  }, [nodeSelected])

  return { connected }
}

export function fetchAgreement(nodeSelected, account) {
  const { connected } = useContract(nodeSelected)
  const [count, setCount] = useState(0)

  useEffect(() => {
    async function agreementCall() {
      try {
        if (connected) {
          const c = await web3Contract.call('agreementDetails', [], account)
          setCount(c)
        }
      } catch (err) {
        return false
      }
    }
    agreementCall()
  }, [connected, account])

  return count
}
