import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {
    BodyContainer,
    HalfContainer,
    HeaderContainer,
    PageContainer,
    ProviderHolder,
} from '../../components/Container'
import useWalletStore from '../../stores/wallet'
import {
    VerificationCategoriesI,
    VerificationCategoryT,
    verificationCategories,
} from '../../utils/verifCats'
import {
    CategoriesContainer,
    CategoryContainer,
    CategoryText,
} from './components'
import { useState } from 'react'
import {
    DisplayVerifiedClaims,
    ReclaimURLDisplay,
} from '../../components/ReclaimHandler'
import useReclaimURLStore from '../../stores/reclaim'
import useReclaimMultiClaimDataStore from '../../stores/claims'

const PostAMA: React.FC = () => {
    const walletAddress = useWalletStore((state) => state.walletAddress)
    const setWalletAddress = useWalletStore((state) => state.setWalletAddress)
    const claimsData = useReclaimMultiClaimDataStore(
        (state) => state.multiClaimsData
    )
    console.log(import.meta.env.VITE_TW_CLIENT_ID)
    return (
        <PageContainer>
            {/* <HeaderContainer className="bg-blue-100"> */}
            <HeaderContainer>
                <p className="text-xl font-bold">Post an AMA</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    onClick={() => setWalletAddress('0x123456')}
                >
                    Connect wallet
                </button>
            </HeaderContainer>
            {/* <BodyContainer className="bg-yellow-100"> */}
            <BodyContainer>
                {/* <HalfContainer className="bg-orange-100"> */}
                <HalfContainer className="gap-4">
                    <Categories />
                    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 border border-orange-700 rounded">
                        Post
                    </button>
                </HalfContainer>
                {/* <HalfContainer className="bg-green-100 flex flex-col"> */}
                <HalfContainer className="flex flex-col gap-4">
                    <ReclaimURLDisplay
                        url="https://reactjs.org"
                        displayText="React JS"
                    />
                    <DisplayVerifiedClaims claimData={claimsData} />
                </HalfContainer>
            </BodyContainer>
        </PageContainer>
    )
}

const Categories: React.FC = () => {
    console.log(Object.keys(verificationCategories))
    return (
        <CategoriesContainer>
            {Object.keys(verificationCategories).map((cat) => (
                <Category
                    cat={cat as VerificationCategoryT}
                    key={cat}
                    providerDetails={verificationCategories[cat]}
                />
            ))}
        </CategoriesContainer>
    )
}

type CategoryPropsTypes = {
    cat: VerificationCategoryT
    providerDetails: VerificationCategoriesI['cat']
}

const Category: React.FC<CategoryPropsTypes> = ({
    cat,
    providerDetails,
}: CategoryPropsTypes) => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const toggleIsActive = () => setIsActive((st) => !st)
    console.log(providerDetails)

    return (
        <CategoryContainer>
            {isActive ? (
                <>
                    <div
                        style={{ display: 'flex', padding: '0', margin: '0' }}
                        onClick={toggleIsActive}
                    >
                        <ChevronDownIcon className="h-6 w-6 text-blue-500" />
                        <CategoryText text={cat as string} />
                    </div>
                    {Object.keys(providerDetails).map((provider) => {
                        const { displayText } = providerDetails[provider]
                        return (
                            <ProviderDisplay
                                text={displayText}
                                provider={provider}
                                key={provider}
                            />
                        )
                    })}
                </>
            ) : (
                <div
                    style={{ display: 'flex', padding: '0', margin: '0' }}
                    onClick={toggleIsActive}
                >
                    <ChevronRightIcon className="h-6 w-6 text-blue-500" />
                    <CategoryText text={cat as string} />
                </div>
            )}
        </CategoryContainer>
    )
}

type ProviderDisplayT = {
    text: string
    provider: string
}
const ProviderDisplay: React.FC<ProviderDisplayT> = ({ text, provider }) => {
    const fetchProviderData = useReclaimURLStore(
        (state) => state.fetchProviderURL
    )
    return (
        <ProviderHolder
            text={text}
            onClick={() => fetchProviderData(provider, text)}
        />
    )
}

export default PostAMA
