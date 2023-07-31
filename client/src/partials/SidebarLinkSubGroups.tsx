import React from 'react'
import { SubGroupT } from './Sidebar.types'

const SBSubGroup: React.FC<SubGroupT> = ({
    groupIconSVG,
    groupTitle,
    subcats,
    handleClick,
    open,
    setSidebarExpanded,
    sidebarExpanded,
}) => {
    const pathname = '1234'
    return (
        <React.Fragment>
            <a
                href="#0"
                className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('dashboard')
                        ? 'hover:text-slate-200'
                        : 'hover:text-white'
                }`}
                onClick={(e) => {
                    e.preventDefault()
                    sidebarExpanded ? handleClick() : setSidebarExpanded(true)
                }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {groupIconSVG}
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            {groupTitle}
                        </span>
                    </div>
                    {/* Icon */}
                    <div className="flex shrink-0 ml-2">
                        <svg
                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && 'rotate-180'
                            }`}
                            viewBox="0 0 12 12"
                        >
                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                        </svg>
                    </div>
                </div>
            </a>

            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                    {subcats.map((subcat) => {
                        return (
                            <li
                                className="mb-1 last:mb-0"
                                onClick={subcat.handler}
                                key={subcat.providerName}
                            >
                                <span className="text-slate-400 hover:text-slate-200 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    {subcat.displayName}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                    <li className="mb-1 last:mb-0">
                        <span className="text-slate-400 hover:text-slate-200 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Kanban
                        </span>
                    </li>
                    <li className="mb-1 last:mb-0">
                        <span className="text-slate-400 hover:text-slate-200 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            List
                        </span>
                    </li>
                </ul>
            </div> */}
        </React.Fragment>
    )
}

export default SBSubGroup
