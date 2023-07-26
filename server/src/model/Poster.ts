import { Schema, model, Document, Types } from 'mongoose'

interface IPoster extends Document {
    walletAddress: string
    claims: Types.ObjectId
}

const PosterSchema = new Schema<IPoster>({
    walletAddress: { type: String, required: true, unique: true },
    claims: [{ type: Schema.ObjectId, ref: 'Claim' }],
})

const Poster = model<IPoster>('Poster', PosterSchema)

export default Poster
