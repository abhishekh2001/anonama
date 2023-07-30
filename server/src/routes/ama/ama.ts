import express from 'express'
import {
    createPost,
    getAllPosts,
    getWalletPosts,
} from '../../controller/ama/post'
import bodyParser from 'body-parser'
const router = express.Router()

router.use(express.json())

router.get('/posts', async (req, res) => {
    try {
        const result = await getAllPosts()
        res.json({ document: result })
    } catch (err) {
        res.status(500).json({ error: (err as Error).toString() })
    }
})

router.get('/posts/:walletAddress', async (req, res) => {
    try {
        const result = await getWalletPosts(req.params.walletAddress)
        res.json({ document: result })
    } catch (err) {
        res.status(500).json({ error: (err as Error).toString() })
    }
})

router.post('/post', async (req, res) => {
    const { walletAddress, proofIDs } = JSON.parse(req.body)
    console.log('post post: ', walletAddress, proofIDs)
    if (!walletAddress || !proofIDs) {
        res.status(500).json({ error: 'invalid body parameters passed' })
    } else {
        try {
            const post = await createPost(walletAddress, proofIDs)
            res.json({ postID: post._id })
        } catch (err) {
            console.log(err)
            res.status(400).json({ error: (err as Error).toString() })
        }
    }
})

export default router
