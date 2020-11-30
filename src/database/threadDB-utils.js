
const {PrivateKey, createUserAuth, Client, Where, ThreadID} = require('@textile/hub')
const e2e = require('./e2e-encrypt')
const keyInfo = {
  key:'be645tj5wtjuginby3fwnqhe57y',
  secret:'bcm7zjaxlipajgsm6qd6big7lv52cihf2whbbaji'
}

const threadDbId = [1, 85, 92, 242, 175, 51, 201, 224, 71, 75, 33, 208, 3, 51, 126, 58, 31, 171, 172, 185, 55,
  114, 41, 84, 57, 10, 139, 156, 191, 203, 211, 120, 176, 79]


export const authorizeUser = async (password)=>{
  try {
    const userAuth = await createUserAuth(keyInfo.key, keyInfo.secret)
    const seed = e2e.convertPass(password)
    const seedPhase = new Uint8Array(Buffer.from(seed))
    const identity = PrivateKey.fromRawEd25519Seed(seedPhase)
    const privateKey = await PrivateKey.fromString(identity.toString())
    const dbClient = await Client.withUserAuth(userAuth)
    const token = await dbClient.getToken(privateKey)
    console.log("User authorized!!!")
    return dbClient
  }catch (err){
    console.log('ERROR:',err)
    return null
  }
}

export const registerNewUser = async function(name, zipCode, number, address, orionPublicKey,
                                              role, privateKey, client){
  try {
    let publicKey = e2e.getPublicKey(privateKey)
    const threadId = ThreadID.fromBytes(threadDbId)
    const data = {
      address: address,
      name: name,
      zipCode: zipCode,
      number: number,
      orionPublicKey: orionPublicKey,
      role: role,
      publicKey: publicKey.toString("hex"),
      documentId: ["-1"],
      agreementContracts:[{id:"-1"}],
      procedureContract:[{id:"-1"}]
    }
    const status = await client.create(threadId, 'RegisterUser', [data])
    console.log("User registration status:",status)
    return true
  }catch(err){
    throw err
  }
}

export const getLoginUser = async function(privateKey, dbClient){
  try {
    let publicKey = e2e.getPublicKey(privateKey)
    const query = new Where('publicKey').eq(publicKey.toString("hex"))
    const threadId = ThreadID.fromBytes(threadDbId)
    const result = await dbClient.find(threadId, 'RegisterUser', query)
    console.log("LOGIN USER:",result)
    if (result.length<1){
      console.log("Please register user!")
      return null
    }
    return result[0]
  }catch (err) {
    throw err
  }
}

export const getAllUsers = async function(dbClient,loggedUser){
  let userKey = e2e.getPublicKey(loggedUser)
  const threadId = ThreadID.fromBytes(threadDbId)
  const registeredUsers = await dbClient.find(threadId, 'RegisterUser', {})
  console.log("UserDetails:",registeredUsers)
  const userType = {party:0, arbitrator:1, arbitralCourt:2}

  let caller
  let party = []
  let arbitrator = []
  let court = []

  for (let i=0;i<registeredUsers.length;i++){
    const value = {
      address: registeredUsers[i].address,
      name: registeredUsers[i].name,
      orionPublicKey: registeredUsers[i].orionPublicKey,
      publicKey: registeredUsers[i].publicKey
    }

    if (userKey.toString("hex") === registeredUsers[i].publicKey) {
      caller = value
    }else if (registeredUsers[i].role === userType.party){
      party.push(value)
    }else if (registeredUsers[i].role === userType.arbitrator){
      arbitrator.push(value)
    }
    else {
      court.push(value)
    }
  }

  return {
    party: party,
    arbitrator:arbitrator,
    court:court,
    caller: caller
  }
}

