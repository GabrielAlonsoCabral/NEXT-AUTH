import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/react'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from 'next-themes'
import nextI18NextConfig from '../next-i18next.config.js'

import type { AppProps } from 'next/app'

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
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
