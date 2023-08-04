import axios from 'axios'
import { TSingleClaimData } from '../stores/claims'

export interface IComment {
    _id: string
    userWallet: string
    text: string
    childComments: IComment[]
    createdAt?: Date
}
export interface IPost {
    _id: string
    title: string
    walletAddress: string
    body: string
    proofs: TSingleClaimData[]
    comments?: IComment[]
}

export const getAllPosts = async () => {
    const url = `${import.meta.env.VITE_BASE_URL}/ama/posts`
    const response = await axios.get(url)
    console.log('got response:', response)
    return response.data.document
}

export const getWalletPosts = async (walletAddress: string) => {
    const url = `${import.meta.env.VITE_BASE_URL}/ama/posts/${walletAddress}`
    const response = await axios.get(url)
    console.log('got wallet posts: ', response.data)
}

export const getSinglePost = async (postID: string) => {
    const url = `${import.meta.env.VITE_BASE_URL}/ama/post/${postID}`
    const response = await axios.get(url)
    console.log('got response: ', response.data)
    const res: IPost = response.data.document

    console.log('got resonse: ', response)
    return res
}

export const makePost = async (
    walletAddress: string,
    proofIDs: string[],
    title: string,
    body: string
) => {
    const url = `${import.meta.env.VITE_BASE_URL}/ama/post`
    const response = await axios.post(url, {
        walletAddress,
        proofIDs,
        title,
        body,
    })
    console.log('got response: ', response)
    const d: { postID?: string } = response.data
    if (!d?.postID) throw new Error('unable to make post')
    return d.postID
}

export const makeCommentOnPost = async (
    userWallet: string,
    text: string,
    postID: string
) => {
    const data = {
        userWallet,
        text,
    }

    const url = `${import.meta.env.VITE_BASE_URL}/ama/comment/${postID}`
    const response = await axios.post(url, data)
    const commentID = response?.data?.details
    return commentID
}

export const makeCommentOnComment = async (
    userWallet: string,
    text: string,
    commentID: string
) => {
    const data = {
        userWallet,
        text,
    }

    const url = `${
        import.meta.env.VITE_BASE_URL
    }/ama/commentResponse/${commentID}`
    const response = await axios.post(url, data)
    const newCommentID = response?.data?.details
    return newCommentID
}