export const updateAgreementContracts = async function (dbClient, groupId, contractAddress, args, caller,
                                                        counterParty){
  const threadId = ThreadID.fromBytes(threadDbId)
  let partyAddress = [caller.address, args[5]]
  const date = new Date()
  const metaData = {
    law: args[3],
    disputeType: args[7].toString(),
    seat: args[1],
    language: args[2],
    claimantName: caller.name,
    respondentName: counterParty.name,
    documentName: 'DEMO DOC',
    createdAt: date.toDateString()
  }
  const metaDataStatus = await dbClient.create(threadId, 'AgreementMetaData', [metaData])

  for (let i=0; i<partyAddress.length;i++){
    const query = new Where('address').eq(partyAddress[i])
    const user = await dbClient.find(threadId, 'RegisterUser', query)
    console.log("USER222:",user)
    if (user[0].agreementContracts.length===1 && user[0].agreementContracts[0].id==="-1"){
      console.log("IFFFFF")
      user[0].agreementContracts = [{
        contractAddress:contractAddress,
        groupId:groupId,
        metaData: metaDataStatus[0]
      }]
    }else {
      console.log("ELSEE")
      user[0].agreementContracts.push({
        contractAddress:contractAddress,
        groupId:groupId,
        metaData: metaDataStatus[0]
      })
    }
    await dbClient.save(threadId,'RegisterUser',[user[0]])
    console.log("Updated!!:")
  }
}

export const updateProcedureContracts = async function (dbClient, groupId, contractAddress, args, caller,
                                                        counterParty){
  console.log("contractAddress:",contractAddress)
  let partyAddress = [args[3], args[4]]
  const date = new Date()
  const metaData = {
    name: args[0],
    description: args[1],
    agreementAddress: args[2],
    claimantName: caller.name,
    respondentName: counterParty.name,
    courtAddress: args[5],
    createdAt: date.toDateString()
  }
  const threadId = ThreadID.fromBytes(threadDbId)
  const metaDataStatus = await dbClient.create(threadId, 'ProcedureMetaData', [metaData])

  for (let i=0; i<partyAddress.length;i++){
    const query = new Where('address').eq(partyAddress[i])
    const user = await dbClient.find(threadId, 'RegisterUser', query)
    console.log("USER222:",user)
    if (user[0].procedureContract.length===1 && user[0].procedureContract[0].id==="-1"){
      console.log("IFFFFF")
      user[0].procedureContract = [{
        contractAddress:contractAddress,
        groupId:groupId,
        metaData: metaDataStatus[0]
      }]
    }else {
      console.log("ELSEE")
      user[0].procedureContract.push({
        contractAddress:contractAddress,
        groupId:groupId,
        metaData: metaDataStatus[0]
      })
    }
    await dbClient.save(threadId,'RegisterUser',[user[0]])
    console.log("Updated!!:")
  }
}

export const getAgreementContractAddress = async function(dbClient,privateKey){
  try {
    let publicKey = e2e.getPublicKey(privateKey)
    const query = new Where('publicKey').eq(publicKey.toString("hex"))
    const threadId = ThreadID.fromBytes(threadDbId)
    const result = await dbClient.find(threadId, 'RegisterUser', query)
    console.log("LOGIN USER:",result)
    if (result.length === 1 && result[0].agreementContracts[0].id==='-1') {
      return []
    }
    return result[0].agreementContracts
  }catch (err) {
    throw err
  }
}

export const getProcedureContractAddress = async function(dbClient,privateKey) {
  try {
    let publicKey = e2e.getPublicKey(privateKey)
    const query = new Where('publicKey').eq(publicKey.toString("hex"))
    const threadId = ThreadID.fromBytes(threadDbId)
    const result = await dbClient.find(threadId, 'RegisterUser', query)
    console.log("LOGIN USER:", result)
    if (result.length === 1 && result[0].procedureContract[0].id==='-1') {
      return []
    }
    return result[0].procedureContract
  } catch (err) {
    throw err
  }
}

export const getProcedureMetaData = async function(dbClient, id){
  try {
    const threadId = ThreadID.fromBytes(threadDbId)
    const result = await dbClient.findByID(threadId, 'ProcedureMetaData', id)
    console.log("ProcedureMetaData:", result)
    return result
  } catch (err) {
    throw err
  }
}

export const getAgreementMetaData = async function(dbClient, id){
  try {
    const threadId = ThreadID.fromBytes(threadDbId)
    const result = await dbClient.findByID(threadId, 'AgreementMetaData', id)
    console.log("AgreementMetaData:", result)
    return result
  } catch (err) {
    throw err
  }
}