import { useEffect, useState } from 'react'
import {
    BodyContainer,
    HeaderContainer,
    PageContainer,
} from '../../components/Container'
import { IPost, getSinglePost } from '../../utils/posts'
import { DisplayVerifiedClaims } from '../../components/ReclaimHandler'

type PostDisplayT = {
    postID: string
}

const ViewPost: React.FC = () => {
    return (
        <PageContainer>
            <ShowPostDetails postID="64c684e685176629fddf4305" />
        </PageContainer>
    )
}

const ShowPostDetails: React.FC<PostDisplayT> = ({ postID }) => {
    const [post, setPost] = useState<IPost>()

    useEffect(() => {
        if (postID) getSinglePost(postID).then((post) => setPost(post))
    }, [postID])

    return (
        <PageContainer>
            <HeaderContainer>
                <div className="flex gap-2 items-center">
                    <p className="text-xl">
                        AMA: {post?._id.toString() ?? '...'}
                    </p>
                    <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 border border-rose-600">
                        Ask
                    </button>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Connect wallet
                </button>
            </HeaderContainer>
            {post && (
                <BodyContainer className="w-full p-8">
                    <div className="flex w-full">
                        <DisplayVerifiedClaims claimData={post.proofs} />
                    </div>
                </BodyContainer>
            )}
        </PageContainer>
    )
}

export default ViewPost
