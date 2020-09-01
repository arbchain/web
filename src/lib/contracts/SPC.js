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
  contractAddress: '0x0be9778d4e338e4076471cddec8e65a7f8a6d6ed',
  privacyGroupId: '65CdeS17zbPOw3BNnU3AmiDj6wO3fIJaNUt7RqfuwwE=',
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

export function useContract(nodeSelected) {
  const [connected, setConnected] = useState(false);

  useMemo(async () => {
    setConnected(await web3Contract.connect(nodeSelected));

    await web3Contract.create(
      ContractAbi,
      ContractReceipt.contractAddress,
      [],
      ContractReceipt.privacyGroupId
    );
  }, [nodeSelected]);

  return { connected };
}

/**
 * Function 1: createArbitrationResponse
 */
export function createArbitrationResponse(nodeSelected) {
  const { connected } = useContract(nodeSelected);

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
export function createProcedureStatement(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const procedureStatementCreation = useCallback(
    async (parties, seat, language, documentIpfsHash, documentHash, account) => {
      return web3Contract.call(
        'createProcedureStatement',
        [parties, seat, language, documentIpfsHash, documentHash],
        account
      );
    },
    [connected]
  );

  return { connected, procedureStatementCreation };
}

/**
 * Function 4: nominateArbitrator
 */
export function nominateArbitrator(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const arbitratorNomination = useCallback(
    async (arbitratorAddress, account) => {
      return web3Contract.call('appointArbitrator', [arbitratorAddress], account);
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
export function createStatement(nodeSelected) {
  const { connected } = useContract(nodeSelected);

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
      return web3Contract.call(
        'createStatement',
        [parties, stakeholder, statementType, subject, documentHash, documentIpfsHash],
        account
      );
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

// getter function
// Rest all getter functions to added further as needed.

export function getArbitratorLength(nodeSelected, account) {
  const { connected } = useContract(nodeSelected);
  const [length, setLength] = useState(0);

  useEffect(() => {
    async function spcCall() {
      try {
        if (connected) {
          const len = await web3Contract.call('getArbitratorLength', [], account);
          setLength(len);
        }
      } catch (err) {
        return false;
      }
    }
    spcCall();
  }, [connected, account]);

  return length;
}
