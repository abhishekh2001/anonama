import { Schema, model, Document, Types } from 'mongoose'

export interface IComment {
    userWallet: string
    text: string
    childComments: Types.ObjectId[]
    createdAt?: Date
}

const CommentSchema = new Schema<IComment>({
    userWallet: { type: String, required: true },
    text: { type: String, required: true },
    childComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, required: true, default: Date.now },
})

const Comment = model('Comment', CommentSchema)

interface IPost extends Document {
    title: string
    body: string
    proofs: Types.ObjectId
    comments: Types.ObjectId[]
    walletAddress: string
}

const PostSchema = new Schema<IPost>({
    title: { type: String, required: true },
    body: { type: String, required: true },
    proofs: [{ type: Schema.Types.ObjectId, ref: 'ProofStatus' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    walletAddress: { type: String, required: true },
})

const Post = model<IPost>('Post', PostSchema)

export default Post
export { Comment }
