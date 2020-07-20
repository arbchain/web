/* eslint-disable */
import {useCallback, useEffect, useMemo, useState} from "react";
import {Web3Contract} from "../../utils/web3-contracts";
const ContractAbi = require("../../build/Counter.json");
const ContractReceipt = require("../../build/Counter_receipt.json");

import { retryMax } from '../../utils/retry-max'

const Web3 = require("web3");
const EEAClient = require("web3-besu");

const web3Contract = new Web3Contract()


    export function useContract(nodeSelected) {

        const [connected, setConnected] = useState(false)

        useMemo( async () => {

            setConnected(await web3Contract.connect(nodeSelected))
            await web3Contract.create(ContractAbi, ContractReceipt.contractAddress, [], ContractReceipt.privacyGroupId)
        }, [nodeSelected])

        return {connected}
    }

    export function increaseCounter(nodeSelected) {

        let {connected} = useContract(nodeSelected)

        const increase = useCallback(
            async ( amount, account )=> {

                    return web3Contract.call('increaseCounter', [amount], account)
            },
            [connected]
        )

        return {connected, increase}

    }

    export async function fetchCount(nodeSelected, account) {

     let {connected} = useContract(nodeSelected)

        if (connected) {
            return await web3Contract.call('getCounter', [], account)
        }

    }

