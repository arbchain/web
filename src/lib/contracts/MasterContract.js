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

/**
 * Get total agreement for particular user
 * */
// export function getAgreementLength(nodeSelected, userAddress, account) {
//   const { connected } = useContract(nodeSelected);
//   const [length, setLength] = useState(0);

//   useEffect(() => {
//     async function agreementLengthCall() {
//       try {
//         if (connected) {
//           const len = await web3Contract.call(
//             'getAgreementlength',
//             [userAddress],
//             account
//           );
//           setLength(len);
//         }
//       } catch (err) {
//         return false;
//       }
//     }
//     agreementLengthCall();
//   }, [connected, account]);

//   return length;
// }

// /**
//  * Get total procedure for particular user
//  * */
// export function getProcedureLength(nodeSelected, userAddress, account) {
//   const { connected } = useContract(nodeSelected);
//   const [length, setLength] = useState(0);

//   useEffect(() => {
//     async function procedureLengthCall() {
//       try {
//         if (connected) {
//           const len = await web3Contract.call(
//             'getProcedurelength',
//             [userAddress],
//             account
//           );
//           setLength(len);
//         }
//       } catch (err) {
//         return false;
//       }
//     }
//     procedureLengthCall();
//   }, [connected, account]);

//   return {length};
// }

/**
 * Get Agreement Address for particular user stored at particular location
 * */
// export function getAgreementAddress(nodeSelected, userAddress, index, account) {
//   const { connected } = useContract(nodeSelected);
//   const [agreementReceipt, setAddress] = useState(0);

//   useEffect(() => {
//     async function agreementAddressCall() {
//       try {
//         if (connected) {
//           const len = await web3Contract.call(
//             'getAgreementAddress',
//             [userAddress, index],
//             account
//           );
//           setAddress(len);
//         }
//       } catch (err) {
//         return false;
//       }
//     }
//     agreementAddressCall();
//   }, [connected, account]);

//   return { agreementReceipt };
// }

// /**
//  * Get Procedure Address for particular user stored at particular location
//  * */
// export function getProcedureAddress(nodeSelected,  account) {
//   const { connected } = useContract(nodeSelected);
//   const [procedureReceipt, setAddress] = useState(0);

//   const procedureAddressCall = useCallback(
//     async (userAddress, index) => {
//       const res = await web3Contract.call('getProcedureAddress',
//       [userAddress, index],
//       account)
//       setAddress(res);
//     },
//     [connected]
//   )
//   return {procedureReceipt, procedureAddressCall };
// }

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

export function getProcedureAddress (nodeSelected, userAddress, account) {
  const {connected} = useContract(nodeSelected);
  const [procedureCount, setCount] = useState(null);
  const [procedureAddress, setProcedureAddress] = useState([])

  useEffect(() => {
    async function procedureAddressCall(){
      try{
        if(connected){
          const proCount = await web3Contract.call('getProcedurelength', [userAddress], account);
          setCount(proCount);

          let i = 0;
          //let count = 0;
          while(i<parseInt(proCount[0])){
            const res = await web3Contract.call('getProcedureAddress',[userAddress, i],account);
            const data = await web3Contract.call('procedure',[res[0]], account)
            setProcedureAddress(procedureAddress => [...procedureAddress, data])
            i++;
          }
        }
      }catch(err) {
        return false
      }
    }
    procedureAddressCall()
  },[connected, account])
  if(procedureAddress !== []){
    localStorage.setItem('procedure_address', JSON.stringify(procedureAddress));
  }
  return { procedureCount, procedureAddress };
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