const fs = require("fs");
const path = require("path");

const Web3 = require("web3");
const EEAClient = require("web3-eea");
const EventEmitterAbi = require("./solidity/Counter/Counter.json");

const { orion, besu } = require("./keys.js");

const binary = fs.readFileSync(
  path.join(__dirname, "./solidity/Counter/Counter.bin")
);

const web3 = new EEAClient(new Web3(besu.node1.url), 2018);
// eslint-disable-next-line no-new
new web3.eth.Contract(EventEmitterAbi);

const createPrivateEmitterContract = (value) => {

  const functionAbi = EventEmitterAbi.find(e => {
    return e.type === "constructor";
  });

  // const functionArgs = web3.eth.abi
  //     .encodeParameters(functionAbi.inputs, [value])
  //     .slice(2);

  const contractOptions = {
    data: `0x${binary}`,
    privateFrom: orion.node1.publicKey,
    privateFor: [orion.node2.publicKey],
    privateKey: besu.node1.privateKey
  };
  return web3.eea.sendRawTransaction(contractOptions);
};

const getPrivateContractAddress = transactionHash => {
  console.log("Transaction Hash ", transactionHash);
  return web3.priv
    .getTransactionReceipt(transactionHash, orion.node1.publicKey)
    .then(privateTransactionReceipt => {
      console.log("Private Transaction Receipt\n", privateTransactionReceipt);
      return privateTransactionReceipt.contractAddress;
    });
};

const increaseValue = (contractAddress, value) => {
  const functionAbi = EventEmitterAbi.find(e => {
    return e.name === "increaseCounter";
  });
  const functionArgs = web3.eth.abi
    .encodeParameters(functionAbi.inputs, [value])
    .slice(2);

  const functionCall = {
    to: contractAddress,
    data: functionAbi.signature + functionArgs,
    privateFrom: orion.node1.publicKey,
    privateFor: [orion.node2.publicKey],
    privateKey: besu.node1.privateKey
  };
  return web3.eea.sendRawTransaction(functionCall);
};

const getValue = contractAddress => {
  const functionAbi = EventEmitterAbi.find(e => {
    return e.name === "getCounter";
  });

  const functionCall = {
    to: contractAddress,
    data: functionAbi.signature,
    privateFrom: orion.node1.publicKey,
    privateFor: [orion.node2.publicKey],
    privateKey: besu.node1.privateKey
  };

  return web3.eea
    .sendRawTransaction(functionCall)
    .then(transactionHash => {
      return web3.priv.getTransactionReceipt(
        transactionHash,
        orion.node1.publicKey
      );
    })
    .then(result => {
      console.log("Get Value:", result.output);
      return result.output;
    });
};

const getPrivateTransactionReceipt = transactionHash => {
  return web3.priv
    .getTransactionReceipt(transactionHash, orion.node1.publicKey)
    .then(result => {
      console.log("Transaction Hash:", transactionHash);
      // console.log("Event Emited:", result.logs[0].data);
      return result;
    });
};

createPrivateEmitterContract(0)
  .then(getPrivateContractAddress)
  .then(contractAddress => {
    // eslint-disable-next-line promise/no-nesting
    return increaseValue(contractAddress, 1)
      .then(transactionHash => {
        return getPrivateTransactionReceipt(transactionHash);
      })
      .then(() => {
        return getValue(contractAddress);
      })
      .then(() => {
        return increaseValue(contractAddress, 100);
      })
      .then(transactionHash => {
        return getPrivateTransactionReceipt(transactionHash);
      })
      .then(() => {
        return getValue(contractAddress);
      });
  })
  .catch(console.log);
