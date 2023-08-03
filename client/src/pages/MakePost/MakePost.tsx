import { useEffect, useRef, useState } from 'react'
import { Example } from '../../components/ClaimVerificationRequest'
import Sidebar from '../../partials/Sidebar'
import Header from '../../partials/Header'
import ClaimViewer from '../../partials/PostClaimsDisplay'
import useReclaimMultiClaimDataStore from '../../stores/claims'
import { makePost } from '../../utils/posts'

type ModalPropType = {
    provider: string
    displayText: string
}

const MakePost: React.FC = () => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const titleInput = useRef<HTMLInputElement>(null)
    const [providerDetails, setProviderDetails] =
        useState<ModalPropType | null>(null)

    const multiClaimsData = useReclaimMultiClaimDataStore(
        (state) => state.multiClaimsData
    )

    const makePostOnClick = async () => {
        const proofIDs = multiClaimsData.map((claim) => claim._id)
        if (!textAreaRef.current || !titleInput.current) {
            throw new Error('empty text fields')
        }

        console.log(
            'have: ',
            titleInput.current.value,
            textAreaRef.current.value
        )

        try {
            const postID = await makePost(
                '0x123',
                proofIDs,
                titleInput.current.value,
                textAreaRef.current.value
            )
            console.log('made post:', postID)
        } catch (err) {
            console.log('could not make post: ', err)
        }
    }

    const handleCategoryClick = (provider: string, displayText: string) => {
        console.log('click registered for ', provider)
        setProviderDetails({ provider, displayText })
        // setModal(true)
    }

    useEffect(() => {
        console.log('new reclaimURL: ', providerDetails?.provider)
    }, [providerDetails])

    const handleOnModalClose = (status: boolean) => {
        if (status === false) setProviderDetails(null)
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* <p className="text-xl">Make a post</p> */}
            <Sidebar handleCategoryClick={handleCategoryClick} />
            {providerDetails && (
                <Example
                    provider={providerDetails.provider}
                    displayText={providerDetails.displayText}
                    modalShow={providerDetails !== null}
                    onCloseSetState={handleOnModalClose}
                />
            )}

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header
                    sidebarOpen={true}
                    headerTitle={'Post an AMA'}
                    setSidebarOpen={() => {}}
                />

                <main>
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                <button
                                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                    onClick={makePostOnClick}
                                >
                                    <svg
                                        className="w-4 h-4 fill-current opacity-50 shrink-0"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <span className="hidden xs:block ml-2">
                                        Make post
                                    </span>
                                </button>
                            </div>
                            <div className="py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <label htmlFor="title" className="sr-only">
                                    Title
                                </label>
                                <input
                                    ref={titleInput}
                                    id="title"
                                    className="w-1/2 p-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 focus:outline-none"
                                    placeholder="Title"
                                    required
                                ></input>
                            </div>
                            <div className="py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <label htmlFor="comment" className="sr-only">
                                    Your comment
                                </label>
                                <textarea
                                    ref={textAreaRef}
                                    id="comment"
                                    rows={4}
                                    className="w-full p-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 focus:outline-none"
                                    placeholder="Post body..."
                                    required
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-12 gap-6">
                                {multiClaimsData.map((claim) => {
                                    return <ClaimViewer claim={claim} />
                                })}
                                {/* <ClaimViewer claim={claim} /> */}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default MakePost
