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
    resetURLData: () => void
}

const initData = {
    status: ReclaimURLStatusEnum.empty,
    providerDisplayText: undefined,
    reclaimUrl: undefined,
    callbackId: undefined,
}

const useReclaimURLStore = create<reclaimURLStoreI>((set) => ({
    reclaimURLData: initData,
    resetURLData: () => {
        set({
            reclaimURLData: initData,
        })
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
