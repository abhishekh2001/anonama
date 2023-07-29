import { create } from 'zustand'
import axios from 'axios'

enum ReclaimURLStatusEnum {
    fetching,
    success,
    fail,
    empty,
}

interface reclaimURLStoreI {
    reclaimURLData: {
        status: ReclaimURLStatusEnum
        providerDisplayText: string | undefined
        reclaimUrl: string | undefined
        callbackId: string | undefined
    }
    fetchProviderURL: (provider: string, providerDisplayText: string) => void
}

const useReclaimURLStore = create<reclaimURLStoreI>((set) => ({
    reclaimURLData: {
        status: ReclaimURLStatusEnum.empty,
        providerDisplayText: undefined,
        reclaimUrl: undefined,
        callbackId: undefined,
    },
    fetchProviderURL: async (provider: string, providerDisplayText: string) => {
        const url = `${
            import.meta.env.VITE_BASE_URL
        }/reclaim/request-proofs/${provider}`
        console.log('calling url: ', url)

        const response: Omit<
            reclaimURLStoreI['reclaimURLData'],
            'status' | 'providerDisplayText'
        > = (await axios.get(url)).data
        console.log('got response: ', response)
        set({
            reclaimURLData: {
                ...response,
                providerDisplayText: providerDisplayText,
                status: ReclaimURLStatusEnum.success,
            },
        })
    },
}))

export default useReclaimURLStore
