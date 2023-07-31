import { useEffect, useState } from 'react'
import ClaimVerificationRequestModal, {
    Example,
} from '../../components/ClaimVerificationRequest'
import Sidebar from '../../partials/Sidebar'

type ModalPropType = {
    provider: string
    displayText: string
}

const MakePost: React.FC = () => {
    // const [modal, setModal] = useState<boolean>(false)
    const [providerDetails, setProviderDetails] =
        useState<ModalPropType | null>(null)

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
        </div>
    )
}

export default MakePost
