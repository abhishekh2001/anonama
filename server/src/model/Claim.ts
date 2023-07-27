import { Schema, model } from 'mongoose'

interface IClaim {
    provider: string
    data?: any
    createdAt?: Date
}

const ClaimSchema = new Schema<IClaim>({
    provider: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
})

export default model<IClaim>('Claim', ClaimSchema)
export { IClaim }
