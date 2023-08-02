import { QRCodeSVG } from 'qrcode.react'
import useReclaimURLStore from '../stores/reclaim'
import { useEffect } from 'react'
import { pollAndUpdateClaimState } from '../utils/polling'
import useReclaimMultiClaimDataStore, {
    TSingleClaimData,
} from '../stores/claims'
import { ProviderUtils } from '../utils/verifCats'

type PropsT = {
    url: string
    displayText: string
}
export const ReclaimURLDisplay: React.FC<PropsT> = ({ url }) => {
    console.log(url)

    const reclaimURLData = useReclaimURLStore((state) => state.reclaimURLData)
    const setClaimsData = useReclaimMultiClaimDataStore(
        (state) => state.setClaimsData
    )

    useEffect(() => {
        console.log('new data: ', reclaimURLData)
        if (reclaimURLData.callbackId)
            pollAndUpdateClaimState(reclaimURLData.callbackId, setClaimsData)
    }, [reclaimURLData, setClaimsData])

    useEffect(() => {}, [reclaimURLData])

    return reclaimURLData.reclaimUrl ? (
        <div className="space-y-4 border-2 border-slate-900 p-2 rounded-md ">
            <p className="text-xl">{reclaimURLData.providerDisplayText}</p>
            <QRCodeSVG value={reclaimURLData.reclaimUrl as string} />
            <div>
                <a href={reclaimURLData.reclaimUrl}>
                    {reclaimURLData.reclaimUrl}
                </a>
            </div>
        </div>
    ) : null
}

type DisplayVerifiedClaimsT = {
    claimData: TSingleClaimData[]
}
export const DisplayVerifiedClaims: React.FC<DisplayVerifiedClaimsT> = ({
    claimData,
}) => {
    return (
        <div className="flex">
            {claimData.map((claim) => {
                return (
                    <div
                        key={claim.callbackId}
                        className="bg-indigo-500 text-xs my-3 text-slate-50 p-3 shadow-md"
                    >
                        {ProviderUtils[claim.claim.provider].dataAccess(
                            claim.claim.data
                        )}
                    </div>
                )
            })}
        </div>
    )
}
