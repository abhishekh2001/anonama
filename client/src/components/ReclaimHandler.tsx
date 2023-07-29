import { QRCodeSVG } from 'qrcode.react'
import useReclaimURLStore from '../stores/reclaim'
import { useEffect } from 'react'
import { pollAndUpdateClaimState } from '../utils/polling'

type PropsT = {
    url: string
    displayText: string
}
export const ReclaimURLDisplay: React.FC<PropsT> = ({ url }) => {
    console.log(url)

    const reclaimURLData = useReclaimURLStore((state) => state.reclaimURLData)

    useEffect(() => {
        console.log('new data: ', reclaimURLData)
        if (reclaimURLData.callbackId)
            pollAndUpdateClaimState(reclaimURLData.callbackId)
    }, [reclaimURLData])

    useEffect(() => {}, [reclaimURLData])

    return (
        <div className="space-y-4">
            <p className="text-xl">{reclaimURLData.providerDisplayText}</p>
            <QRCodeSVG value={reclaimURLData.reclaimUrl as string} />
            <div>
                <a href={reclaimURLData.reclaimUrl}>
                    {reclaimURLData.reclaimUrl}
                </a>
            </div>
        </div>
    )
}
