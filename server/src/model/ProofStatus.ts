import { Schema, model, Document, Types } from 'mongoose'

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

interface IProofStatus extends Document {
    callbackId: string
    claim: IClaim
    status: 'pending' | 'success'
}

const ProofStatusSchema = new Schema<IProofStatus>({
    callbackId: { type: String, required: true },
    claim: ClaimSchema,
    status: { type: String, enum: ['pending', 'success'], required: true },
})

export default model<IProofStatus>('ProofStatus', ProofStatusSchema)

export { ProofStatusSchema, IProofStatus, IClaim, ClaimSchema }
