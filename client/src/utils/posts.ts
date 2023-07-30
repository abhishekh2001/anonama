import axios from 'axios'
import { TSingleClaimData } from '../stores/claims'

export interface IPost {
    _id: string
    proofs: TSingleClaimData[]
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

export const makePost = async (walletAddress: string, proofIDs: string[]) => {
    const url = `${import.meta.env.VITE_BASE_URL}/ama/post`
    const response = await axios.post(url, { walletAddress, proofIDs })
    console.log('got response: ', response)
    const d: { postID?: string } = response.data
    if (!d?.postID) throw new Error('unable to make post')
    return d.postID
}
