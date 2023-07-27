import {
    insertProofTransactionStatus,
    retrieveProofTransactionStatus,
    updateProofTransactionStatus,
} from '../src/controller/proofs'
import 'dotenv/config'

import { connectDb } from '../db'

const testFunc = async () => {
    const cbid = '123'
    const id = await insertProofTransactionStatus(cbid)
    console.log(`inserted with ${id}`)

    const updated = await updateProofTransactionStatus(cbid, {
        provider: 'instagram',
        data: '1000',
    })
    console.log('updated: ', updated)

    const doc = await retrieveProofTransactionStatus(cbid)
    console.log('retireved doc')
    console.log(doc)
}

;(async () => {
    try {
        console.log(process.env.MONGODB_URI)
        await connectDb()
        await testFunc()
    } catch (error) {
        console.error('Error:', error)
    }
})()
