import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import { GetStaticProps } from 'next'
import { LoginProps } from '@/types'
import Head from '@/components/Head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ButtonSignIn from '@/components/Buttons/ButtonSignIn'
import GithubIcon from '@/components/icons/github'
import { providers } from '@/types/helpers'
import AppleIcon from '@/components/icons/apple'
import FacebookIcon from '@/components/icons/facebook'
import GoogleIcon from '@/components/icons/google'
import Link from 'next/link'
import LoadingDots from '@/components/app/loading-dots'
import { CircularProgress } from '@chakra-ui/react'
import TwitterIcon from '@/components/icons/twitter'

function Login({ APP_NAME }: LoginProps) {
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState<providers>()

  const router = useRouter()

  const { t } = useTranslation('common')

  const { error } = router.query

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  const changeTo = router.locale === 'en' ? 'pt' : 'en'

  const OnClickSignIn = (provider: providers) => {
    setLoading(true)
    // signIn(String(provider))
    setProvider(provider)
    setLoading(false)
  }

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error
    errorMessage && toast.error(errorMessage)
  }, [error])

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md shadow-2xl bg-white py-10 rounded-[34px]">
        <div className="flex flex-col items-center justify-center space-y-3  bg-white px-4 py-6 pt-8 text-center sm:px-16 rounded-[34px]">
          <a href="https://dub.sh">
            <Image
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </a>
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>

        <form className="flex flex-col space-y-4 bg-white px-4 py-8 sm:px-16 border-t">
          <div>
            <label
              htmlFor="email"
              className="block text-xs text-gray-600 uppercase"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="panic@thedis.co"
              autoComplete="email"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <button
            disabled={loading}
            className={`${
              loading
                ? 'cursor-not-allowed border-gray-200 bg-gray-100'
                : 'border-black bg-black text-white hover:bg-white hover:text-black'
            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
          >
            {loading ? <LoadingDots color="#808080" /> : <p>Sign In</p>}
          </button>
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-gray-800">
              Sign up
            </Link>{' '}
            for free.
          </p>
        </form>

        <div>
          <div className="relative bg-white">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {!loading ? (
            <>
              <div className="flex  bg-white px-11 justify-center mt-5">
                <ButtonSignIn
                  provider={'google'}
                  icon={<GoogleIcon title={t('commons.GoogleSignIn')} />}
                  disabled={provider === 'google' && loading}
                  onClick={() => OnClickSignIn('google')}
                />
              </div>
              <div className="flex bg-white px-11 justify-center">
                <ButtonSignIn
                  provider={'twitter'}
                  icon={<TwitterIcon title={t('commons.TwitterSignIn')} />}
                  disabled={provider === 'twitter' && loading}
                  onClick={() => OnClickSignIn('twitter')}
                />
              </div>
              <div className="flex bg-white px-11 justify-center">
                <ButtonSignIn
                  provider={'github'}
                  icon={<GithubIcon title={t('commons.GithubSignIn')} />}
                  disabled={provider === 'github' && loading}
                  onClick={() => OnClickSignIn('github')}
                />
              </div>
            </>
          ) : (
            <div className="flex justify-center mt-5">
              <CircularProgress isIndeterminate color={'black'} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<LoginProps> = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(
        ctx.locale || ctx.defaultLocale || 'pt',
        ['common']
      )),
      APP_NAME: String(process.env.NAME),
    },
  }
}

export default Login
