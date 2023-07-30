import { Schema, model, Document, Types } from 'mongoose'

interface IPoster extends Document {
    walletAddress: string
    posts: Types.ObjectId[]
}

const PosterSchema = new Schema<IPoster>({
    walletAddress: { type: String, required: true, unique: true },
    posts: [{ type: Schema.ObjectId, ref: 'Post' }],
})

const Poster = model<IPoster>('Poster', PosterSchema)

export default Poster
