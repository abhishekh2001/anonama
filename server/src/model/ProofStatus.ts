import { Schema, model, Document, Types } from 'mongoose'

interface IProofStatus extends Document {
    callbackId: string
    claim: Types.ObjectId
    status: 'pending' | 'success'
}

const ProofStatusSchema = new Schema<IProofStatus>({
    callbackId: { type: String, required: true },
    claim: { type: Schema.ObjectId },
    status: { type: String, enum: ['pending', 'success'], required: true },
})

export default model<IProofStatus>('ProofStatus', ProofStatusSchema)

export { ProofStatusSchema, IProofStatus }
