import { IClaim } from '../stores/claims'

export interface VerificationCategoriesI {
    [category: string]: {
        [provider: string]: {
            displayText: string
        }
    }
}

interface ProviderUtilsI {
    [provider: string]: {
        dataAccess: (params: IClaim['data']) => string
    }
}

export const ProviderUtils: ProviderUtilsI = {
    'facebook-friends-count': {
        dataAccess: (params) => {
            return 'num friends: ' + params?.friendsCount ?? '-'
        },
    },
    'google-login': {
        dataAccess: (params) => {
            const email = params?.emailAddress
            if (!email) return '-'
            return 'works at: ' + email.split('@')[1].split('.')[0]
        },
    },
}

export const verificationCategories: VerificationCategoriesI = {
    socials: {
        'facebook-friends-count': {
            displayText: 'Facebook friends count',
        },
        'instagram-followers': {
            displayText: 'Instagram followers count',
        },
    },
    employment: {
        'google-login': {
            displayText: 'Google hosting',
        },
    },
    finance: {
        'binance-asset-balance': {
            displayText: 'Binance asset',
        },
    },
    identity: {
        'uidai-aadhar': {
            displayText: 'Aadhar',
        },
    },
}

export type VerificationCategoryT = keyof typeof verificationCategories
