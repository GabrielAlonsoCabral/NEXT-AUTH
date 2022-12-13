import { locale } from '@/types'
import { Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import BRFlag from './icons/flags/BRFlag'
import USFlag from './icons/flags/USFlag'

function LanguageSwitch() {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()

  const getCurrentFlagIcon = (currentLocale: locale) => {
    const flags = {
      pt: <BRFlag />,
      en: <USFlag />,
    }

    return flags[currentLocale]
  }

  const changeLocale = (newLocale: locale) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  return (
    <Select
      onChange={(e) => {
        const selectedLocale: locale = e.target.value as locale
        changeLocale(selectedLocale)
      }}
      icon={getCurrentFlagIcon(i18n.language as locale)}
      value={i18n.language}
      size={'sm'}
      className="rounded-md justify-center text-gray-600 dark:text-gray-300 text-xs"
    >
      <option value="en" className="text-xs">
        {t('languages.english')}
      </option>
      <option value="pt" className="text-xs">
        {t('languages.portuguese')}
      </option>
    </Select>
  )
}

export default LanguageSwitch
