import { Schema, model } from 'mongoose'
import { ClaimCategory } from '../types/Claim'

interface IClaim {
    provider: ClaimCategory
    data?: string
    createdAt: Date
}

const ClaimSchema = new Schema<IClaim>({
    provider: { type: String, required: true },
    data: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
})

export default model<IClaim>('Claim', ClaimSchema)
export { IClaim }
