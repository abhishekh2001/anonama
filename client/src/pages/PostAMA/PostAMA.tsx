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
import { ReclaimURLDisplay } from '../../components/ReclaimHandler'

const PostAMA: React.FC = () => {
    const walletAddress = useWalletStore((state) => state.walletAddress)
    const setWalletAddress = useWalletStore((state) => state.setWalletAddress)
    console.log(import.meta.env.VITE_TW_CLIENT_ID)
    return (
        <PageContainer>
            <HeaderContainer className="bg-blue-100">
                <h1 className="text-3xl font-bold underline">Post an AMA</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    onClick={() => setWalletAddress('0x123456')}
                >
                    Connect wallet
                </button>
            </HeaderContainer>
            <BodyContainer className="bg-yellow-100">
                <HalfContainer className="bg-orange-100">
                    <Categories />
                </HalfContainer>
                <HalfContainer className="bg-green-100">
                    <ReclaimURLDisplay
                        url="https://reactjs.org"
                        displayText="React JS"
                    />
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
            {/* <Category cat="socials" />
            <Category cat="finance" /> */}
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
}
const ProviderDisplay: React.FC<ProviderDisplayT> = ({ text }) => {
    return <ProviderHolder text={text} />
}

export default PostAMA
