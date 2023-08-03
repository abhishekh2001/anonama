import React, { useState, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import SidebarLinkGroup from './SidebarLinkGroup'
import SBSubGroup from './SidebarLinkSubGroups'
import { sidebarManagerGroupMap } from '../utils/verifCats'

type SidebarPropsT = {
    handleCategoryClick: (provider: string, text: string) => void
}

const Sidebar: React.FC<SidebarPropsT> = ({ handleCategoryClick }) => {
    const catMap = sidebarManagerGroupMap(handleCategoryClick)

    const location = useLocation()
    const { pathname } = location
    console.log('pathname: ', pathname)

    const trigger = useRef(null)
    const sidebar = useRef(null)

    const sidebarOpen = true

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null
            ? false
            : storedSidebarExpanded === 'true'
    )

    // close if the esc key is pressed

    return (
        <div>
            {/* Sidebar backdrop (mobile only) */}
            <div
                className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
                    sidebarOpen
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden="true"
            ></div>

            {/* Sidebar */}
            <div
                id="sidebar"
                ref={sidebar}
                className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-64'
                }`}
            >
                {/* Sidebar header */}
                <div className="flex justify-between mb-10 pr-3 sm:px-2">
                    {/* Close button */}
                    <button
                        ref={trigger}
                        className="lg:hidden text-slate-500 hover:text-slate-400"
                        aria-controls="sidebar"
                        aria-expanded={sidebarOpen}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                        </svg>
                    </button>
                    {/* Logo */}
                    <NavLink end to="/" className="block">
                        <svg width="32" height="32" viewBox="0 0 32 32">
                            <defs>
                                <linearGradient
                                    x1="28.538%"
                                    y1="20.229%"
                                    x2="100%"
                                    y2="108.156%"
                                    id="logo-a"
                                >
                                    <stop
                                        stopColor="#A5B4FC"
                                        stopOpacity="0"
                                        offset="0%"
                                    />
                                    <stop stopColor="#A5B4FC" offset="100%" />
                                </linearGradient>
                                <linearGradient
                                    x1="88.638%"
                                    y1="29.267%"
                                    x2="22.42%"
                                    y2="100%"
                                    id="logo-b"
                                >
                                    <stop
                                        stopColor="#38BDF8"
                                        stopOpacity="0"
                                        offset="0%"
                                    />
                                    <stop stopColor="#38BDF8" offset="100%" />
                                </linearGradient>
                            </defs>
                            <rect
                                fill="#6366F1"
                                width="32"
                                height="32"
                                rx="16"
                            />
                            <path
                                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                                fill="#4F46E5"
                            />
                            <path
                                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                                fill="url(#logo-a)"
                            />
                            <path
                                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                                fill="url(#logo-b)"
                            />
                        </svg>
                    </NavLink>
                </div>

                {/* Links */}

                <div className="space-y-8">
                    {/* Verification */}
                    <div>
                        <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                            <span
                                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                                aria-hidden="true"
                            >
                                •••
                            </span>
                            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                Verification
                            </span>
                        </h3>

                        <ul className="mt-3">
                            {catMap.map((cat) => {
                                return (
                                    <SidebarLinkGroup
                                        activecondition={false}
                                        key={cat.groupTitle ?? ''}
                                    >
                                        {(handleClick, open) => {
                                            return (
                                                <SBSubGroup
                                                    groupIconSVG={
                                                        cat?.groupIconSVG ?? (
                                                            <></>
                                                        )
                                                    }
                                                    groupTitle={
                                                        cat?.groupTitle ?? '-'
                                                    }
                                                    subcats={cat?.subcats ?? []}
                                                    handleClick={handleClick}
                                                    open={open}
                                                    setSidebarExpanded={
                                                        setSidebarExpanded
                                                    }
                                                    sidebarExpanded={
                                                        sidebarExpanded
                                                    }
                                                />
                                            )
                                        }}
                                    </SidebarLinkGroup>
                                )
                            })}
                        </ul>
                        {/* <ul className="mt-3">
                        <SidebarLinkGroup activecondition={false}>
                            {(handleClick, open) => {
                                return (
                                    <SBSubGroup
                                        groupIconSVGClassName="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                                        groupTitle="socials"
                                        subcats={[]}
                                        handleClick={handleClick}
                                        open={open}
                                        setSidebarExpanded={setSidebarExpanded}
                                        sidebarExpanded={sidebarExpanded}
                                    />
                                )
                            }}
                        </SidebarLinkGroup>
                    </ul> */}
                        {/* Pages group */}
                    </div>
                    {/* More group */}
                    <div>
                        <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                            <span
                                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                                aria-hidden="true"
                            >
                                •••
                            </span>
                            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                More
                            </span>
                        </h3>
                        <ul className="mt-3">
                            {/* Authentication */}
                            <SidebarLinkGroup activecondition={false}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-slate-200 truncate transition duration-150 ${
                                                    open
                                                        ? 'hover:text-slate-200'
                                                        : 'hover:text-white'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(
                                                              true
                                                          )
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg
                                                            className="shrink-0 h-6 w-6"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                className="fill-current text-slate-600"
                                                                d="M8.07 16H10V8H8.07a8 8 0 110 8z"
                                                            />
                                                            <path
                                                                className="fill-current text-slate-400"
                                                                d="M15 12L8 6v5H0v2h8v5z"
                                                            />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Posts
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg
                                                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                                                open &&
                                                                'rotate-180'
                                                            }`}
                                                            viewBox="0 0 12 12"
                                                        >
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                                <ul
                                                    className={`pl-9 mt-1 ${
                                                        !open && 'hidden'
                                                    }`}
                                                >
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/signin"
                                                            className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Sign in
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/signup"
                                                            className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Sign up
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/reset-password"
                                                            className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Reset Password
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                            {/* Onboarding */}
                            <SidebarLinkGroup activecondition={false}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-slate-200 truncate transition duration-150 ${
                                                    open
                                                        ? 'hover:text-slate-200'
                                                        : 'hover:text-white'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(
                                                              true
                                                          )
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg
                                                            className="shrink-0 h-6 w-6"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                className="fill-current text-slate-600"
                                                                d="M19 5h1v14h-2V7.414L5.707 19.707 5 19H4V5h2v11.586L18.293 4.293 19 5Z"
                                                            />
                                                            <path
                                                                className="fill-current text-slate-400"
                                                                d="M5 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM5 23a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                                                            />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Claims
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg
                                                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                                                open &&
                                                                'rotate-180'
                                                            }`}
                                                            viewBox="0 0 12 12"
                                                        >
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                                <ul
                                                    className={`pl-9 mt-1 ${
                                                        !open && 'hidden'
                                                    }`}
                                                >
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/onboarding-01"
                                                            className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Step 1
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/onboarding-02"
                                                            className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Step 2
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/onboarding-03"
                                                            className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Step 3
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/onboarding-04"
                                                            className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Step 4
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                            {/* Components */}
                            <SidebarLinkGroup
                                activecondition={pathname.includes('component')}
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-slate-200 truncate transition duration-150 ${
                                                    pathname.includes(
                                                        'component'
                                                    )
                                                        ? 'hover:text-slate-200'
                                                        : 'hover:text-white'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(
                                                              true
                                                          )
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg
                                                            className="shrink-0 h-6 w-6"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className={`fill-current ${
                                                                    pathname.includes(
                                                                        'component'
                                                                    )
                                                                        ? 'text-indigo-500'
                                                                        : 'text-slate-600'
                                                                }`}
                                                                cx="16"
                                                                cy="8"
                                                                r="8"
                                                            />
                                                            <circle
                                                                className={`fill-current ${
                                                                    pathname.includes(
                                                                        'component'
                                                                    )
                                                                        ? 'text-indigo-300'
                                                                        : 'text-slate-400'
                                                                }`}
                                                                cx="8"
                                                                cy="16"
                                                                r="8"
                                                            />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            About
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg
                                                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                                                open &&
                                                                'rotate-180'
                                                            }`}
                                                            viewBox="0 0 12 12"
                                                        >
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                                <ul
                                                    className={`pl-9 mt-1 ${
                                                        !open && 'hidden'
                                                    }`}
                                                >
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/component/button"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-indigo-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Button
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/component/form"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-indigo-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Input Form
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/component/dropdown"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-indigo-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Dropdown
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/component/alert"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-indigo-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Alert & Banner
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/component/modal"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-indigo-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Modal
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/component/pagination"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-indigo-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Pagination
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/component/tabs"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-indigo-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Tabs
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/component/breadcrumb"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-indigo-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Breadcrumb
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/component/badge"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-indigo-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Badge
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/component/avatar"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-indigo-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Avatar
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/component/tooltip"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-indigo-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Tooltip
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/component/accordion"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-indigo-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Accordion
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <NavLink
                                                            end
                                                            to="/component/icons"
                                                            className={({
                                                                isActive,
                                                            }) =>
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-indigo-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Icons
                                                            </span>
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    )
                                }}
                            </SidebarLinkGroup>
                        </ul>
                    </div>
                </div>

                {/* Expand / collapse button */}
                <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
                    <div className="px-3 py-2">
                        <button
                            onClick={() => setSidebarExpanded(!sidebarExpanded)}
                        >
                            <span className="sr-only">
                                Expand / collapse sidebar
                            </span>
                            <svg
                                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className="text-slate-400"
                                    d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                                />
                                <path
                                    className="text-slate-600"
                                    d="M3 23H1V1h2z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
