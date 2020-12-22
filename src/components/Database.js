import React, { useState } from 'react';
import { createUserAuth, Client, PrivateKey } from '@textile/hub';

export default function Database() {
  const [dbClient, setDBClient] = useState(null);
  const [threadID, setThreadID] = useState(null);
  const [dbInfo, setDB] = useState(null);

  const keyInfo = {
    key: 'be645tj5wtjuginby3fwnqhe57y',
    secret: 'bcm7zjaxlipajgsm6qd6big7lv52cihf2whbbaji',
  };

  const registrationSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'RegisterUser',
    type: 'object',
    properties: {
      _id: { type: 'string' },
      address: { type: 'string' },
      name: { type: 'string' },
      email: { type: 'string' },
      zipCode: { type: 'string' },
      number: { type: 'string' },
      orionPublicKey: { type: 'string' },
      role: { type: 'number' },
      publicKey: { type: 'string' },
      documentId: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      agreementContracts: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
      procedureContract: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
    },
  };

  const procedureMetaData = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'ProcedureMetaData',
    type: 'object',
    properties: {
      _id: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
      agreementAddress: { type: 'string' },
      claimantName: { type: 'string' },
      respondentName: { type: 'string' },
      courtAddress: { type: 'string' },
      createdAt: { type: 'string' },
      role: {type: 'number'}
    },
  };

  const agreementMetaData = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'AgreementMetaData',
    type: 'object',
    properties: {
      _id: { type: 'string' },
      law: { type: 'string' },
      disputeType: { type: 'string' },
      seat: { type: 'string' },
      language: { type: 'string' },
      claimantName: { type: 'string' },
      respondentName: { type: 'string' },
      documentName: { type: 'string' },
      createdAt: { type: 'string' },
      role: {type: 'number'}
    },
  };

  const documentSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Document',
    type: 'object',
    properties: {
      _id: { type: 'string' },
      documentHash: { type: 'string' },
      fileLocation: { type: 'string' },
      fileName: { type: 'string' },
      key: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            key: { type: 'string' },
          },
        },
      },
    },
  };

  const setThreadDb = async () => {
    const userAuth = await createUserAuth(keyInfo.key, keyInfo.secret);
    const privateKey = await PrivateKey.fromRandom();
    console.log('User:', privateKey);
    const dbClient = await Client.withUserAuth(userAuth);
    const token = await dbClient.getToken(privateKey);
    console.log('ThreadDB setup done!!!');
    setDBClient(dbClient);
  };

  const createDB = async () => {
    const threadId = await dbClient.newDB();
    console.log('threadID:', threadId.buf);
    console.log('Copy the threadID and paste it in index.js file!!!');
    setThreadID(threadId);
    console.log('DB created!!!');
  };

  const getDBInfo = async () => {
    console.log('Creating DB!!');
    const dBInfo = await dbClient.getDBInfo(threadID);
    console.log('dbInfo:', dBInfo);
    setDB(dBInfo);
  };

  const createCollection = async () => {
    console.log('Creating tables!!!');
    await dbClient.newCollection(threadID, {
      name: 'RegisterUser',
      schema: registrationSchema,
    });
    await dbClient.newCollection(threadID, {
      name: 'Document',
      schema: documentSchema,
    });
    await dbClient.newCollection(threadID, {
      name: 'ProcedureMetaData',
      schema: procedureMetaData,
    });
    await dbClient.newCollection(threadID, {
      name: 'AgreementMetaData',
      schema: agreementMetaData,
    });
    console.log('Tables created!!:');
    setThreadID(threadID);
  };

  const getRegisteredUsers = async () => {
    console.log('Getting users!!!');
    const users = await dbClient.find(threadID, 'RegisterUser', {});
    console.log('Users:', users);
  };

  const getAllDocuments = async () => {
    console.log('Getting documents');
    const users = await dbClient.find(threadID, 'Document', {});
    console.log('Users:', users);
  };

  return (
    <div>
      <h1>Database Functions</h1>
      <button onClick={setThreadDb}>Setup</button>
      <br />
      <br />
      <button onClick={createDB}>Create DB</button>
      <br />
      <br />
      <button onClick={getDBInfo}>Get DB Info</button>
      <br />
      <br />
      <button onClick={createCollection}>Create Table</button>
      <br />
      <br />
      <button onClick={getRegisteredUsers}>Get All Users</button>
      <br />
      <br />
      <button onClick={getAllDocuments}>Get All Document</button>
      <br />
      <br />
    </div>
  );
}
