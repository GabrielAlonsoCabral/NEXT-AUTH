import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'

const NavbarSite = dynamic(() => import('@/components/Navbars/NavbarSite'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <NavbarSite />
      <div className="flex h-screen  bg-black">
        <Head>
          <title>Platforms on Vercel</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="m-auto w-48">
          <Image
            width={512}
            height={512}
            src="/logo.png"
            alt="Platforms on Vercel"
          />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<any> = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(
        ctx.locale || ctx.defaultLocale || 'pt',
        ['common']
      )),
    },
  }
}
