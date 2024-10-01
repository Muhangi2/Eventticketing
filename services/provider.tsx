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

// Define Base Sepolia testnet chain
const baseSepolia: Chain = {
  id: 84531, // Chain ID for Base Sepolia testnet
  name: 'Base Sepolia',
  network: 'base-sepolia',
  iconUrl: 'https://base.org/favicon.ico',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Sepolia ETH',
    symbol: 'ETH', // Base Sepolia uses ETH as the native currency
  },
  rpcUrls: {
    public: { http: ['https://sepolia.base.org'] }, // RPC URL for Base Sepolia testnet
    default: { http: ['https://sepolia.base.org'] },
  },
  blockExplorers: {
    default: { name: 'Base Sepolia Explorer', url: 'https://sepolia.basescan.org' }, // Explorer for Base Sepolia
  },
  testnet: true, // Mark as testnet
}

// Configure chains to use only Base Sepolia
const { chains, publicClient } = configureChains(
  [baseSepolia], // Only Base Sepolia is included
  [
    // alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }), 
    alchemyProvider({ apiKey: "https://base-sepolia.g.alchemy.com/v2/hw16gk_R62OY4SLP4aPp37bTOTrh9xYu" }),
    publicProvider() // Fallback to public provider
  ]
)

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string

// Configure wallet connectors
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains }),  // MetaMask wallet for Base Sepolia
      trustWallet({ projectId, chains }),     // Trust Wallet for Base Sepolia
      coinbaseWallet({ appName: 'Coinbase', chains }), // Coinbase Wallet
      rainbowWallet({ projectId, chains }),   // Rainbow Wallet
    ],
  },
])

// Wagmi config
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
