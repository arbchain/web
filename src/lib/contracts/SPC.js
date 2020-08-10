import {useCallback, useEffect, useMemo, useState} from "react";
import {Web3Contract} from "../../utils/web3-contracts";
const fs = require("fs");
const path = require("path");
const SPC_ContractAbi = require("../../build/SPC.json");
const SPC_ContractBin = fs.readFileSync("../../build/SPC.bin");

const web3Contract = new Web3Contract()

//Deploy function later

export function useContract(nodeSelected) {
    const [connected, setConnected] = useState(false)

    useMemo( async() => {
        setConnected(await web3Contract.connect(nodeSelected))
        let result = await web3Contract.deploy(SPC_ContractAbi, SPC_ContractBin, [], account)
        await web3Contract.create(SPC_ContractAbi, result.contractAddress, [], result.privacyGroupId )
    },[nodeSelected])

    return {connected}
}

export function createArbitrationResponse(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const arbitrationResponseCreation = useCallback (
        async(documentHash, documentIpfsHash, monetaryAmount, crossClaim, requestId, claimId, account) => {
            return web3Contract.call("createArbitrationResponse", 
            [documentHash, documentIpfsHash, monetaryAmount, crossClaim, requestId, claimId],account)
    }, [connected])

    return {connected, arbitrationResponseCreation}
}

export function createClaim(nodeSelected) {

    let {connected} = useContract(nodeSelected)

    const claimCreation = useCallback( async(claimId, respondent, documentHash, documentIpfsHash, description,account) => {
        return web3Contract.call("createClaim",[claimId, respondent, documentHash, documentIpfsHash, description],account)
    },[connected])

    return {connected, claimCreation}
}

export function createProcedureStatement(nodeSelected){

    let {connected} = useContract(nodeSelected)

    const procedureStatementCreation = useCallback( async(parties, seat, language, documentIpfsHash, documentHash, account) =>{
        return web3Contract.call("createProcedureStatement",[parties, seat, language, documentIpfsHash, documentHash], account)
    }, [connected])

    return {connected, procedureStatementCreation}
}

export function appointArbitrator(nodeSelected) {
    
    let {connected} = useContract(nodeSelected);

    const appointment = useCallback(
        async ( arbitratorAddress, requestId, account ) => {
            return web3Contract.call('appointArbitrator', [arbitratorAddress, requestId], account)
        },
        [connected]
    )
    return {connected, appointment}
}

export function challengeAppointment(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const challenge = useCallback(
        async(arbitratorAddress, reason, account) => {
            return web3Contract.call('challengeAppointment',[arbitratorAddress, reason], account)
        },
        [connected]
    )
    return {connected, challenge}
}

export function revokeArbitrator(nodeSelected) {
     
    let {connected} = useContract(nodeSelected);

    const revoke = useCallback(
        async(challengeIndex, account) => {
            return web3Contract.call('revokeArbitrator', [challengeIndex], account)
        },
        [connected]
    )
    return {connected, revoke}
}

export function createStatement(nodeSelected) {
     
    let {connected} = useContract(nodeSelected);

    const statementCreation = useCallback( async(parties, stakeholder, statementType, subject, documentHash, documentIpfsHash, account) => {
            return web3Contract.call('createStatement', [parties, stakeholder, statementType, subject, documentHash, documentIpfsHash], account)
        },
        [connected]
    )
    return {connected, statementCreation}
}

export function submitWitness(nodeSelected) {
     
    let {connected} = useContract(nodeSelected);

    const witnessSubmission = useCallback( async(witnessAddress, account) => {
            return web3Contract.call('submitWitness', [witnessAddress], account)
        },
        [connected]
    )
    return {connected, witnessSubmission}
}

export function appointExpert(nodeSelected) {
     
    let {connected} = useContract(nodeSelected);

    const expertAppointment = useCallback( async(expertAddress, requestId, account) => {
            return web3Contract.call('appointExpert', [expertAddress, requestId], account)
        },
        [connected]
    )
    return {connected, expertAppointment}
}

export function issueAward(nodeSelected) {
     
    let {connected} = useContract(nodeSelected);

    const expertAppointment = useCallback( async(name, requestId, documentHash, account) => {
            return web3Contract.call('issueAward', [name, requestId, documentHash], account)
        },
        [connected]
    )
    return {connected, expertAppointment}
}

export function signDocuments(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const documentSign = useCallback(async(document, account) => {
        return web3Contract.documentSigning("signDocuments", [document], account)
    }, [connected])

    return {connected, documentSign}
}

export function agreeProcedureStatement(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const procedureStatementSigning = useCallback( async(document, account) => {
        return web3Contract.documentSigning("agreeProcedureStatement", [document], account)
    }, [connected])

    return {connected, procedureStatementSigning}
}

