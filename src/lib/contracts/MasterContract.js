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

  const contractAddition = useCallback(
    async (contractAddress, groupId, account) => {
      return web3Contract.call(
        'addProcedureContract',
        [contractAddress, groupId],
        account
      );
    },
    [connected]
  );

  return { connected, contractAddition };
}

/**
 * Function: addAgreementContract
 * */
export function addAgreementContract(nodeSelected) {
  const { connected } = useContract(nodeSelected);

  const contractAddition = useCallback(
    async (contractAddress, groupId, account) => {
      return web3Contract.call(
        'addAgreementContract',
        [contractAddress, groupId],
        account
      );
    },
    [connected]
  );

  return { connected, contractAddition };
}

/**
 * Get total agreement for particular user
 * */
export function getAgreementLength(nodeSelected, account) {
  const { connected } = useContract(nodeSelected);
  const [length, setLength] = useState(0);

  useEffect(() => {
    async function agreementLengthCall(userAddress) {
      try {
        if (connected) {
          const len = await web3Contract.call(
            'getAgreementlength',
            [userAddress],
            account
          );
          setLength(len);
        }
      } catch (err) {
        return false;
      }
    }
    agreementLengthCall();
  }, [connected, account]);

  return length;
}

/**
 * Get total procedure for particular user
 * */
export function getProcedureLength(nodeSelected, account) {
  const { connected } = useContract(nodeSelected);
  const [length, setLength] = useState(0);

  useEffect(() => {
    async function procedureLengthCall(userAddress) {
      try {
        if (connected) {
          const len = await web3Contract.call(
            'getProcedurelength',
            [userAddress],
            account
          );
          setLength(len);
        }
      } catch (err) {
        return false;
      }
    }
    procedureLengthCall();
  }, [connected, account]);

  return length;
}

/**
 * Get Agreement Address for particular user stored at particular location
 * */
export function getAgreementAddress(nodeSelected, account) {
  const { connected } = useContract(nodeSelected);
  const [address, setAddress] = useState(0);

  useEffect(() => {
    async function agreementAddressCall(userAddress, index) {
      try {
        if (connected) {
          const len = await web3Contract.call(
            'getAgreementAddress',
            [userAddress, index],
            account
          );
          setAddress(len);
        }
      } catch (err) {
        return false;
      }
    }
    agreementAddressCall();
  }, [connected, account]);

  return address;
}

/**
 * Get Procedure Address for particular user stored at particular location
 * */
export function getProcedureAddress(nodeSelected, account) {
  const { connected } = useContract(nodeSelected);
  const [address, setAddress] = useState(0);

  useEffect(() => {
    async function procedureAddressCall(userAddress, index) {
      try {
        if (connected) {
          const len = await web3Contract.call(
            'getAgreementAddress',
            [userAddress, index],
            account
          );
          setAddress(len);
        }
      } catch (err) {
        return false;
      }
    }
    procedureAddressCall();
  }, [connected, account]);

  return address;
}

export function userMap(nodeSelected, userAddress, account) {
  const { connected } = useContract(nodeSelected);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function getUserData() {
      try {
        if (connected) {
          const data = await web3Contract.call(
            'userMap',
            [userAddress],
            account
          );
          setUserData(data);
        }
      } catch (err) {
        return false;
      }
    }
    getUserData();
  }, [connected, account]);
  return { userData };
}
