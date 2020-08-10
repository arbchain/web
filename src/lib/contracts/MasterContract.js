import {useCallback, useEffect, useMemo, useState} from "react";
import {Web3Contract} from "../../utils/web3-contracts";
const ContractAbi = require("../../build/MasterContract.json");
const ContractReceipt = require("../../build/MasterContract_receipt.json");

const web3Contract = new Web3Contract()

export function useContract(nodeSelected) {

    const [connected, setConnected] = useState(false)

    useMemo( async () => {

        setConnected(await web3Contract.connect(nodeSelected))
        await web3Contract.create(ContractAbi, ContractReceipt.contractAddress, [], ContractReceipt.privacyGroupId)
    }, [nodeSelected])

    return {connected}
}

export function createUser(nodeSelected) {

    let {connected} = useContract(nodeSelected)

    const create = useCallback( async(name, zipCode, contactNumber, orionPublicKey, role,account) => {
        return web3Contract.call('createUser', [name, zipCode, contactNumber, orionPublicKey, role], account)
    },[connected])

    return {connected, create}
}

export function createArbitrationRequest(nodeSelected) {

    let {connected} = useContract(nodeSelected)

    const arbitrationRequest = useCallback(async(respondantAddress, agreementContractAddress, documentHash, account) => {
        return web3Contract.call("createArbitrationRequest", [respondantAddress, agreementContractAddress, documentHash], account)
    },[connected])

    return {connected, arbitrationRequest}
}

export function getTotalRequests(nodeSelected) {

    let {connected} = useContract(nodeSelected)

    const totalRequests = useCallback( async(userAddress, account) => {
        return web3Contract.call("getTotalRequests", [], account)
    }, [connected])

    return {connected, totalRequests}
}

export function getUserData(nodeSelected) {

    let {connected} = useContract(nodeSelected)

    const userData = useCallback( async(userAddress, account) => {
        return web3Contract.call("userMap", [userAddress], account)
    }, [connected])

    return {connected, userData}
}

export function getRequests(nodeSelected) {

    let {connected} = useContract(nodeSelected)

    const requests = useCallback( async(userAddress, index, account) => {
        return web3Contract.call("requests", [userAddress, index], account)
    },[connected])

    return {connected, requests}
}

