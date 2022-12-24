import {
  CustomizedToasts,
  IAddCustomizedToast,
  ICustomizedToast,
} from '@/types'
import {
  ToastId,
  useToast as useToastChakra,
  UseToastOptions,
} from '@chakra-ui/react'
import { translateErrorMessage } from 'common/errorMessages'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

function useToast() {
  const toast = useToastChakra()
  const toastIdRef = useRef<ToastId>()
  const { t, i18n } = useTranslation('common')

  const customizedToasts: {
    [customizedToast in CustomizedToasts]: ({
      message,
      failure,
      title,
    }: ICustomizedToast) => UseToastOptions
  } = {
    error: ({ failure }) => ({
      title: 'Ops!',
      description: failure
        ? translateErrorMessage(failure, i18n.language)
        : t('toast.error'),
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    }),
    validate: ({ message }) => ({
      title: 'Ops!',
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    }),
    loading: () => ({
      title: t('toast.loadingTitle'),
      description: t('toast.loadingDescription'),
      status: 'loading',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    }),
    success: ({ title }) => ({
      title: title,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    }),
  }

  function closeAll() {
    toast.closeAll()
  }

  function closeToast() {
    if (toastIdRef.current) toast.close(toastIdRef.current)
  }

  function addCustomizedToast({
    message,
    custom,
    failure,
    title,
  }: IAddCustomizedToast) {
    const options = customizedToasts[custom]({
      message: message ? message : undefined,
      failure: failure ? failure : undefined,
      title: title ? title : undefined,
    })
    closeToast()
    toastIdRef.current = toast(options)
  }

  function addToast(options: UseToastOptions) {
    closeToast()
    toastIdRef.current = toast(options)
  }

  return {
    addToast,
    addCustomizedToast,
    closeToast,
    closeAll,
  }
}

export default useToast
