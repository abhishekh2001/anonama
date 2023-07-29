import { create } from 'zustand'

interface WalletState {
    walletAddress: string
    setWalletAddress: (address: string) => void
}

const useWalletStore = create<WalletState>()((set) => ({
    walletAddress: '',
    setWalletAddress: (address) => set({ walletAddress: address }),
}))

export default useWalletStore
