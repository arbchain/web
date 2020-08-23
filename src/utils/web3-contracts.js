/* eslint-disable */
const Web3 = require("web3");
const EEAClient = require("web3-besu");

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

    async createPrivacyGroup(participants, account) {
         console.log(account)
        let privacyGroup = await this.web3.privx.createPrivacyGroup({
            participants: [account.orionPublicKey],
            enclaveKey: account.orionPublicKey,
            privateFrom: account.orionPublicKey,
            privateKey: account.privateKey
        });

        return privacyGroup;

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

    async deploy(contractAbi, contractBin, args, participants, account ) {

        let privacyGroup = await this.createPrivacyGroup(participants, account);
        let privacyGroupId = privacyGroup.privacyGroupId;
        this.Contract = new this.web3.eth.Contract(contractAbi);

        const constructorAbi = this.Contract._jsonInterface.find(e => {
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

}
