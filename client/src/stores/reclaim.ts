import { create } from 'zustand'
import axios from 'axios'

interface reclaimURLStoreI {
    reclaimURLData: any
}

const useReclaimURLStore = create<reclaimURLStoreI>((set) => ({
    reclaimURLData: {},
    fetch: async (provider: string) => {
        const url = `${
            import.meta.env.BASE_URL
        }/reclaim/request-proofs/${provider}`
        const response = await axios.get(url)
        console.log('got respons: ', response)
        set({ reclaimURLData: response })
    },
}))

export default useReclaimURLStore
