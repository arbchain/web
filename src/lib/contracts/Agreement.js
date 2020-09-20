/* eslint-disable */
// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Web3Contract } from '../../utils/web3-contracts'

const ContractAbi = require('../../build/ArbitrationAgreement_abi.json')
const Web3 = require('web3')
const ContractBin = require('../../build/ArbitrationAgreement_bin.json').binary
// const ContractReceipt = {
//   contractAddress: "0xd76efda45bf931b15b5050749e95e3fc57392a31",
//   privacyGroupId: "guiCcLZ+dt2YFUTRxEZLpb2itJItxc26f7r1nDlpJBk="
// }
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

export function useContract(nodeSelected, contractAddress, privacyGroupId) {
  const [connected, setConnected] = useState(false)

  useMemo(async () => {
    setConnected(await web3Contract.connect(nodeSelected))
    await web3Contract.create(
      ContractAbi,
      contractAddress,
      [],
      privacyGroupId
    )
  }, [nodeSelected])

  return { connected }
}

export function fetchAgreement(nodeSelected, contractAddress, privacyGroupId, account) {
  const { connected } = useContract(nodeSelected, contractAddress, privacyGroupId)
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
