
const {PrivateKey, createUserAuth, Client, ThreadID} = require('@textile/hub')
const e2e = require('../utils/e2e-encrypt')
const keyInfo = {
  key:'be645tj5wtjuginby3fwnqhe57y',
  secret:'bcm7zjaxlipajgsm6qd6big7lv52cihf2whbbaji'
}

const threadDbId = [1, 85, 213, 17, 54, 129, 83, 10, 44, 133, 138, 32, 158, 111, 255, 125, 20, 112,
  32, 44, 198, 229, 202, 174, 142, 194, 133, 176, 140, 187, 124, 54, 148, 80]

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