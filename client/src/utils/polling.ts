import axios from 'axios'

const pollAndUpdateClaimState = (callbackId: string) => {
    setInterval(async () => {
        const url = `${
            import.meta.env.VITE_BASE_URL
        }/reclaim/proof?callbackId=${callbackId}`
        const response = await axios.get(url)
        console.log('got response: ', response)
    }, 10000)
}

export { pollAndUpdateClaimState }
