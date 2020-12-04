
const {PrivateKey, createUserAuth, Client, ThreadID} = require('@textile/hub')
const e2e = require('../utils/e2e-encrypt')
const keyInfo = {
  key:'be645tj5wtjuginby3fwnqhe57y',
  secret:'bcm7zjaxlipajgsm6qd6big7lv52cihf2whbbaji'
}

const threadDbId = [1, 85, 173, 231, 242, 36, 236, 106, 180, 7, 240, 13, 44, 247, 33, 194, 240, 34, 75,
  144, 96, 226, 57, 127, 86, 167, 252, 6, 151, 236, 250, 8, 104, 226]

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