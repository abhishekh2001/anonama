import express from 'express'
import {
    getReclaimProofURL,
    handleCallback,
} from '../../controller/reclaim/urls.js'
import {
    insertProofTransactionStatus,
    retrieveProofTransactionStatus,
    updateProofTransactionStatus,
} from '../../controller/proofs/index'
import { IClaim } from '../../model/Claim.js'

const router = express.Router()

// define the home page route
router.get('/', (req, res) => {
    res.send('Reclaim endpoint')
})

router.get('/proof', async (req, res) => {
    const callbackId = req.query.callbackId
    try {
        const document = await retrieveProofTransactionStatus(
            callbackId as string
        )
        res.json({ document })
    } catch (error) {
        console.log('error')
        res.status(500).json({
            error:
                (error as Error).toString() ||
                'unable to retrieve proof status',
        })
    }
})

// Define an endpoint for requesting proofs
router.get('/request-proofs', async (req, res) => {
    try {
        const { reclaimUrl, callbackId } = await getReclaimProofURL()
        await insertProofTransactionStatus(callbackId)
        res.json({ reclaimUrl, callbackId })
    } catch (error) {
        console.error('Error requesting proofs:', error)
        res.status(500).json({ error: 'Failed to request proofs' })
    }
})

router.post('/callback', async (req, res) => {
    // Retrieve the callback ID from the URL parameters
    const callbackId = String(req.query.id)

    console.log(req.body)
    console.log(callbackId)

    try {
        const claimData = await handleCallback(req.body)
        console.log('done handling callback')
        await updateProofTransactionStatus(callbackId, claimData)
        res.json({ success: true })
    } catch (error) {
        // console.log('error: ', error)
        res.status(500).json({
            error: (error as Error).toString() || 'internal error',
        })
    }
})

export default router
