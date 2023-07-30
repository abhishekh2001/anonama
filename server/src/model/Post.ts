import { Schema, model, Document, Types } from 'mongoose'

interface IPost extends Document {
    proofs: Types.ObjectId
}

const PostSchema = new Schema<IPost>({
    proofs: [{ type: Schema.ObjectId, ref: 'ProofStatus' }],
})

const Post = model<IPost>('Post', PostSchema)

export default Post
