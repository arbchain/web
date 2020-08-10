/* eslint-disable */
const Web3 = require("web3");
const EEAClient = require("web3-besu");

const { orion, besu } = require("../wallet/keys");


export class Web3Contract {

     async connect(url) {
        try {
            this.web3 = new EEAClient(new Web3(url), 2018);
            return await this.web3.eth.net.isListening()
        }
        catch(err) {
            console.log("Failed to connect: ", err)
            return false
        }

    }

    async createPrivacyGroup(participants) {
        let privacyGroup = await this.web3.privx.createPrivacyGroup({
            participants: participants,
            enclaveKey: orion.node1.publicKey,
            privateFrom: orion.node1.publicKey,
            privateKey: besu.node1.privateKey
        });

        return privacyGroup;

    }

    async deploy(contractAbi, contractBin, args, participants, account ) {

        let privacyGroup = await this.createPrivacyGroup(participants);
        let privacyGroupId = privacyGroup.privacyGroupId;
        new this.web3.eth.Contract(contractAbi)

        const constructorAbi = constructorAbi.find(e => {
            return e.type === "constructor";
        })

        let constructorArgs = ''

        if(constructorAbi && args.length){
            constructorArgs = web3.eth.abi
            .encodeParameters(constructorAbi.inputs, args)
            .slice(2);
        }

        const contractOptions = {
            data: `0x${contractBin}${constructorArgs}`,
            privateFrom: account.orionPublicKey,
            privacyGroupId,
            privateKey: account.privateKey,
          };
          const transactionHash = await this.web3.eea.sendRawTransaction(contractOptions);
          const result = await this.web3.priv.getTransactionReceipt(transactionHash, account.orionPublicKey);

          return result
        
    }

     async create(contractAbi, contractAddress, participants, privacyGroupId) {

        this.Contract = new this.web3.eth.Contract(contractAbi);
        this.contractAddress = contractAddress;
        // this.privacyGroup = await this.createPrivacyGroup(participants)
        this.privacyGroupId = privacyGroupId
    }


     async call(name, args, account) {

        const functionAbi = this.Contract._jsonInterface.find((e) => {
            return e.name === name;
        });

         let functionArgs = []
        if(functionAbi.inputs.length) {
             functionArgs = this.web3.eth.abi
                .encodeParameters(functionAbi.inputs, args)
                .slice(2);
        }

         const functionCall = {
             to: this.contractAddress,
             data: functionAbi.signature + functionArgs,
             privateFrom: account.orionPublicKey,
             privateKey: account.privateKey,
             privacyGroupId: this.privacyGroupId
         };

         const transactionHash = await this.web3.eea.sendRawTransaction(functionCall);
         const result = await this.web3.priv.getTransactionReceipt(transactionHash, account.orionPublicKey);

         if(parseInt(result.output)) {
             return this.web3.eth.abi.decodeParameters(functionAbi.outputs, result.output);
         }

    }

    async documentSigning(name, args, account) {

        const functionAbi = this.Contract._jsonInterface.find(e => {
            return e.name === name;
        })

        const nonceFunctionAbi = this.Contract._jsonInterface.find(e => {
            return e.name === "replayNonce"
        })

        const account = await this.web3.eth.accounts.privateKeyToAccount(`0x{account.privateKey}`)

        const nonceFunctionArgs = this.web3.eth.abi.encodeParameters(nonceFunctionAbi.inputs, [account.address]).slice(2);

        const nonceFunctionCall = {
            to: this.contractAddress,
            data: nonceFunctionAbi.signature + nonceFunctionArgs,
            privateFrom: account.orionPublicKey,
            privateKey: account.privateKey,
            privacyGroupId: this.privacyGroupId
        };

        let transactionHash = await this.web3.eea.sendRawTransaction(nonceFunctionCall);
        let result = await this.web3.priv.getTransactionReceipt(transactionHash, orion.node1.publicKey);
        let resultOutput = this.web3.eth.abi.decodeParameters(nonceFunctionAbi.outputs, result.output);
        const replayNonce = resultOutput[0];

        const params = [
            ["bytes32", "uint"],
            [
                this.web3.utils.keccak256(args[0]),
                replayNonce
            ]
        ];

        let paramHash = this.web3.utils.keccak256(this.web3.utils.encodeParameters(...params))

        let signature = account.sign(paramHash)

        const functionArgs = web3.eth.abi
            .encodeParameters(functionAbi.inputs, [
                replayNonce,
                signature.signature,
                this.web3.utils.keccak256(args[0])
            ]).slice(2);

         const functionCall = {
             to: this.contractAddress,
             data: functionAbi.signature + functionArgs,
             privateFrom: account.orionPublicKey,
             privateKey: account.privateKey,
             privacyGroupId: this.privacyGroupId
         };

         const transactionHash = await this.web3.eea.sendRawTransaction(functionCall);
         const result = await this.web3.priv.getTransactionReceipt(transactionHash, account.orionPublicKey);

         if(parseInt(result.output)) {
             return this.web3.eth.abi.decodeParameters(functionAbi.outputs, result.output);
         }
    }

}
