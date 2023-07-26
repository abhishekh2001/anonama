const ProviderDataTypeMap = {
    instagram: 'followers',
    binance: 'value',
    employment: 'works at',
}

export type ClaimCategory = keyof typeof ProviderDataTypeMap

export enum ProofStatusEnum {
    pending = 'pending',
    success = 'success',
}
