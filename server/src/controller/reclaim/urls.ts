import { reclaimprotocol } from '@reclaimprotocol/reclaim-sdk'

const reclaim = new reclaimprotocol.Reclaim()

const getReclaimProofURL = async () => {
    console.log(process.env.CALLBACK_DOMAIN)
    const callback_url = `${process.env.CALLBACK_DOMAIN}/reclaim/callback/`

    // 'https://eok75hfhcykzyj4.m.pipedream.net'

    try {
        const request = reclaim.requestProofs({
            title: 'Facebook Coin',
            baseCallbackUrl: callback_url,
            requestedProofs: [
                new reclaim.CustomProvider({
                    provider: 'facebook-friends-count',
                    payload: {},
                }),
            ],
        })
        // Store the callback Id and Reclaim URL in your database
        const { callbackId } = request
        const reclaimUrl = await request.getReclaimUrl()

        return {
            reclaimUrl,
            callbackId,
        }
    } catch (error) {
        throw new Error(
            `unable to request proofs, ${(error as Error).toString()}`
        )
    }
}

// returns the param data
const handleCallback = async (encProofs: string) => {
    let proofs

    try {
        proofs = reclaimprotocol.utils.getProofsFromRequestBody(encProofs)
    } catch (error) {
        throw new Error('unable to retrieve proofs from body')
    }

    console.log(proofs)

    // Verify the correctness of the proofs (optional but recommended)
    // const isProofsCorrect = await reclaim.verifyCorrectnessOfProofs(proofs)
    const isProofsCorrect = true

    if (isProofsCorrect) {
        // Proofs are correct, handle them as needed
        // ... process the proofs and update your application's data
        const params = JSON.parse(proofs[0].parameters as string)
        const fbFriends = params['friendsCount']
        const userUrl = params['userURL']

        console.log('data received from proofs:', fbFriends, userUrl)
        return {
            fbFriends,
            userUrl,
        }
    } else {
        // Proofs are not correct or verification failed
        console.error('Proofs verification failed')
        throw new Error('Proofs verification failed')
    }
}

export { getReclaimProofURL, handleCallback }
