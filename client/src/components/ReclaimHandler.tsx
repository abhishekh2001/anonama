import { QRCodeSVG } from 'qrcode.react'

type PropsT = {
    url: string
    displayText: string
}
export const ReclaimURLDisplay: React.FC<PropsT> = ({ url, displayText }) => {
    console.log(url)

    return (
        <div className="space-y-4">
            <p className="text-xl">{displayText}</p>
            <QRCodeSVG value={url} />
            <div>
                <a href={url}>{url}</a>
            </div>
        </div>
    )
}
