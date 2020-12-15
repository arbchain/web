/* eslint-disable */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Web3Contract } from '../../utils/web3-contracts';
import { addProcedureContract, addAgreementContract } from './MasterContract';
import {updateAgreementContracts, updateProcedureContracts} from '../db/threadDB'
const Agreement_ContractAbi = require('../../build/ArbitrationAgreement_abi.json');
const SPC_ContractAbi = require('../../build/SPC_abi.json');
const Web3 = require('web3');
const Agreement_ContractBin = require('../../build/ArbitrationAgreement_bin.json').binary;
const SPC_ContractBin = require('../../build/SPC_bin.json').binary;
const web3Contract = new Web3Contract();

export function createAgreement(nodeSelected) {
  // eslint-disable-next-line no-unused-vars
  const [connected, setConnected] = useState(false);
  const [result, setResult] = useState(false);
  const { agreementAdditionStatus, agreementContractAddition } = addAgreementContract(nodeSelected);
  const create = useCallback(
    async (account, args, dbClient, caller, counterParty) => {
      setConnected(await web3Contract.connect(nodeSelected));
      const res = await web3Contract.deploy(
        Agreement_ContractAbi,
        Agreement_ContractBin,
        args,
        [],
        account
      );
      await agreementContractAddition(res.contractAddress, res.privacyGroupId, account);
      await updateAgreementContracts(dbClient, res.privacyGroupId, res.contractAddress, args, caller, counterParty)
      setResult(res);
    },
    [nodeSelected]
  );

  return { result, agreementAdditionStatus, setResult, create };
}

export function deployProcedureContract(nodeSelected) {
  const [connected, setConnected] = useState(false);
  const [resultProcedureContract, setResult] = useState(false);
  const { procedureAdditionStatus, procedureContractAddition } = addProcedureContract(nodeSelected);

  const createProcedureContract = useCallback(
    async (account, args, dbClient, caller, counterParty, partiesInvolved, seat, language, fileDetails) => {
      setConnected(await web3Contract.connect(nodeSelected));

      console.log("Creating procedure")
      //create procedure contract
      const res = await web3Contract.deploy(SPC_ContractAbi, SPC_ContractBin, args, [], account);
      await procedureContractAddition(res.contractAddress, res.privacyGroupId, account);
      await web3Contract.create(SPC_ContractAbi, res.contractAddress, [], res.privacyGroupId);

      //create procedure statement
      await web3Contract.call(
        'createProcedureStatement',
        [partiesInvolved, seat, language, fileDetails.fileLocation, fileDetails.fileName,
          fileDetails.fileHash, fileDetails.cipherKey],
        account
      );

      console.log("Signing statement")
      //sign statement
      const {replayNonce, signature} = await web3Contract.documentSigning([fileDetails.fileHash], account);
      await web3Contract.call('signDocuments', [
        replayNonce,
        signature.signature,
        fileDetails.fileHash
      ], account)

      await updateProcedureContracts(dbClient, res.privacyGroupId, res.contractAddress, args, caller, counterParty)
      setResult(res);

    },
    [nodeSelected]
  );
  return { resultProcedureContract, procedureAdditionStatus, createProcedureContract };
}
