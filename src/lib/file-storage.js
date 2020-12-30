const AWS = require('aws-sdk');
const e2e = require('../utils/e2e-encrypt');
const fleekStorage = require('@fleekhq/fleek-storage-js');
const fileDownload = require('js-file-download');

AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET,
});
const s3 = new AWS.S3();

const fleekApiKey = 'X/4RLmp8YcASeLgs1FoLMg==';
const fleekApiSecret = 'OLIEagFmWpNAErPWJArWwHUXsw3Yh7o2qvXwv03cKA0=';

const storeFileFleek = async (fileName, encryptedDoc) => {
  console.log("Storing file fleek!!")
  return await fleekStorage.upload({
    apiKey: fleekApiKey,
    apiSecret: fleekApiSecret,
    key: fileName,
    data: encryptedDoc,
  });
};

const getFileFleek = async (fileName) => {
  console.log("Getting file fleek!!")
  const file = await fleekStorage.get({
    apiKey: fleekApiKey,
    apiSecret: fleekApiSecret,
    key: fileName,
  });
  return file.data;
};

const storeFileAWS = (awsKey, encryptedDoc) => {
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: 'secure-doc-test',
        Key: awsKey,
        Body: encryptedDoc,
      },
      function(error, data) {
        if (error != null) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

const getFileAWS = (key) => {
  return new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: 'secure-doc-test',
        Key: key,
      },
      function(error, data) {
        if (error != null) {
          reject(error);
        } else {
          resolve(data.Body);
        }
      }
    );
  });
};

export const uploadDoc = async (file, password, storageType) => {
  const fileSplit = file.name.split('.');
  const fileFormat = fileSplit[fileSplit.length - 1];
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  storageType = process.env.REACT_APP_STORAGE;

  return new Promise((resolve, reject) => {
    reader.onload = async (val) => {
      const fileInput = new Uint8Array(val.target.result);
      const cipherKey = await e2e.generateCipherKey(Math.random(1000));
      const encryptedFile = await e2e.encryptData(
        Buffer.from(fileInput),
        cipherKey
      );

      const fileHash = e2e.calculateHash(fileInput);

      const fileKey = fileHash
        .toString('hex')
        .concat('.')
        .concat(storageType)
        .concat('.')
        .concat(fileFormat);

      if (storageType === 'FLEEK') {
        await storeFileFleek(fileKey, encryptedFile);
      } else {
        await storeFileAWS(fileKey, encryptedFile);
      }
      const result = {
        cipherKey: cipherKey.toString('hex'),
        fileLocation: fileKey,
        fileHash: fileHash,
        fileName: file.name,
        fileFormat: fileFormat,
      };
      resolve(result);
    };
  });
};

export const downloadFile = async (name, documentLocation, cipherKey) => {
  const fileSplit = documentLocation.split('.');
  const storageType = fileSplit[fileSplit.length - 2];

  return new Promise((resolve) => {
    if (storageType === 'AWS') {
      getFileAWS(documentLocation).then((encryptedFile) => {
        console.log('enc:', encryptedFile);
        cipherKey = Buffer.from(cipherKey, 'hex');
        e2e.decryptData(encryptedFile, cipherKey).then((decryptedFile) => {
          fileDownload(decryptedFile, name);
          resolve(true);
        });
      });
    } else {
      getFileFleek(documentLocation).then((encryptedFile) => {
        console.log('enc:', encryptedFile);
        cipherKey = Buffer.from(cipherKey, 'hex');
        e2e.decryptData(encryptedFile, cipherKey).then((decryptedFile) => {
          fileDownload(decryptedFile, name);
          resolve(true);
        });
      });
    }
  });
};
