import { useEffect, useState } from 'react'
import { Example } from '../../components/ClaimVerificationRequest'
import Sidebar from '../../partials/Sidebar'
import Header from '../../partials/Header'
import ClaimViewer from '../../partials/PostClaimsDisplay'
import useReclaimMultiClaimDataStore, {
    TSingleClaimData,
} from '../../stores/claims'
import { makePost } from '../../utils/posts'

type ModalPropType = {
    provider: string
    displayText: string
}

const MakePost: React.FC = () => {
    // const [modal, setModal] = useState<boolean>(false)
    const [providerDetails, setProviderDetails] =
        useState<ModalPropType | null>(null)

    const multiClaimsData = useReclaimMultiClaimDataStore(
        (state) => state.multiClaimsData
    )

    const makePostOnClick = async () => {
        const proofIDs = multiClaimsData.map((claim) => claim._id)

        try {
            const postID = await makePost('0x123', proofIDs)
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
                    setSidebarOpen={(val) => {}}
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
