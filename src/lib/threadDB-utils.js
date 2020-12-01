
const {PrivateKey, createUserAuth, Client, ThreadID} = require('@textile/hub')
const e2e = require('../utils/e2e-encrypt')
const keyInfo = {
  key:'be645tj5wtjuginby3fwnqhe57y',
  secret:'bcm7zjaxlipajgsm6qd6big7lv52cihf2whbbaji'
}

const threadDbId = [1, 85, 125, 167, 248, 60, 81, 105, 176, 189, 223, 217, 159, 71, 126, 195, 153, 51, 218,
  32, 207, 167, 220, 57, 42, 7, 79, 162, 26, 103, 138, 233, 27, 0]
const threadId = ThreadID.fromBytes(threadDbId)

export const authorizeUser = async (password)=>{
  try {
    const userAuth = await createUserAuth(keyInfo.key, keyInfo.secret)
    const seed = e2e.calculateHash(password)
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

export const insertDataToDB = async (client, schemaName, data)=>{
    const status = await client.create(threadId, schemaName, [data])
    console.log("status:", status)
    return status
}

export const findFromDB = async (client, schemaName, query)=>{
  return await client.find(threadId, schemaName, query)
}

export const findById = async (client, schemaName, id)=>{
  return await client.findByID(threadId, schemaName, id)
}

export const updateData = async (client, schemaName, data)=>{
  const result = client.save(threadId,schemaName,[data])
  return true
}