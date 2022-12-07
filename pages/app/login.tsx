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
    signIn(String(provider))
    setProvider(provider)
  }

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error
    errorMessage && toast.error(errorMessage)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-2 lg:px-8">
      <Head
        title={t('login.seo.title')}
        description={t('login.seo.description')}
        logo={'favicon.ico'}
      />

      <div className="lg:mx-auto md:mx-auto border-2 shadow-2xl p-10 rounded-[34px]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="Citizens"
            width={100}
            height={100}
            className="relative mx-auto h-12 w-auto"
            src="/logo.png"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {APP_NAME}
          </h2>
        </div>

        <div>
          <h3 className="mt-5 text-center font-semibold text-xl">
            Inicie sessão com ID Citizens
          </h3>
        </div>

        <div></div>

        <div className="mx-auto mt-5 flex flex-row justify-center">
          {/* <ButtonSignIn
            provider={'github'}
            isLoading={provider === 'github' && loading}
            icon={<GithubIcon title={'Github'} />}
            disabled={provider !== 'github' && loading}
            onClick={() => OnClickSignIn('github')}
          /> */}

          <ButtonSignIn
            provider={'apple'}
            icon={<AppleIcon title={'Apple'} />}
            disabled={provider === 'apple' && loading}
            onClick={() => OnClickSignIn('apple')}
          />

          <ButtonSignIn
            provider={'facebook'}
            icon={<FacebookIcon title={'Facebook'} />}
            disabled={provider === 'facebook' && loading}
            onClick={() => OnClickSignIn('facebook')}
          />

          <ButtonSignIn
            provider={'google'}
            icon={<GoogleIcon title={'Google'} />}
            disabled={provider === 'google' && loading}
            onClick={() => OnClickSignIn('google')}
          />
        </div>

        <button onClick={() => onToggleLanguageClick(changeTo)}>Mudar</button>

        <div className="mt-8 mx-auto sm:w-full w-11/12 sm:max-w-md"></div>
        <Toaster />
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
