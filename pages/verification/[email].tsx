import LinkButton from '@/components/Buttons/LinkButton'
import { secondsToTime } from '@/lib/util'
import { EmailIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Spacer, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Center = dynamic(
  () => import('@chakra-ui/react').then((module) => module.Center),
  {
    ssr: false,
  }
)

const NavbarSite = dynamic(() => import('@/components/Navbars/NavbarSite'), {
  ssr: false,
})

interface IEmailVerificationProps {
  wait: number
}

const EmailVerification = ({ wait }: IEmailVerificationProps) => {
  const [counter, setCounter] = useState(wait)
  const router = useRouter()
  const { email } = router.query

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
    //@ts-ignore
    return () => clearInterval(timer)
  }, [counter])

  return (
    <div className="bg-gray-50 dark:bg-black/60 min-h-screen">
      <Center className="min-h-screen py-10">
        <Center className="flex items-center justify-center h-3/4">
          <Box className="border max-w-xl px-10 md:px-20  py-10 shadow-2xl dark:shadow-none  rounded-[20px] dark:border-gray-500">
            <Box className="">
              <Heading
                className="text-black dark:text-gray-200 text-lg "
                mb={4}
              >
                <EmailIcon fontSize={22} /> Confirme seu e-mail{' '}
              </Heading>
              <Text className="text-gray-600 dark:text-gray-300">
                Cheque a caixa de mensagem ou spam do e-mail
                <Text className="font-bold text-black dark:text-white">
                  {email}
                </Text>{' '}
                para confirmar.
              </Text>
              <Spacer height={'5'} />
              <Box className="w-3/4">
                <Text className="text-sm text-gray-600 dark:text-gray-300">
                  Não possui acesso a este e-mail?{' '}
                  <LinkButton
                    href="/register"
                    title={'Cadastrar novo e-mail'}
                  />
                </Text>
              </Box>
              <Spacer height={'5'} />
              <Button
                width={'full'}
                isLoading={counter !== 0}
                loadingText={`Envie novamente em ${secondsToTime(
                  Number(counter)
                )}`}
                colorScheme="green"
                variant="solid"
                spinnerPlacement="start"
              >
                Enviar email novamente
              </Button>
            </Box>
          </Box>
        </Center>
      </Center>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  IEmailVerificationProps
> = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(
        ctx.locale || ctx.defaultLocale || 'pt',
        ['common']
      )),
      wait: 60,
    },
  }
}

export default EmailVerification
