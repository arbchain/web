/* eslint-disable */
// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Web3Contract } from '../../utils/web3-contracts'

const ContractAbi = require('../../build/ArbitrationAgreement.json')
const Web3 = require('web3')
const ContractBin =
  '60806040523480156200001157600080fd5b5060405162002b4f38038062002b4f833981810160405281019062000037919062000611565b8860038190555087600490805190602001906200005692919062000360565b5086600590805190602001906200006f92919062000360565b5085600690805190602001906200008892919062000360565b5081600260006101000a81548160ff02191690836001811115620000a857fe5b0217905550620000be81620001ff60201b60201c565b604051806040016040528086815260200160001515815250600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000190805190602001906200013392919062000360565b5060208201518160010160006101000a81548160ff021916908315150217905550905050604051806040016040528084815260200160001515815250600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190620001cc92919062000360565b5060208201518160010160006101000a81548160ff0219169083151502179055509050505050505050505050506200089f565b806007819055506060600167ffffffffffffffff811180156200022157600080fd5b50604051908082528060200260200182016040528015620002515781602001602082028036833780820191505090505b50905033816000815181106200026357fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050620002e5826040518060400160405280601681526020017f5245504c4143455f574954485f495046535f484153480000000000000000000081525083620002e960201b60201c565b5050565b42600080858152602001908152602001600020600001819055508160008085815260200190815260200160002060010190805190602001906200032e929190620003e7565b508060008085815260200190815260200160002060020190805190602001906200035a9291906200046e565b50505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620003a357805160ff1916838001178555620003d4565b82800160010185558215620003d4579182015b82811115620003d3578251825591602001919060010190620003b6565b5b509050620003e39190620004fd565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200042a57805160ff19168380011785556200045b565b828001600101855582156200045b579182015b828111156200045a5782518255916020019190600101906200043d565b5b5090506200046a9190620004fd565b5090565b828054828255906000526020600020908101928215620004ea579160200282015b82811115620004e95782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550916020019190600101906200048f565b5b509050620004f991906200051c565b5090565b5b8082111562000518576000816000905550600101620004fe565b5090565b5b808211156200055557600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055506001016200051d565b5090565b6000815190506200056a8162000840565b92915050565b60008151905062000581816200085a565b92915050565b600081519050620005988162000874565b92915050565b600082601f830112620005b057600080fd5b8151620005c7620005c18262000795565b62000767565b91508082526020830160208301858383011115620005e457600080fd5b620005f18382846200080a565b50505092915050565b6000815190506200060b8162000885565b92915050565b60008060008060008060008060006101208a8c0312156200063157600080fd5b6000620006418c828d01620005fa565b99505060208a015167ffffffffffffffff8111156200065f57600080fd5b6200066d8c828d016200059e565b98505060408a015167ffffffffffffffff8111156200068b57600080fd5b620006998c828d016200059e565b97505060608a015167ffffffffffffffff811115620006b757600080fd5b620006c58c828d016200059e565b96505060808a015167ffffffffffffffff811115620006e357600080fd5b620006f18c828d016200059e565b95505060a0620007048c828d0162000559565b94505060c08a015167ffffffffffffffff8111156200072257600080fd5b620007308c828d016200059e565b93505060e0620007438c828d0162000587565b925050610100620007578c828d0162000570565b9150509295985092959850929598565b6000604051905081810181811067ffffffffffffffff821117156200078b57600080fd5b8060405250919050565b600067ffffffffffffffff821115620007ad57600080fd5b601f19601f8301169050602081019050919050565b6000620007cf82620007e0565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b838110156200082a5780820151818401526020810190506200080d565b838111156200083a576000848401525b50505050565b6200084b81620007c2565b81146200085757600080fd5b50565b6200086581620007d6565b81146200087157600080fd5b50565b600281106200088257600080fd5b50565b620008908162000800565b81146200089c57600080fd5b50565b6122a080620008af6000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80637b80e5e2116100a2578063acd0206e11610071578063acd0206e146102cc578063ce52e44c146102ea578063e46871f11461030d578063e59029ee1461032b578063f580f274146103475761010b565b80637b80e5e21461024857806383080fd01461026457806393952903146102805780639bc510681461029c5761010b565b80634f235207116100de5780634f235207146101995780635f413152146101ca57806367d407df146101e857806372a60697146102185761010b565b8063092a6084146101105780631562b7461461012c5780632b2805db1461014a578063428ac57f1461017b575b600080fd5b61012a60048036038101906101259190611762565b610365565b005b6101346103df565b6040516101419190611e4a565b60405180910390f35b610164600480360381019061015f9190611739565b61047d565b604051610172929190611f39565b60405180910390f35b610183610539565b6040516101909190611f1e565b60405180910390f35b6101b360048036038101906101ae9190611710565b61053f565b6040516101c1929190611e6c565b60405180910390f35b6101d2610608565b6040516101df9190611efc565b60405180910390f35b61020260048036038101906101fd9190611710565b6108cf565b60405161020f9190611f1e565b60405180910390f35b610232600480360381019061022d9190611739565b6108e7565b60405161023f9190611da6565b60405180910390f35b610262600480360381019061025d9190611884565b610923565b005b61027e6004803603810190610279919061181d565b61098f565b005b61029a60048036038101906102959190611739565b610c69565b005b6102b660048036038101906102b19190611739565b610d48565b6040516102c39190611d84565b60405180910390f35b6102d4610ebe565b6040516102e19190611dc1565b60405180910390f35b6102f2610ec4565b60405161030496959493929190611f69565b60405180910390f35b6103156110d2565b6040516103229190611e4a565b60405180910390f35b6103456004803603810190610340919061179e565b611170565b005b61034f6111e3565b60405161035c9190611e4a565b60405180910390f35b600080838152602001908152602001600020600201819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60058054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104755780601f1061044a57610100808354040283529160200191610475565b820191906000526020600020905b81548152906001019060200180831161045857829003601f168201915b505050505081565b6000602052806000526040600020600091509050806000015490806001018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561052f5780601f106105045761010080835404028352916020019161052f565b820191906000526020600020905b81548152906001019060200180831161051257829003601f168201915b5050505050905082565b60035481565b6008602052806000526040600020600091509050806000018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105eb5780601f106105c0576101008083540402835291602001916105eb565b820191906000526020600020905b8154815290600101906020018083116105ce57829003601f168201915b5050505050908060010160009054906101000a900460ff16905082565b610610611439565b600080600754815260200190815260200160002060405180608001604052908160008201548152602001600182018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106d25780601f106106a7576101008083540402835291602001916106d2565b820191906000526020600020905b8154815290600101906020018083116106b557829003601f168201915b505050505081526020016002820180548060200260200160405190810160405280929190818152602001828054801561076057602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610716575b5050505050815260200160038201805480602002602001604051908101604052809291908181526020016000905b828210156108c257838290600052602060002090600302016040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108aa5780601f1061087f576101008083540402835291602001916108aa565b820191906000526020600020905b81548152906001019060200180831161088d57829003601f168201915b5050505050815250508152602001906001019061078e565b5050505081525050905090565b60016020528060005260406000206000915090505481565b60008060008381526020019081526020016000206003018054905060008084815260200190815260200160002060020180549050149050919050565b610930600754838361098f565b6001600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548160ff0219169083151502179055505050565b8282600080600084815260200190815260200160002060000154116109e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e090611e9c565b60405180910390fd5b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548114610a3457600080fd5b60011515610a4183611281565b151514610a83576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a7a90611ebc565b60405180910390fd5b60008585604051602001610a98929190611ddc565b6040516020818303038152906040528051906020012090503373ffffffffffffffffffffffffffffffffffffffff16610ad18286611349565b73ffffffffffffffffffffffffffffffffffffffff1614610b27576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b1e90611edc565b60405180910390fd5b610b2f611461565b60405180606001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200187815260200186815250905060008088815260200190815260200160002060030181908060018154018082558091505060019003906000526020600020906003020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002019080519060200190610c0e929190611498565b505050600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000815480929190600101919050555050505050505050565b806007819055506060600167ffffffffffffffff81118015610c8a57600080fd5b50604051908082528060200260200182016040528015610cb95781602001602082028036833780820191505090505b5090503381600081518110610cca57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050610d44826040518060400160405280601681526020017f5245504c4143455f574954485f495046535f484153480000000000000000000081525083611170565b5050565b6060600080838152602001908152602001600020600301805480602002602001604051908101604052809291908181526020016000905b82821015610eb357838290600052602060002090600302016040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e9b5780601f10610e7057610100808354040283529160200191610e9b565b820191906000526020600020905b815481529060010190602001808311610e7e57829003601f168201915b50505050508152505081526020019060010190610d7f565b505050509050919050565b60075481565b60006060806060600080600354600460056006600260009054906101000a900460ff16600754848054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610f7f5780601f10610f5457610100808354040283529160200191610f7f565b820191906000526020600020905b815481529060010190602001808311610f6257829003601f168201915b50505050509450838054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561101b5780601f10610ff05761010080835404028352916020019161101b565b820191906000526020600020905b815481529060010190602001808311610ffe57829003601f168201915b50505050509350828054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156110b75780601f1061108c576101008083540402835291602001916110b7565b820191906000526020600020905b81548152906001019060200180831161109a57829003601f168201915b50505050509250955095509550955095509550909192939495565b60068054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156111685780601f1061113d57610100808354040283529160200191611168565b820191906000526020600020905b81548152906001019060200180831161114b57829003601f168201915b505050505081565b42600080858152602001908152602001600020600001819055508160008085815260200190815260200160002060010190805190602001906111b3929190611498565b508060008085815260200190815260200160002060020190805190602001906111dd929190611518565b50505050565b60048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156112795780601f1061124e57610100808354040283529160200191611279565b820191906000526020600020905b81548152906001019060200180831161125c57829003601f168201915b505050505081565b600080600090505b6000808481526020019081526020016000206002018054905081101561133e573373ffffffffffffffffffffffffffffffffffffffff1660008085815260200190815260200160002060020182815481106112e057fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611331576001915050611344565b8080600101915050611289565b50600090505b919050565b60008060008060418551146113645760009350505050611433565b6020850151925060408501519150606085015160001a9050601b8160ff16101561138f57601b810190505b601b8160ff16141580156113a75750601c8160ff1614155b156113b85760009350505050611433565b6001866040516020016113cb9190611d5e565b60405160208183030381529060405280519060200120828585604051600081526020016040526040516114019493929190611e05565b6020604051602081039080840390855afa158015611423573d6000803e3d6000fd5b5050506020604051035193505050505b92915050565b6040518060800160405280600081526020016060815260200160608152602001606081525090565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001606081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106114d957805160ff1916838001178555611507565b82800160010185558215611507579182015b828111156115065782518255916020019190600101906114eb565b5b50905061151491906115a2565b5090565b828054828255906000526020600020908101928215611591579160200282015b828111156115905782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190611538565b5b50905061159e91906115bf565b5090565b5b808211156115bb5760008160009055506001016115a3565b5090565b5b808211156115f657600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055506001016115c0565b5090565b60008135905061160981612225565b92915050565b600082601f83011261162057600080fd5b813561163361162e8261200c565b611fdf565b9150818183526020840193506020810190508385602084028201111561165857600080fd5b60005b83811015611688578161166e88826115fa565b84526020840193506020830192505060018101905061165b565b5050505092915050565b6000813590506116a18161223c565b92915050565b600082601f8301126116b857600080fd5b81356116cb6116c682612034565b611fdf565b915080825260208301602083018583830111156116e757600080fd5b6116f28382846121bb565b50505092915050565b60008135905061170a81612253565b92915050565b60006020828403121561172257600080fd5b6000611730848285016115fa565b91505092915050565b60006020828403121561174b57600080fd5b600061175984828501611692565b91505092915050565b6000806040838503121561177557600080fd5b600061178385828601611692565b9250506020611794858286016115fa565b9150509250929050565b6000806000606084860312156117b357600080fd5b60006117c186828701611692565b935050602084013567ffffffffffffffff8111156117de57600080fd5b6117ea868287016116a7565b925050604084013567ffffffffffffffff81111561180757600080fd5b6118138682870161160f565b9150509250925092565b60008060006060848603121561183257600080fd5b600061184086828701611692565b9350506020611851868287016116fb565b925050604084013567ffffffffffffffff81111561186e57600080fd5b61187a868287016116a7565b9150509250925092565b6000806040838503121561189757600080fd5b60006118a5858286016116fb565b925050602083013567ffffffffffffffff8111156118c257600080fd5b6118ce858286016116a7565b9150509250929050565b60006118e48383611904565b60208301905092915050565b60006118fc8383611ce1565b905092915050565b61190d81612137565b82525050565b600061191e82612080565b61192881856120c6565b935061193383612060565b8060005b8381101561196457815161194b88826118d8565b9750611956836120ac565b925050600181019050611937565b5085935050505092915050565b600061197c8261208b565b61198681856120d7565b93508360208202850161199885612070565b8060005b858110156119d457848403895281516119b585826118f0565b94506119c0836120b9565b925060208a0199505060018101905061199c565b50829750879550505050505092915050565b60006119f18261208b565b6119fb81856120e8565b935083602082028501611a0d85612070565b8060005b85811015611a495784840389528151611a2a85826118f0565b9450611a35836120b9565b925060208a01995050600181019050611a11565b50829750879550505050505092915050565b611a6481612149565b82525050565b611a7381612155565b82525050565b611a8a611a8582612155565b6121fd565b82525050565b6000611a9b82612096565b611aa581856120f9565b9350611ab58185602086016121ca565b611abe81612207565b840191505092915050565b6000611ad482612096565b611ade818561210a565b9350611aee8185602086016121ca565b611af781612207565b840191505092915050565b611b0b816121a9565b82525050565b6000611b1c826120a1565b611b26818561211b565b9350611b368185602086016121ca565b611b3f81612207565b840191505092915050565b6000611b57601c8361212c565b91507f19457468657265756d205369676e6564204d6573736167653a0a3332000000006000830152601c82019050919050565b6000611b9760168361211b565b91507f446f63756d656e7420646f65736e2774206578697374000000000000000000006000830152602082019050919050565b6000611bd760178361211b565b91507f4e6f7420696e20746865207369676e657273206c6973740000000000000000006000830152602082019050919050565b6000611c1760298361211b565b91507f5369676e617475726520776173206e6f74207369676e6564206279207468652060008301527f696e69746961746f7200000000000000000000000000000000000000000000006020830152604082019050919050565b6000608083016000830151611c886000860182611d31565b5060208301518482036020860152611ca08282611a90565b91505060408301518482036040860152611cba8282611913565b91505060608301518482036060860152611cd48282611971565b9150508091505092915050565b6000606083016000830151611cf96000860182611904565b506020830151611d0c6020860182611d31565b5060408301518482036040860152611d248282611a90565b9150508091505092915050565b611d3a81612192565b82525050565b611d4981612192565b82525050565b611d588161219c565b82525050565b6000611d6982611b4a565b9150611d758284611a79565b60208201915081905092915050565b60006020820190508181036000830152611d9e81846119e6565b905092915050565b6000602082019050611dbb6000830184611a5b565b92915050565b6000602082019050611dd66000830184611a6a565b92915050565b6000604082019050611df16000830185611a6a565b611dfe6020830184611d40565b9392505050565b6000608082019050611e1a6000830187611a6a565b611e276020830186611d4f565b611e346040830185611a6a565b611e416060830184611a6a565b95945050505050565b60006020820190508181036000830152611e648184611b11565b905092915050565b60006040820190508181036000830152611e868185611b11565b9050611e956020830184611a5b565b9392505050565b60006020820190508181036000830152611eb581611b8a565b9050919050565b60006020820190508181036000830152611ed581611bca565b9050919050565b60006020820190508181036000830152611ef581611c0a565b9050919050565b60006020820190508181036000830152611f168184611c70565b905092915050565b6000602082019050611f336000830184611d40565b92915050565b6000604082019050611f4e6000830185611d40565b8181036020830152611f608184611ac9565b90509392505050565b600060c082019050611f7e6000830189611d40565b8181036020830152611f908188611b11565b90508181036040830152611fa48187611b11565b90508181036060830152611fb88186611b11565b9050611fc76080830185611b02565b611fd460a0830184611a6a565b979650505050505050565b6000604051905081810181811067ffffffffffffffff8211171561200257600080fd5b8060405250919050565b600067ffffffffffffffff82111561202357600080fd5b602082029050602081019050919050565b600067ffffffffffffffff82111561204b57600080fd5b601f19601f8301169050602081019050919050565b6000819050602082019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600061214282612172565b9050919050565b60008115159050919050565b6000819050919050565b600081905061216d82612218565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60006121b48261215f565b9050919050565b82818337600083830152505050565b60005b838110156121e85780820151818401526020810190506121cd565b838111156121f7576000848401525b50505050565b6000819050919050565b6000601f19601f8301169050919050565b6002811061222257fe5b50565b61222e81612137565b811461223957600080fd5b50565b61224581612155565b811461225057600080fd5b50565b61225c81612192565b811461226757600080fd5b5056fea26469706673582212202cb2f451fc38cf8adcc8b9d26cfb5ff5f75e22851860eac5eccf7e9d1de25e8c64736f6c634300060c0033'
const ContractReceipt = {
  contractAddress: '0x50477ff91bc21f6cf7267a7b0a1b437d9fa0dc57',
  privacyGroupId: 'UGG+vNTKcwy28XktJnmKI50FixYQUeKSp9ods9YM0yE=',
}
const web3Contract = new Web3Contract()

export function createAgreement(nodeSelected) {
  // eslint-disable-next-line no-unused-vars
  const [connected, setConnected] = useState(false)
  const [result, setResult] = useState(false)

  const create = useCallback(
    async (account, args) => {
      setConnected(await web3Contract.connect(nodeSelected))
      setResult(
        await web3Contract.deploy(
          ContractAbi,
          ContractBin,
            args,
          [],
          account
        )
      )
    },
    [nodeSelected]
  )

  return { result, setResult, create }
}

export function useContract(nodeSelected) {
  const [connected, setConnected] = useState(false)

  useMemo(async () => {
    setConnected(await web3Contract.connect(nodeSelected))
    await web3Contract.create(
      ContractAbi,
      ContractReceipt.contractAddress,
      [],
      ContractReceipt.privacyGroupId
    )
  }, [nodeSelected])

  return { connected }
}

export function fetchAgreement(nodeSelected, account) {
  const { connected } = useContract(nodeSelected)
  const [count, setCount] = useState(0)

  useEffect(() => {
    async function agreementCall() {
      try {
        if (connected) {
          const c = await web3Contract.call('agreementDetails', [], account)
          setCount(c)
        }
      } catch (err) {
        return false
      }
    }
    agreementCall()
  }, [connected, account])

  return count
}