//To add isDocumentSigned.

export function depositCost(nodeSelected) {
     
    let {connected} = useContract(nodeSelected);

    const costDeposit = useCallback( async(cost, account) => {
            return web3Contract.call('depositCost', [cost], account)
        },
        [connected]
    )
    return {connected, costDeposit}
}

export function setSeat(nodeSelected) {
     
    let {connected} = useContract(nodeSelected);

    const seatSelection = useCallback( async(seat, account) => {
            return web3Contract.call('setSeat', [seat], account)
        },
        [connected]
    )
    return {connected, seatSelection}
}

export function setLanguage(nodeSelected) {
     
    let {connected} = useContract(nodeSelected);

    const languageSelection = useCallback( async(language, account) => {
            return web3Contract.call('setLanguage', [language], account)
        },
        [connected]
    )
    return {connected, languageSelection}
}

export function getArbitratorLength(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const arbitratiorLength = useCallback( async(account) => {
        return web3Contract.call('getArbitratorLength',[], account)
    },[connected])

    return {connected, arbitratiorLength}
}

export function getResponseLength(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const responseLength = useCallback( async(account) => {
        return web3Contract.call('getResponseLength',[], account)
    },[connected])

    return {connected, responseLength}
}

export function getTotalProcedureStatements(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const totalProcedureStatements = useCallback( async(userAddress, account) => {
        return web3Contract.call('getTotalProcedureStatements',[userAddress], account)
    },[connected])

    return {connected, totalProcedureStatements}
}

export function witnessLength(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const witnesslength = useCallback( async(account) => {
        return web3Contract.call('witnessLength',[], account)
    },[connected])

    return {connected, witnesslength}
}

export function awardsLength(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const awardslength = useCallback( async(account) => {
        return web3Contract.call('awardsLength',[], account)
    },[connected])

    return {connected, awardslength}
}

export function getTotalClaims(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const totalClaims = useCallback( async(userAddress,account) => {
        return web3Contract.call('getTotalClaims',[userAddress], account)
    },[connected])

    return {connected, totalClaims}
}

export function getTotalStatements(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const totalStatements = useCallback( async(userAddress,account) => {
        return web3Contract.call('getTotalStatements',[userAddress], account)
    },[connected])

    return {connected, totalStatements}
}

//Getter functions

export function arbitrationCost(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const getArbitrationCost = useCallback( async(account) => {
        return web3Contract.call('arbitrationCost',[], account)
    },[connected])

    return {connected, getArbitrationCost}
}

export function arbitrationCost(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const getArbitrationCost = useCallback( async(account) => {
        return web3Contract.call('arbitrationCost',[], account)
    },[connected])

    return {connected, getArbitrationCost}
}

export function arbitrationResponseArray(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const getArbitrationResponse = useCallback( async(index, account) => {
        return web3Contract.call('arbitrationResponseArray',[index], account)
    },[connected])

    return {connected, getArbitrationResponse}
}

export function arbitratorAddressArray(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const getArbitratorAddress = useCallback( async(index, account) => {
        return web3Contract.call('arbitratorAddressArray',[index], account)
    },[connected])

    return {connected, getArbitratorAddress}
}

export function arbitrators(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const getArbitrator = useCallback( async(arbitratorAddress, account) => {
        return web3Contract.call('arbitrators',[arbitratorAddress], account)
    },[connected])

    return {connected, getArbitrator}
}

export function awards(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const getAwards = useCallback( async(index, account) => {
        return web3Contract.call('awards',[index], account)
    },[connected])

    return {connected, getAwards}
}

export function challenges(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const getChallenges = useCallback( async(index, account) => {
        return web3Contract.call('challenges',[index], account)
    },[connected])

    return {connected, getChallenges}
}

export function claims(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const getClaims = useCallback( async(userAddress, index, account) => {
        return web3Contract.call('claims',[userAddress, index], account)
    },[connected])

    return {connected, getClaims}
}

export function procedureStatement(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const getProcedureStatment = useCallback( async(userAddress, index, account) => {
        return web3Contract.call('procedureStatement',[userAddress, index], account)
    },[connected])

    return {connected, getProcedureStatment}
}

export function statements(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const getStatment = useCallback( async(userAddress, index, account) => {
        return web3Contract.call('statements',[userAddress, index], account)
    },[connected])

    return {connected, getStatment}
}

export function witness(nodeSelected) {

    let {connected} = useContract(nodeSelected);

    const getWitness = useCallback( async( index, account) => {
        return web3Contract.call('witness',[index], account)
    },[connected])

    return {connected, getWitness}
}