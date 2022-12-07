import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'
import { ChakraProvider } from '@chakra-ui/react'

import '@/styles/globals.css'

import type { AppProps } from 'next/app'

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ChakraProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <Analytics />
        </SessionProvider>
      </ChakraProvider>
    </ThemeProvider>
  )
}
export default appWithTranslation(App, nextI18NextConfig)
