import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import { GetStaticProps } from 'next'
import { LoginProps } from '@/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import IconButton from '@/components/Buttons/IconButton'
import GithubIcon from '@/components/icons/github'
import { providers } from '@/types/helpers'
import GoogleIcon from '@/components/icons/google'
import Link from 'next/link'
import LoadingDots from '@/components/app/loading-dots'
import { CircularProgress } from '@chakra-ui/react'
import TwitterIcon from '@/components/icons/twitter'
import { useTheme } from 'next-themes'
import ArrowCircleRight from '@/components/icons/arrowCircleRight'

function Login({ APP_NAME }: LoginProps) {
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState<providers>()

  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const { t } = useTranslation('common')

  const { error } = router.query

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  const changeTo = router.locale === 'en' ? 'pt' : 'en'

  const OnClickSignIn = (provider: providers) => {
    setLoading(true)
    signIn(String(provider))
    setProvider(provider)
    setLoading(false)
  }

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error
    errorMessage && toast.error(errorMessage)
  }, [error])

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 px-5 dark:bg-black/60 ">
      <button
        onClick={() =>
          theme === 'dark' ? setTheme('light') : setTheme('dark')
        }
        className="text-black dark:text-white"
      >
        a
      </button>
      <div className="w-full max-w-md shadow-2xl dark:shadow-white dark:shadow-sm bg-white py-5 rounded-[34px] dark:bg-black/60 border  dark:border-white ">
        <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16 rounded-[34px]">
          <Image
            src="/logo.png"
            alt="Logo"
            className="h-10 w-10 rounded-full dark:bg-gray-50"
            width={20}
            height={20}
          />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-50">
            {APP_NAME}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-200">
            {t('login.description')}
          </p>
        </div>

        <form className="flex flex-col space-y-4  px-14 py-8 sm:px-16 dark:border-gray-50 border-t-[1px]">
          <div>
            <label
              htmlFor="email"
              className="block text-xs text-gray-700 uppercase dark:text-gray-50"
            >
              {t('commons.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="panic@thedis.co"
              autoComplete="email"
              required
              className="mt-1 dark:bg-gray-50 block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-50 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-700 shadow-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-black dark:focus:ring-white sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs text-gray-700 uppercase dark:text-gray-50"
            >
              {t('commons.password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              required
              className="mt-1 dark:bg-gray-50 block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-50 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-700 shadow-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-black dark:focus:ring-white sm:text-sm"
            />
          </div>
          <IconButton
            title={!loading ? 'Sign In' : <LoadingDots color="#808080" />}
            basicStyle="default"
            disabled={loading}
            iconRight={!loading ? <ArrowCircleRight /> : undefined}
            onClick={() => {
              setLoading(true)
            }}
          />
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {t('commons.accountSignUp')}
            <Link
              href="/register"
              className="font-semibold text-gray-800 dark:text-white dark:hover:text-gray-300"
            >
              {' '}
              {t('commons.signUp')}
            </Link>{' '}
            {t('commons.here')}.
          </p>
        </form>

        <div>
          <div className="relative ">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t dark:border-white"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-gray-500 dark:text-white bg-white dark:bg-black">
                {t('commons.continueWith')}
              </span>
            </div>
          </div>

          {!loading ? (
            <>
              <div className="flex flex-wrap px-14 justify-center mt-5 mb-5">
                <div className="w-full">
                  <IconButton
                    basicStyle={'google'}
                    iconLeft={<GoogleIcon />}
                    title={t('commons.GoogleSignIn')}
                    disabled={provider === 'google' && loading}
                    onClick={() => OnClickSignIn('google')}
                  />
                </div>
                <div className="w-full">
                  <IconButton
                    basicStyle={'twitter'}
                    iconLeft={<TwitterIcon />}
                    title={t('commons.TwitterSignIn')}
                    disabled={provider === 'twitter' && loading}
                    onClick={() => OnClickSignIn('twitter')}
                  />
                </div>
                <div className="w-full">
                  <IconButton
                    basicStyle={'github'}
                    iconLeft={<GithubIcon />}
                    title={t('commons.GithubSignIn')}
                    disabled={provider === 'github' && loading}
                    onClick={() => OnClickSignIn('github')}
                  />
                </div>
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
