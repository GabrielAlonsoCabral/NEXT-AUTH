import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { GetServerSideProps, GetStaticProps } from 'next'
import { LoginProps } from '@/types'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { providers } from '@/types'
import { CircularProgress } from '@chakra-ui/react'
import ProvidersSignIn from '@/components/ProvidersSignIn'
import DividerWithTitle from '@/components/DividerWithTitle'
import FormSignUp from '@/components/Forms/Register/FormSignUp'
import dynamic from 'next/dynamic'
import Head from '@/components/Head'

const NavbarSite = dynamic(() => import('@/components/Navbars/NavbarSite'), {
  ssr: false,
})
function Login({ APP_NAME }: LoginProps) {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const { t } = useTranslation('common')

  const { error } = router.query

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
    <div className="bg-gray-50 dark:bg-black/60">
      <NavbarSite />
      <Head
        description={t('register.seo.description')}
        title={t('register.seo.title')}
        logo={'/logo.png'}
      />
      <div className="flex w-screen items-center justify-center px-5 py-10">
        <div className="w-full max-w-xl shadow-2xl dark:shadow-none  py-5 rounded-[34px] border  dark:border-gray-500">
          <div className="flex flex-col items-center justify-center space-y-3 px-4 py-6 pt-8 text-center">
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
              {t('register.description')}
            </p>
          </div>

          <FormSignUp />

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
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<LoginProps> = async (
  ctx
) => {
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
