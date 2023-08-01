import React, { useEffect } from 'react'
import useReclaimURLStore from '../stores/reclaim'
import { QRCodeSVG } from 'qrcode.react'

type CVRPropsT = {
    provider: string
    displayText: string
    modalShow: boolean
    onCloseSetState: (newStatus: boolean) => void
}

import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import useReclaimMultiClaimDataStore from '../stores/claims'
import { pollAndUpdateClaimState } from '../utils/polling'

export const Example: React.FC<CVRPropsT> = ({
    provider,
    displayText,
    onCloseSetState,
    modalShow,
}) => {
    console.log('display modal for ', provider)

    const setClaimsData = useReclaimMultiClaimDataStore(
        (state) => state.setClaimsData
    )
    const reclaimState = useReclaimURLStore()
    const { fetchProviderURL, reclaimURLData, resetURLData } = reclaimState

    const cleanUp = () => {
        resetURLData()
        onCloseSetState(false)
    }

    useEffect(() => {
        console.log('Example rendered')
    }, [])

    useEffect(() => {
        if (provider) fetchProviderURL(provider, displayText)
    }, [provider, fetchProviderURL, displayText])

    useEffect(() => {
        console.log('new data: ', reclaimURLData)
        if (reclaimURLData.callbackId)
            pollAndUpdateClaimState(
                reclaimURLData.callbackId,
                setClaimsData,
                cleanUp
            )
    }, [reclaimURLData, setClaimsData, cleanUp])

    useEffect(() => {
        console.log('have reclaimData: ', reclaimURLData)
    }, [reclaimURLData])

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={modalShow} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={() => onCloseSetState(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon
                                                className="h-6 w-6 text-red-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-base font-semibold leading-6 text-gray-900"
                                            >
                                                {
                                                    reclaimURLData.providerDisplayText
                                                }
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Verify details
                                                </p>
                                                <a
                                                    className="mt-2"
                                                    href={
                                                        reclaimURLData.reclaimUrl
                                                    }
                                                >
                                                    {reclaimURLData.reclaimUrl}
                                                </a>
                                                <QRCodeSVG
                                                    className="mt-2"
                                                    value={
                                                        reclaimURLData.reclaimUrl as string
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={() => onCloseSetState(false)}
                                    >
                                        Deactivate
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => onCloseSetState(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

const ClaimVerificationRequestModal: React.FC<CVRPropsT> = ({
    provider,
    displayText,
}) => {
    console.log('using: ', provider)
    const reclaimURLData = useReclaimURLStore((state) => state.reclaimURLData)
    const fetchProviderURL = useReclaimURLStore(
        (state) => state.fetchProviderURL
    )

    const [showModal, setShowModal] = React.useState(false)

    useEffect(() => {
        if (provider) fetchProviderURL(provider, displayText)
    }, [fetchProviderURL, displayText, provider])

    return (
        <>
            <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Login
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {reclaimURLData.providerDisplayText}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        <a href={reclaimURLData.reclaimUrl}>
                                            {reclaimURLData.reclaimUrl}
                                        </a>
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default ClaimVerificationRequestModal
