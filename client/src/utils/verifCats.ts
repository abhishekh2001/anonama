export interface VerificationCategoriesI {
    [category: string]: {
        [provider: string]: {
            displayText: string
        }
    }
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
