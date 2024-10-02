"use client"
import * as React from 'react'
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from '@rainbow-me/rainbowkit-siwe-next-auth'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { Chain, RainbowKitProvider, connectorsForWallets, darkTheme } from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  trustWallet,
  coinbaseWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

const baseSepolia: Chain = {
  id: 84532, 
  name: 'Base Sepolia',
  network: 'base-sepolia',
  iconUrl: 'https://base.org/favicon.ico',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Sepolia ETH',
    symbol: 'ETH', 
  },
  rpcUrls: {
    public: { http: ['https://sepolia.base.org'] }, 
    default: { http: ['https://sepolia.base.org'] },
  },
  blockExplorers: {
    default: { name: 'Base Sepolia Explorer', url: 'https://sepolia.basescan.org' }, 
  },
  testnet: true, 
}

const { chains, publicClient } = configureChains(
  [baseSepolia], 
  [
    alchemyProvider({ apiKey:process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string }),
    publicProvider() 
  ]
)

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string


const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains }),  
      trustWallet({ projectId, chains }),     
      coinbaseWallet({ appName: 'Coinbase', chains }), 
      rainbowWallet({ projectId, chains }),   
    ],
  },
])


const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})


const demoAppInfo = {
  appName: 'Base Sepolia dApp',
}

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: `Once you're signed in, you'll be able to access all of our dApp's features on Base Sepolia.`,
})

export function Providers({
  children,
  pageProps,
}: {
  children: React.ReactNode
  pageProps: {
    session: Session
  }
}) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return (
    <WagmiConfig config={wagmiConfig}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
          <RainbowKitProvider theme={darkTheme()} chains={chains} appInfo={demoAppInfo}>
            {mounted && children}
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  )
}
