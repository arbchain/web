const e2e = require('../../utils/e2e-encrypt');
const db = require('../threadDB-utils');
const { Where } = require('@textile/hub');

// Schema name
const registerSchema = 'RegisterUser';
const agreementMetaDataSchema = 'AgreementMetaData';
const procedureMetaDataSchema = 'ProcedureMetaData';

export const authorizeUser = async password => {
  return db.authorizeUser(password);
};

export const registerNewUser = async (
  name,
  email,
  zipCode,
  number,
  address,
  orionPublicKey,
  role,
  privateKey,
  client
) => {
  try {
    const publicKey = e2e.getPublicKey(privateKey);
    const data = {
      address: address,
      name: name,
      email: email,
      zipCode: zipCode,
      number: number,
      orionPublicKey: orionPublicKey,
      role: role,
      publicKey: publicKey.toString('hex'),
      documentId: ['-1'],
      agreementContracts: [{ id: '-1' }],
      procedureContract: [{ id: '-1' }],
    };
    return await db.insertDataToDB(client, registerSchema, data);
  } catch (err) {
    throw err;
  }
};

export const getLoginUser = async (privateKey, dbClient) => {
  try {
    const publicKey = e2e.getPublicKey(privateKey);
    const query = new Where('publicKey').eq(publicKey.toString('hex'));
    const result = await db.findFromDB(dbClient, registerSchema, query);
    if (result.length < 1) {
      return null;
    }
    return result[0];
  } catch (err) {
    throw err;
  }
};

export const getAllUsers = async (dbClient, loggedUser) => {
  const userKey = e2e.getPublicKey(loggedUser);
  const registeredUsers = await db.findFromDB(dbClient, registerSchema, {});
  const userType = { party: 0, arbitrator: 1, arbitralCourt: 2 };

  let caller;
  const party = [];
  const arbitrator = [];
  const court = [];

  for (let i = 0; i < registeredUsers.length; i++) {
    const value = {
      address: registeredUsers[i].address,
      name: registeredUsers[i].name,
      orionPublicKey: registeredUsers[i].orionPublicKey,
      publicKey: registeredUsers[i].publicKey,
    };

    if (userKey.toString('hex') === registeredUsers[i].publicKey) {
      caller = value;
    } else if (registeredUsers[i].role === userType.party) {
      party.push(value);
    } else if (registeredUsers[i].role === userType.arbitrator) {
      arbitrator.push(value);
    } else {
      court.push(value);
    }
  }

  return {
    party: party,
    arbitrator: arbitrator,
    court: court,
    caller: caller,
  };
};

export const updateAgreementContracts = async (
  dbClient,
  groupId,
  contractAddress,
  args,
  caller,
  counterParty
) => {
  const partyAddress = [caller.address, args[5]];
  const date = new Date();
  const metaData = {
    law: args[3],
    disputeType: args[7].toString(),
    seat: args[1],
    language: args[2],
    claimantName: caller.name,
    respondentName: counterParty.name,
    documentName: 'DEMO DOC',
    createdAt: date.toDateString(),
  };

  for (let i = 0; i < partyAddress.length; i++) {
    const query = new Where('address').eq(partyAddress[i]);
    const user = await db.findFromDB(dbClient, registerSchema, query);
    console.log('USER:', user);
    if (user[0].agreementContracts.length === 1 && user[0].agreementContracts[0].id === '-1') {
      user[0].agreementContracts = [
        {
          contractAddress: contractAddress,
          groupId: groupId,
          metaData: metaData,
        },
      ];
    } else {
      user[0].agreementContracts.push({
        contractAddress: contractAddress,
        groupId: groupId,
        metaData: metaData,
      });
    }
    await db.updateData(dbClient, registerSchema, user[0]);
    console.log('Updated!!:');
  }
};

export const updateProcedureContracts = async (
  dbClient,
  groupId,
  contractAddress,
  args,
  caller,
  counterParty
) => {
  console.log('contractAddress:', contractAddress);
  const partyAddress = [args[4].partyAddress, args[5].partyAddress];
  console.log(partyAddress);
  const date = new Date();
  const metaData = {
    name: args[0],
    description: args[1],
    agreementAddress: args[2],
    claimantName: caller.name,
    respondentName: counterParty.name,
    courtAddress: args[6].partyAddress,
    createdAt: date.toDateString(),
  };

  for (let i = 0; i < partyAddress.length; i++) {
    const query = new Where('address').eq(partyAddress[i]);
    const user = await db.findFromDB(dbClient, registerSchema, query);
    console.log('USER', user);
    if (user[0].procedureContract.length === 1 && user[0].procedureContract[0].id === '-1') {
      user[0].procedureContract = [
        {
          contractAddress: contractAddress,
          groupId: groupId,
          metaData: metaData,
        },
      ];
    } else {
      user[0].procedureContract.push({
        contractAddress: contractAddress,
        groupId: groupId,
        metaData: metaData,
      });
    }
    await db.updateData(dbClient, registerSchema, user[0]);
    console.log('Updated!!:');
  }
};

export const getAgreementContractAddress = async (dbClient, privateKey) => {
  try {
    const publicKey = e2e.getPublicKey(privateKey);
    const query = new Where('publicKey').eq(publicKey.toString('hex'));
    const result = await db.findFromDB(dbClient, registerSchema, query);
    console.log('LOGIN USER:', result);
    if (result.length === 1 && result[0].agreementContracts[0].id === '-1') {
      return [];
    }
    return result[0].agreementContracts;
  } catch (err) {
    throw err;
  }
};

export const getProcedureContractAddress = async (dbClient, privateKey) => {
  try {
    const publicKey = e2e.getPublicKey(privateKey);
    const query = new Where('publicKey').eq(publicKey.toString('hex'));
    const result = await db.findFromDB(dbClient, registerSchema, query);
    console.log('LOGIN USER:', result);
    if (result.length === 1 && result[0].procedureContract[0].id === '-1') {
      return [];
    }
    return result[0].procedureContract;
  } catch (err) {
    throw err;
  }
};

export const getProcedureMetaData = async (dbClient, id) => {
  try {
    return await db.findById(dbClient, procedureMetaDataSchema, id);
  } catch (err) {
    throw err;
  }
};

export const getAgreementMetaData = async (dbClient, id) => {
  try {
    return await db.findById(dbClient, agreementMetaDataSchema, id);
  } catch (err) {
    throw err;
  }
};
