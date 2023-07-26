import { Schema, model, Document } from 'mongoose'

// Interface for the "claim" object within ProofStatus document
interface IClaim {
    provider: string
    data: string | number
}

// Interface for the ProofStatus document
interface IProofStatus extends Document {
    sessionId: string
    claim: IClaim
    status: 'pending' | 'success'
    createdAt: Date
}

// Create the Mongoose Schema for the "claim" object
const ClaimSchema = new Schema<IClaim>({
    provider: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true }, // Allow either string or number type for "data"
})

// Create the Mongoose Schema for ProofStatus
const ProofStatusSchema = new Schema<IProofStatus>({
    sessionId: { type: String, required: true },
    claim: { type: ClaimSchema, required: true },
    status: { type: String, enum: ['pending', 'success'], required: true },
    createdAt: { type: Date, default: Date.now }, // Add the createdAt field with default value
})

// Create and export the Mongoose model
export default model<IProofStatus>('ProofStatus', ProofStatusSchema)
