type WalletConnectProps = {
    align: string
}

const ConnectWalletButton: React.FC<WalletConnectProps> = ({ align }) => {
    return (
        <button
            className={`h-fit w-fit bg-slate-800 p-2 text-white hover:bg-slate-950 text-sm ${
                align === 'right' ? 'right-0' : 'left-0'
            }`}
        >
            Connect Wallet
        </button>
    )
}

export default ConnectWalletButton
