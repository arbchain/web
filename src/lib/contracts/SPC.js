/* eslint-disable valid-jsdoc */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Web3Contract } from '../../utils/web3-contracts';

const ContractAbi = require('../../build/SPC_abi.json');
const Web3 = require('web3');
const ContractBin = require('../../build/SPC_bin.json').binary;
const ContractReceipt = {
  contractAddress: '0x5b085b1F8D1E34eA6e5faFAb493BF1928E8616A3',
  privacyGroupId: 'cDnHhTvlbrEIyBYoBqLEVE8klhamMel2oR3Sm3zDWSU=',
};
const web3Contract = new Web3Contract();

/**
 * contract deployment
 *
 */

export function deployProcedureContract(nodeSelected) {
  const [connected, setConnected] = useState(false);
  const [resultProcedureContract, setResultProcedure] = useState(false);

  const createProcedureContract = useCallback(
    async (account, args) => {
      setConnected(await web3Contract.connect(nodeSelected));
      setResultProcedure(await web3Contract.deploy(ContractAbi, ContractBin, args, [], account));
    },
    [nodeSelected]
  );
  return { resultProcedureContract, setResultProcedure, createProcedureContract };
}

export function useContract(nodeSelected, contractAddress, privacyGroupId) {
  const [connected, setConnected] = useState(false);

  useMemo(async () => {
    setConnected(await web3Contract.connect(nodeSelected));

    await web3Contract.create(ContractAbi, contractAddress, [], privacyGroupId);
  }, [nodeSelected]);

  return { connected };
}

/**
 * Function 1: createArbitrationResponse
 */
export function createArbitrationResponse(nodeSelected, contractAddress, privacyGroupId) {
  const { connected } = useContract(nodeSelected, contractAddress, privacyGroupId);

  const arbitrationResponseCreation = useCallback(
    async (
      documentHash,
      documentIpfsHash,
      monetaryAmount,
      crossClaim,
      requestId,
      claimId,
      account
    ) => {
      return web3Contract.call(
        'createArbitrationResponse',
        [documentHash, documentIpfsHash, monetaryAmount, crossClaim, requestId, claimId],
        account
      );
    },
    [connected]
  );

  return { connected, arbitrationResponseCreation };
}

/**
 * Function 2: createClain
 */
export function createClaim(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const claimCreation = useCallback(
    async (claimId, respondent, documentHash, documentIpfsHash, description, account) => {
      return web3Contract.call(
        'createClaim',
        [claimId, respondent, documentHash, documentIpfsHash, description],
        account
      );
    },
    [connected]
  );

  return { connected, claimCreation };
}

/**
 * Function 3: createProcedureStatement
 */
export function createProcedureStatement(nodeSelected, contractAddress, privacyGroupId) {
  const { connected } = useContract(nodeSelected, contractAddress, privacyGroupId);

  const procedureStatementCreation = useCallback(
    async (parties, seat, language, documentIpfsHash, documentHash, account) => {
      const res = await web3Contract.call(
        'createProcedureStatement',
        [parties, seat, language, documentIpfsHash, documentHash],
        account
      );
      console.log('RES:', res);
    },
    [connected]
  );

  return { connected, procedureStatementCreation };
}

/**
 * Function 4: nominateArbitrator
 */
export function nominateArbitrator(nodeSelected, contractAddress, privacyGroupId) {
  const { connected } = useContract(nodeSelected, contractAddress, privacyGroupId);

  const arbitratorNomination = useCallback(
    async (arbitratorAddress, account) => {
      const res = await web3Contract.call('nominateArbitrator', [arbitratorAddress], account);
      console.log("Nominate res:",res)
    },
    [connected]
  );
  return { connected, arbitratorNomination };
}

/**
 * Function 5: appointArbitrator
 */
export function appointArbitrator(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const arbitratorAppointment = useCallback(
    async (arbitratorAddress, requestId, account) => {
      return web3Contract.call('appointArbitrator', [arbitratorAddress, requestId], account);
    },
    [connected]
  );
  return { connected, arbitratorAppointment };
}

/**
 * Function 6: challengeAppointment
 */
export function challengeAppointment(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const appointmentChallenge = useCallback(
    async (arbitratorAddress, reason, account) => {
      return web3Contract.call('challengeAppointment', [arbitratorAddress, reason], account);
    },
    [connected]
  );
  return { connected, appointmentChallenge };
}

