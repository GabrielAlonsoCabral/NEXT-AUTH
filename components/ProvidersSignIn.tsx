import IconButton from './Buttons/IconButton'
import React from 'react'
import GoogleIcon from './icons/google'
import TwitterIcon from './icons/twitter'
import GithubIcon from './icons/github'
import { providers } from '@/types/helpers'
import { useTranslation } from 'react-i18next'

interface IProvidersSignInProps {
  loading: boolean
  onSignIn: (provider: providers) => void
}

function ProvidersSignIn({ loading, onSignIn }: IProvidersSignInProps) {
  const { t } = useTranslation('common')
  return (
    <div className="flex flex-wrap px-14 justify-center mt-5">
      <div className="w-full">
        <IconButton
          type="button"
          basicStyle={'google'}
          iconLeft={<GoogleIcon />}
          title={t('commons.GoogleSignIn')}
          disabled={loading}
          onClick={() => onSignIn('google')}
        />
      </div>
      <div className="w-full">
        <IconButton
          type="button"
          basicStyle={'twitter'}
          iconLeft={<TwitterIcon />}
          title={t('commons.TwitterSignIn')}
          disabled={loading}
          onClick={() => onSignIn('twitter')}
        />
      </div>
      <div className="w-full">
        <IconButton
          type="button"
          basicStyle={'github'}
          iconLeft={<GithubIcon />}
          title={t('commons.GithubSignIn')}
          disabled={loading}
          onClick={() => onSignIn('github')}
        />
      </div>
    </div>
  )
}

export default ProvidersSignIn
