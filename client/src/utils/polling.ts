import axios from 'axios'
import { ClaimStatusEnum, TSingleClaimData } from '../stores/claims'

const pollAndUpdateClaimState = (
    callbackId: string,
    setData: (d: TSingleClaimData) => void
) => {
    const interval = setInterval(async () => {
        const url = `${
            import.meta.env.VITE_BASE_URL
        }/reclaim/proof?callbackId=${callbackId}`
        const response: {
            document: Omit<TSingleClaimData, 'status'> & { status: string }
        } = (await axios.get(url)).data
        console.log('got response: ', response)
        const document = response['document']
        console.log('got document: ', document)
        if (document.status !== 'success') {
            return
        }
        clearInterval(interval)
        const claimData: TSingleClaimData = {
            _id: document._id,
            providerDisplayText: document.claim.provider,
            status: ClaimStatusEnum.success,
            callbackId: document.callbackId as string,
            claim: {
                provider: document.claim.provider,
                data: document.claim.data,
                createdAt: document.claim.createdAt,
            },
        }
        setData(claimData)
    }, 10000)
}

export { pollAndUpdateClaimState }