/**
 * Function 7: revokeArbitrator
 */
export function revokeArbitrator(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const revoke = useCallback(
    async (challengeIndex, account) => {
      return web3Contract.call('revokeArbitrator', [challengeIndex], account);
    },
    [connected]
  );
  return { connected, revoke };
}

/**
 * Function 8: createStatement
 */
export function createStatement(nodeSelected, contractAddress, privacyGroupId) {
  const { connected } = useContract(nodeSelected, contractAddress, privacyGroupId);

  const statementCreation = useCallback(
    async (
      parties,
      stakeholder,
      statementType,
      subject,
      documentHash,
      documentIpfsHash,
      account
    ) => {
      // const docHash = Web3.utils.fromAscii(documentHash)
      const res = await web3Contract.call(
        'createStatement',
        [parties, stakeholder, statementType, subject, documentHash, documentIpfsHash],
        account
      );
      console.log('RES:', res);
    },
    [connected]
  );
  return { connected, statementCreation };
}

/**
 * Function 9: submitWitness
 */
export function submitWitness(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const witnessSubmission = useCallback(
    async (witnessAddress, account) => {
      return web3Contract.call('submitWitness', [witnessAddress], account);
    },
    [connected]
  );
  return { connected, witnessSubmission };
}

/**
 * Function 10: appointExpert
 */
export function appointExpert(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const expertAppointment = useCallback(
    async (expertAddress, requestId, account) => {
      return web3Contract.call('appointExpert', [expertAddress, requestId], account);
    },
    [connected]
  );
  return { connected, expertAppointment };
}

/**
 * Function 11: issueAward
 */
export function issueAward(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const awardIssue = useCallback(
    async (name, requestId, documentHash, account) => {
      return web3Contract.call('issueAward', [name, requestId, documentHash], account);
    },
    [connected]
  );
  return { connected, awardIssue };
}

/**
 * Function 12: signDocuments
 */
export function signDocuments(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const documentSign = useCallback(
    async (document, account) => {
      return web3Contract.documentSigning('signDocuments', [document], account);
    },
    [connected]
  );

  return { connected, documentSign };
}

/**
 * Function 13: agreeProcedureStatement
 */
export function agreeProcedureStatement(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const procedureStatementSigning = useCallback(
    async (document, account) => {
      return web3Contract.documentSigning('agreeProcedureStatement', [document], account);
    },
    [connected]
  );

  return { connected, procedureStatementSigning };
}

/**
 * To add isdocumentSigned
 */

/**
 * Function 14: depositCost
 */
export function depositCost(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const costDeposit = useCallback(
    async (cost, account) => {
      return web3Contract.call('depositCost', [cost], account);
    },
    [connected]
  );
  return { connected, costDeposit };
}

/**
 * Function 15: setLanguage
 */
export function setLanguage(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const languageSelection = useCallback(
    async (language, account) => {
      return web3Contract.call('setLanguage', [language], account);
    },
    [connected]
  );
  return { connected, languageSelection };
}

export async function getAllStatements(nodeSelected, contractAddress, privacyGroupId, account) {
  const connected = await web3Contract.connect(nodeSelected);
  let res = null;
  try {
    if (connected) {
      await web3Contract.create(ContractAbi, contractAddress, [], privacyGroupId);
      res = await web3Contract.call('getAllStatements', [], account);
      console.log(res);
    }
  } catch (err) {
    return false;
  }
  return res;
}

export async function getProcedureStatements(
  nodeSelected,
  contractAddress,
  privacyGroupId,
  account
) {
  const connected = await web3Contract.connect(nodeSelected);
  let res = null;
  try {
    if (connected) {
      await web3Contract.create(ContractAbi, contractAddress, [], privacyGroupId);
      res = await web3Contract.call('getAllProcedureStatements', [], account);
      console.log(res);
    }
  } catch (err) {
    console.log('ERR:', err);
    return false;
  }
  return res;
}

export async function getArbitrationDetails(
  nodeSelected,
  contractAddress,
  privacyGroupId,
  account
) {
  const connected = await web3Contract.connect(nodeSelected);
  let res = null;
  try {
    if (connected) {
      await web3Contract.create(ContractAbi, contractAddress, [], privacyGroupId);
      res = await web3Contract.call('getArbitrationDetails', [], account);
      console.log(res);
    }
  } catch (err) {
    return false;
  }
  return res;
}
