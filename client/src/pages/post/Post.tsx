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
import { useAccount } from 'wagmi'

type PostDisplayT = {
    postID: string
}

const Post: React.FC = () => {
    const { id } = useParams<{ id: string }>()

    return <>{id === undefined ? null : <ShowPostDetails postID={id} />}</>
}

const ShowPostDetails: React.FC<PostDisplayT> = ({ postID }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [post, setPost] = useState<IPost>()

    const { address: userWallet } = useAccount()

    const handleCommentSubmit = (text: string) => {
        if (!userWallet) {
            setErrorMessage('wallet must be connected')
            return
        }
        makeCommentOnPost(userWallet, text, postID).then(() =>
            window.location.reload()
        )
    }

    const handleResponseSubmit = (text: string, commentID: string) => {
        if (!post) {
            setErrorMessage('post unavailable')
            return
        }

        if (!userWallet) {
            setErrorMessage('wallet must be connected to comment')
            return
        }

        if (post.walletAddress !== userWallet) {
            setErrorMessage('only the author of the post can reply')
        }

        makeCommentOnComment(userWallet, text, commentID).then(() =>
            window.location.reload()
        )
    }

    const clearAlert = () => setErrorMessage(null)

    useEffect(() => {
        console.log('error: ', errorMessage)
    }, [errorMessage])

    useEffect(() => {
        getSinglePost(postID).then((post) => setPost(post))
    }, [postID])

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header
                    sidebarOpen={true}
                    headerTitle={'VerifiedAMA'}
                    setSidebarOpen={() => {}}
                />

                <main>
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            <div className="grid grid-cols-1 sm:auto-cols-max justify-center divide-y border-slate-200 border-2 rounded-lg p-8">
                                <div className="flex flex-col w-full gap-1">
                                    <p className="text-xs text-gray-400">{`AMA: ${
                                        post?._id ?? '...'
                                    }`}</p>
                                    <p className="text-3xl font-bold my-2">
                                        {post?.title ?? ''}
                                    </p>
                                    <div className="p-4 border-0 rounded-md bg-slate-50">
                                        <p>{post?.body ?? ''}</p>
                                    </div>

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
                                    {errorMessage !== null && (
                                        <div
                                            className="bg-red-100 border border-red-400 text-red-700 p-2 text-sm rounded flex content-center items-center"
                                            role="alert"
                                        >
                                            <span className="">
                                                {errorMessage}
                                            </span>
                                            <span onClick={clearAlert}>
                                                <svg
                                                    className="fill-current h-6 w-6 text-red-500"
                                                    role="button"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <title>Close</title>
                                                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                                </svg>
                                            </span>
                                        </div>
                                    )}
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
