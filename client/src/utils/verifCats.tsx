import { SubGroupT } from '../partials/Sidebar.types'
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
            displayText: 'Facebook friends',
        },
        'instagram-followers': {
            displayText: 'IG followers',
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

const catIcons: { [key: string]: JSX.Element } = {
    socials: (
        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
            <path
                className="fill-current text-slate-600"
                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
            />
            <path
                className="fill-current text-slate-400"
                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
            />
        </svg>
    ),
    employment: (
        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
            <path
                className="fill-current text-slate-700"
                d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z"
            />
            <path
                className="fill-current text-slate-600"
                d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z"
            />
            <path
                className="fill-current text-slate-400"
                d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z"
            />
        </svg>
    ),
    finance: (
        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
            <path
                className="fill-current text-slate-400"
                d="M13 6.068a6.035 6.035 0 0 1 4.932 4.933H24c-.486-5.846-5.154-10.515-11-11v6.067Z"
            />
            <path
                className="fill-current text-slate-700"
                d="M18.007 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z"
            />
            <path
                className="fill-current text-slate-600"
                d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z"
            />
        </svg>
    ),
    identity: (
        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
            <path
                className="fill-current text-slate-600"
                d="M8.07 16H10V8H8.07a8 8 0 110 8z"
            />
            <path
                className="fill-current text-slate-400"
                d="M15 12L8 6v5H0v2h8v5z"
            />
        </svg>
    ),
}

const sidebarManagerGroupMap = (
    providerHandler: (provider: string, displayText: string) => void
) => {
    const toRet = Object.keys(verificationCategories).map((category) => {
        const providersList = Object.keys(verificationCategories[category])
        const res: Partial<SubGroupT> = {
            groupIconSVG: catIcons[category],
            groupTitle: category,
            subcats: providersList.map((provider) => {
                return {
                    displayName:
                        verificationCategories[category][provider].displayText,
                    providerName: provider,
                    handler: () =>
                        providerHandler(
                            provider,
                            verificationCategories[category][provider]
                                .displayText
                        ),
                }
            }),
        }

        return res
    })

    console.log('sidebar manager built: ')
    console.log(toRet)

    return toRet
}

export type VerificationCategoryT = keyof typeof verificationCategories
export { sidebarManagerGroupMap }
