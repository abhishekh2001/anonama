import { useState } from 'react'
import { IComment } from '../utils/posts'
import PostQuestion from '../components/PostQuestion'

type CommentProps = {
    comment: IComment
    onSubmit: (text: string) => void
}

const CommentDisplay: React.FC<CommentProps> = ({ comment, onSubmit }) => {
    const [isReply, setIsReply] = useState<boolean>(false)

    const handleReplyClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        event.preventDefault()
        setIsReply(true)
    }

    return (
        <div className="p-4 border-2 my-4 divide-y">
            <div>
                <p className="text-sm">{comment.text}</p>
                <a
                    href="#"
                    className="text-xs text-slate-500"
                    onClick={handleReplyClick}
                >
                    Reply
                </a>
                {isReply && (
                    <div className="sm:w-full lg:w-1/2">
                        <PostQuestion clickHandler={onSubmit} />
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm ml-4 mt-4">
                    {comment.childComments?.[0]?.text}
                </p>
            </div>
        </div>
    )
}

export default CommentDisplay
