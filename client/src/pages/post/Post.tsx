import { useEffect, useState } from 'react'
import {
    IPost,
    getSinglePost,
    makeCommentOnComment,
    makeCommentOnPost,
} from '../../utils/posts'
import { DisplayVerifiedClaims } from '../../components/ReclaimHandler'
import Header from '../../partials/Header'
import PostQuestion from '../../components/PostQuestion'
import CommentDisplay from '../../partials/Comment'
import { useParams } from 'react-router-dom'

type PostDisplayT = {
    postID: string
}

const Post: React.FC = () => {
    const { id } = useParams<{ id: string }>()

    return <>{id === undefined ? null : <ShowPostDetails postID={id} />}</>
}

const ShowPostDetails: React.FC<PostDisplayT> = ({ postID }) => {
    const [post, setPost] = useState<IPost>()
    const userWallet = '0x3341'

    const handleCommentSubmit = (text: string) => {
        makeCommentOnPost(userWallet, text, postID).then(() =>
            window.location.reload()
        )
    }

    const handleResponseSubmit = (text: string, commentID: string) => {
        makeCommentOnComment(userWallet, text, commentID).then(() =>
            window.location.reload()
        )
    }

    useEffect(() => {
        getSinglePost(postID).then((post) => setPost(post))
    }, [postID])

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header
                    sidebarOpen={true}
                    headerTitle={'view'}
                    setSidebarOpen={() => {}}
                />

                <main>
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            <div className="grid grid-cols-1 sm:auto-cols-max justify-center divide-y border-slate-200 border-2 rounded-lg p-8">
                                <div className="flex flex-col w-full  ">
                                    <p className="text-lg font-bold">{`AMA: ${
                                        post?._id ?? '...'
                                    }`}</p>

                                    <DisplayVerifiedClaims
                                        claimData={post?.proofs ?? []}
                                    />
                                </div>
                                <div>
                                    <p className="pt-2 text-xs text-gray-500">
                                        Add
                                    </p>
                                    <PostQuestion
                                        clickHandler={handleCommentSubmit}
                                    />
                                </div>
                                <div>
                                    {post?.comments?.map((comment) => (
                                        <CommentDisplay
                                            onSubmit={(text: string) =>
                                                handleResponseSubmit(
                                                    text,
                                                    comment._id
                                                )
                                            }
                                            comment={comment}
                                            key={comment._id}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* <div className="flex gap-2 items-center">
                <p className="text-xl">AMA: {post?._id.toString() ?? '...'}</p>
                <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 border border-rose-600">
                    Ask
                </button>
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                onClick={() => setWalletAddress('0x123456')}
            >
                Connect wallet
            </button> */}
            {/* {post && (
                <BodyContainer className="w-full p-8">
                    <div className="flex w-full">
                        <DisplayVerifiedClaims claimData={post.proofs} />
                    </div>
                </BodyContainer>
            )} */}
        </div>
    )
}

export default Post
