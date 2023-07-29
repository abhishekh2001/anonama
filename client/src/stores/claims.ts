import { create } from 'zustand'

enum ClaimStatusEnum {
    fetching,
    success,
    fail,
    empty,
}

type SingleClaimData = {
    claimID: string | undefined
    status: ClaimStatusEnum
    providerDisplayText: string | undefined
    callbackId: string
}

interface reclaimURLStoreI {
    multiClaimsData: SingleClaimData[]
    setClaimsData: (claimData: SingleClaimData) => void
}

const useReclaimURLStore = create<reclaimURLStoreI>((set) => ({
    multiClaimsData: [],
    setClaimsData: (claimData: SingleClaimData) => {
        const newClaim: SingleClaimData = {
            ...claimData,
            status: ClaimStatusEnum.success,
        }
        set((state) => ({
            multiClaimsData: [...state.multiClaimsData, newClaim],
        }))
    },
}))

export default useReclaimURLStore
