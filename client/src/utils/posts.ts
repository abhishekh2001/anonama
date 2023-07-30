import axios from 'axios'

export const makePost = async (walletAddress: string, proofIDs: string[]) => {
    const url = `${import.meta.env.VITE_BASE_URL}/ama/post`
    const response = await axios.post(url, { walletAddress, proofIDs })
    console.log('got response: ', response)
    const d: { postID?: string } = response.data
    if (!d?.postID) throw new Error('unable to make post')
    return d.postID
}
