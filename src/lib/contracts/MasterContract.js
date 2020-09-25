/* eslint-disable */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Web3Contract } from '../../utils/web3-contracts';

const ContractAbi = require('../../build/MasterContract_abi.json');
const ContractReceipt = require('../../build/MasterContract_receipt.json');

const web3Contract = new Web3Contract();


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
 * Function: createUser
 * */
export function createUser(nodeSelected) {
  const { connected } = useContract(nodeSelected);
  const [status, setStatus] = useState(null);

  const newUserCreation = useCallback(
    async (name, zipCode, contactNumber, orionPublicKey, role, account) => {
      const result = await web3Contract.call(
        'createUser',
        [name, zipCode, contactNumber, orionPublicKey, role],
        account
      );
      setStatus(result);
    },
    [connected]
  );

  return { status, newUserCreation };
}

/**
 * Function: addProcedureContract
 * */
export function addProcedureContract(nodeSelected) {
  const { connected } = useContract(nodeSelected);
  const [procedureAdditionStatus, setStatus] = useState(null);

  const procedureContractAddition = useCallback(
    async (contractAddress, groupId, account) => {
      const result = await web3Contract.call(
        'addProcedureContract',
        [contractAddress, groupId],
        account
      );
      setStatus(result)
    },
    [connected]
  );
  return { procedureAdditionStatus, procedureContractAddition };
}

/**
 * Function: addAgreementContract
 * */
export function addAgreementContract(nodeSelected) {
  const { connected } = useContract(nodeSelected);
  const [agreementAdditionStatus, setStatus] = useState(null);

  const agreementContractAddition = useCallback(
    async (contractAddress, groupId, account) => {
      const result = await web3Contract.call(
        'addAgreementContract',
        [contractAddress, groupId],
        account
      );
      setStatus(result)
    },
    [connected]
  );

  return { agreementAdditionStatus, agreementContractAddition };
}


export function userMap(nodeSelected, userAddress, account) {
  const {connected} = useContract(nodeSelected);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getUserData(){
      try{
        if(connected){
          const data = await web3Contract.call('userMap', [userAddress], account);
          setUserData(data)
        }
      }catch(err) {
        return false
      }
    }
    getUserData()
  },[connected, account])

  return { userData };
}

export function getProcedureAddress (nodeSelected, account) {
  const {connected} = useContract(nodeSelected);
  const [procedureAddress, setProcedureAddress] = useState([])

  useEffect(() => {
    async function procedureAddressCall(){
      try{
        const userAddress = web3Contract.web3.eth.accounts.privateKeyToAccount(`0x${account.privateKey}`).address;
        if(connected){
          const res = await web3Contract.call('getAllProcedureAddress',[userAddress], account);
          setProcedureAddress(res[0]);
        }
      }catch(err) {
        return false
      }
    }
    procedureAddressCall()
  },[connected, account])
  return { procedureAddress };
}

export function getAgreementAddress (nodeSelected, userAddress, account) {
  const {connected} = useContract(nodeSelected);
  const [agreementCount, setCount] = useState(null);
  const [agreementAddress, setAgreementAddress] = useState([])

  useEffect(() => {
    async function agreementAddressCall(){
      try{
        if(connected){
          const agrCount = await web3Contract.call('getAgreementlength', [userAddress], account);
          setCount(agrCount);

          let i = 0;
          //let count = 0;
          while(i<parseInt(proCount[0])){
            const res = await web3Contract.call('getAgreementAddress',[userAddress, i],account);
            const data = await web3Contract.call('agreement',[res[0]], account)
            setAgreementAddress(agreementAddress => [...agreementAddress, data])
            i++;
          }
        }
      }catch(err) {
        return false
      }
    }
    agreementAddressCall()
  },[connected, account])
  if(agreementAddress !== []){
    localStorage.setItem('agreement_address', JSON.stringify(agreementAddress));
  }
  return { agreementCount, agreementAddress };
}