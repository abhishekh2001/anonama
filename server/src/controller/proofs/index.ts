import Claim, { IClaim } from '../../model/Claim'
import ProofStatus from '../../model/ProofStatus'

const insertProofTransactionStatus = async (callbackId: string) => {
    const newProofStat = new ProofStatus({
        callbackId,
        status: 'pending',
    })

    await newProofStat.save()

    return newProofStat._id
}

const retrieveProofTransactionStatus = async (callbackId: string) => {
    const document = await ProofStatus.findOne({ callbackId })
    if (!document) {
        throw new Error(`Cannot find proof status for ${callbackId}`)
    }

    return document
}

const updateProofTransactionStatus = async (
    callbackId: string,
    data: IClaim
) => {
    const result = await ProofStatus.updateOne(
        { callbackId },
        { status: 'success', proofData: data }
    )

    const claimResult = new Claim(data)

    console.log(`updated ${callbackId} successfully ${result}`)

    return result
}

export {
    insertProofTransactionStatus,
    retrieveProofTransactionStatus,
    updateProofTransactionStatus,
}
