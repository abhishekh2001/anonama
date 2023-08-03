import Post, { Comment, IComment } from '../../model/Post'
import Poster from '../../model/Poster'

export const addCommentToComment = async (
    commentID: string,
    data: Partial<IComment>
) => {
    const comment = await Comment.findOne({ _id: commentID })
    if (!comment) throw new Error('Comment not found')

    let newChild
    try {
        newChild = new Comment(data)
        await newChild.save()
    } catch (err) {
        throw new Error('could not save child')
    }

    comment.childComments.push(newChild._id)
    await comment.save()
    return comment._id
}

export const addCommentToPost = async (
    postID: string,
    data: Partial<IComment>
) => {
    const post = await Post.findOne({ _id: postID })
    if (!post) {
        throw new Error(`no post found for ${postID}`)
    }

    const comment = new Comment(data)
    await comment.save()

    console.log(`saved data ${data.text} to ${comment._id} for post ${postID}`)

    const res = await Post.updateOne(
        { _id: postID },
        { $push: { comments: comment._id } }
    )
    console.log('update:', res)
    return comment._id
}

export const getAllPosts = async () => {
    const result = await Post.find({})
    return result
}

export const getPostFromPostID = async (postID: string) => {
    const post = await Post.findOne({ _id: postID })
        .populate('proofs')
        .populate({
            path: 'comments',
            populate: {
                path: 'childComments',
                model: 'Comment',
            },
        })
        .exec()
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

export const createPost = async (
    walletAddress: string,
    proofIDs: string[],
    title: string,
    body: string
) => {
    console.log('save with title: ', title)
    let post = new Post({ proofs: proofIDs, title: title, body: body })
    await post.save()

    let poster = await Poster.findOne({ walletAddress })
    if (!poster) {
        poster = new Poster({ walletAddress })
    }

    poster.posts.push(post._id)
    await poster.save()

    return post
}
