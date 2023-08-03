import express from 'express'
import {
    addCommentToComment,
    addCommentToPost,
    createPost,
    getAllPosts,
    getPostFromPostID,
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

router.get('/post/:postID', async (req, res) => {
    try {
        const result = await getPostFromPostID(req.params.postID)
        res.json({ document: result })
    } catch (err) {
        res.status(500).json({ error: (err as Error).toString() })
    }
})

router.post('/post', async (req, res) => {
    const { walletAddress, proofIDs, title, body } = JSON.parse(req.body)
    console.log('post post: ', walletAddress, proofIDs, title, body)
    if (!walletAddress || !proofIDs) {
        res.status(500).json({ error: 'invalid body parameters passed' })
    } else {
        try {
            const post = await createPost(walletAddress, proofIDs, title, body)
            res.json({ postID: post._id })
        } catch (err) {
            console.log(err)
            res.status(400).json({ error: (err as Error).toString() })
        }
    }
})

router.post('/comment/:postID', async (req, res) => {
    const doc = JSON.parse(req.body)
    const postID = req.params.postID

    if (!doc.userWallet) {
        res.status(400).json({ error: 'requires userWallet' })
    } else if (!doc.text) {
        res.status(400).json({ error: 'comment text required' })
    } else {
        try {
            const updateRes = await addCommentToPost(postID, doc)
            res.json({ details: updateRes })
        } catch (err) {
            res.status(500).json({ error: (err as Error).toString() })
        }
    }
})
router.post('/commentResponse/:parentCommentID', async (req, res) => {
    const parentCommentID = req.params.parentCommentID
    const doc = JSON.parse(req.body)

    if (!doc.userWallet) {
        res.status(400).json({ error: 'requires userWallet' })
    } else if (!doc.text) {
        res.status(400).json({ error: 'comment text required' })
    } else {
        try {
            console.log(parentCommentID)
            const udpatedRes = await addCommentToComment(parentCommentID, doc)
            res.json({ details: udpatedRes })
        } catch (err) {
            res.status(500).json({ error: (err as Error).toString() })
        }
    }
})

export default router
