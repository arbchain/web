/* eslint-disable */
const Web3 = require("web3");
const EEAClient = require("web3-besu");

const { orion, besu } = require("../wallet/keys");

const web3 = new EEAClient(new Web3(besu.node1.url), 2018);



export class Web3Contract {

    Contract;

    async createPrivacyGroup(participants) {
        let privacyGroup = await web3.privx.createPrivacyGroup({
            participants: [orion.node1.publicKey, orion.node2.publicKey],
            enclaveKey: orion.node1.publicKey,
            privateFrom: orion.node1.publicKey,
            privateKey: besu.node1.privateKey
        });

        return privacyGroup;

    }

     async create(contractAbi, contractAddress, participants, privacyGroupId) {

        this.Contract = new web3.eth.Contract(contractAbi);
        this.contractAddress = contractAddress;
        this.privacyGroup = await this.createPrivacyGroup(participants)
        this.privacyGroupId = privacyGroupId
    }


     async call(name, args) {
        const functionAbi = this.Contract._jsonInterface.find((e) => {
            return e.name === name;
        });

         let functionArgs = []
        if(functionAbi.inputs.length) {
             functionArgs = web3.eth.abi
                .encodeParameters(functionAbi.inputs, args)
                .slice(2);
        }

         const functionCall = {
             to: this.contractAddress,
             data: functionAbi.signature + functionArgs,
             privateFrom: orion.node1.publicKey,
             privateKey: besu.node1.privateKey,
             privacyGroupId: this.privacyGroupId
         };

         const transactionHash = await web3.eea.sendRawTransaction(functionCall);
         const result = await web3.priv.getTransactionReceipt(transactionHash, orion.node1.publicKey);
         if(result.output) {
             return web3.eth.abi.decodeParameters(functionAbi.outputs, result.output);
         }

    }

}
