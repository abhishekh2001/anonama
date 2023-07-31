import { Dispatch, SetStateAction } from 'react'

export type SubCatT = {
    displayName: string
    providerName: string
    handler: () => void
}

export type SubGroupT = {
    groupTitle: string
    groupIconSVG: JSX.Element
    handleClick: () => void
    open: boolean
    setSidebarExpanded: Dispatch<SetStateAction<boolean>>
    sidebarExpanded: boolean
    subcats: SubCatT[]
}
