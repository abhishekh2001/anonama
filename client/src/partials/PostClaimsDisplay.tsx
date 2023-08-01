import { TSingleClaimData } from '../stores/claims'
import { ProviderUtils } from '../utils/verifCats'

type ClaimViewerPropsType = {
    claim: TSingleClaimData
}

const ClaimViewer: React.FC<ClaimViewerPropsType> = ({ claim }) => {
    return (
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <div className="p-5">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    {claim.providerDisplayText}
                </h2>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    {claim.claim.createdAt?.toString() ?? '-'}
                </div>
                <div className="flex items-start">
                    <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
                        {ProviderUtils[claim.claim.provider].dataAccess(
                            claim.claim.data
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClaimViewer
