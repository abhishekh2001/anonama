import { create } from 'zustand'

export enum ClaimStatusEnum {
    fetching,
    success,
    fail,
    empty,
    remove,
}

export interface IClaim {
    provider: string
    data?: { [key: string]: string }
    createdAt?: Date
}

export type TSingleClaimData = {
    status: ClaimStatusEnum
    providerDisplayText: string
    callbackId: string
    claim: IClaim
}

interface reclaimURLStoreI {
    multiClaimsData: TSingleClaimData[]
    setClaimsData: (claimData: TSingleClaimData) => void
}

const useReclaimMultiClaimDataStore = create<reclaimURLStoreI>((set) => ({
    multiClaimsData: [],
    setClaimsData: (claimData: TSingleClaimData) => {
        const newClaim: TSingleClaimData = {
            ...claimData,
            status: ClaimStatusEnum.success,
        }
        set((state) => ({
            multiClaimsData: [...state.multiClaimsData, newClaim],
        }))
    },
}))

export default useReclaimMultiClaimDataStore
