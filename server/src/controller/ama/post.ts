import Post from '../../model/Post'
import Poster from '../../model/Poster'

export const getAllPosts = async () => {
    const result = await Post.find({})
    return result
}

export const getPostFromPostID = async (postID: string) => {
    const post = await Post.findOne({ _id: postID }).populate('proofs')
    if (!post) {
        throw new Error('post not found')
    }

    return post
}

export const getWalletPosts = async (walletAddress: string) => {
    const poster = await Poster.findOne({ walletAddress })
        .populate({
            path: 'posts',
            populate: {
                path: 'proofs',
                model: 'ProofStatus',
            },
        })
        .exec()
    // .populate('proofs')
    console.log('got poster: ', poster)
    if (!poster) return null
    return poster
}

export const createPost = async (walletAddress: string, proofIDs: string[]) => {
    let post = new Post({ proofs: proofIDs })
    await post.save()

    let poster = await Poster.findOne({ walletAddress })
    if (!poster) {
        poster = new Poster({ walletAddress })
    }

    poster.posts.push(post._id)
    await poster.save()

    return post
}
