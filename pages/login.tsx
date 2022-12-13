import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { GetStaticProps } from 'next'
import { LoginProps } from '@/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { providers } from '@/types'
import { CircularProgress } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import ProvidersSignIn from '@/components/ProvidersSignIn'
import DividerWithTitle from '@/components/DividerWithTitle'
import FormSignIn from '@/components/Forms/Login/FormSignIn'
import dynamic from 'next/dynamic'

const NavbarSite = dynamic(() => import('@/components/Navbars/NavbarSite'), {
  ssr: false,
})
function Login({ APP_NAME }: LoginProps) {
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const { t } = useTranslation('common')

  const { error } = router.query

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  const changeTo = router.locale === 'en' ? 'pt' : 'en'

  const onProviderSignIn = (provider: providers) => {
    setLoading(true)
    signIn(String(provider))
    setLoading(false)
  }

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error
    errorMessage && toast.error(errorMessage)
  }, [error])

  return (
    <>
      <NavbarSite />
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50 px-5 dark:bg-black/60 mt-0">
        <div className="w-full max-w-md shadow-2xl dark:shadow-none bg-white py-5 rounded-[34px] dark:bg-black/60 border  dark:border-gray-500 ">
          <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center sm:px-16 rounded-[34px]">
            <Image
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full dark:bg-gray-50"
              width={20}
              height={20}
            />
            <h3 className="text-xl font-bold text-black dark:text-gray-200">
              {APP_NAME}
            </h3>
            <p className="text-sm text-grayText dark:text-gray-300">
              {t('login.description')}
            </p>
          </div>

          <FormSignIn />

          <div className="py-5">
            <DividerWithTitle title={t('commons.continueWith')} />

            {!loading ? (
              <>
                <ProvidersSignIn
                  loading={loading}
                  onSignIn={onProviderSignIn}
                />
              </>
            ) : (
              <div className="flex justify-center mt-5">
                <CircularProgress isIndeterminate color={'black'} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
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
