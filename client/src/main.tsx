import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index'

import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains(
    [mainnet],
    [
        alchemyProvider({ apiKey: import.meta.env.VITE_RB_ALCHEMY_API_KEY }),
        publicProvider(),
    ]
)

const { connectors } = getDefaultWallets({
    appName: import.meta.env.VITE_RB_APP_NAME,
    projectId: import.meta.env.VITE_RB_PROJECT_ID,
    chains,
})

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
            <RouterProvider router={router} />
        </RainbowKitProvider>
    </WagmiConfig>
)
