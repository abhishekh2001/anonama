import ProofStatus from '../../model/ProofStatus'

const insertProofTransactionStatus = async (callbackId: string) => {
    const newProofStat = new ProofStatus({
        callbackId,
        status: 'pending',
    })

    await newProofStat.save()
}

const retrieveProofTransactionStatus = (callbackId: string) => {}

const updateProofTransactionStatus = (callbackId: string, data: any) => {}

export {
    insertProofTransactionStatus,
    retrieveProofTransactionStatus,
    updateProofTransactionStatus,
}
