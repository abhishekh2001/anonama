const ProviderDataTypeMap = {
    'facebook-follower-count': 'followers',
    'binance-asset-balance': 'balance value',
    'google-login': 'works at',
}

export type ClaimCategory = keyof typeof ProviderDataTypeMap
export function isValueClaimCategory(p: string): boolean {
    return Object.keys(ProviderDataTypeMap).includes(p)
}

export enum ProofStatusEnum {
    pending = 'pending',
    success = 'success',
}
