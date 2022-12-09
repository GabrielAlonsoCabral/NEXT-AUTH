import React from 'react'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import FormLabel from '../FormLabel'
import IconButton from '@/components/Buttons/IconButton'
import LoadingDots from '@/components/app/loading-dots'
import ArrowCircleRight from '@/components/icons/arrowCircleRight'
import Link from 'next/link'
import FormInput from '../FormInput'
import { isValidEmail, isValidPassword } from 'common/helpers'
import FieldErrorLabel from '../FieldErrorLabel'

const FormSignIn = () => {
  const { t } = useTranslation('common')

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = { email: '', password: '' }

          if (!values.email) errors.email = t('forms.requireds.email')
          if (!values.password) errors.password = t('forms.requireds.password')

          if (!isValidEmail(values.email))
            errors.email = t('forms.invalids.email')

          if (!isValidPassword(values.password))
            errors.password = t('forms.invalids.password')

          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true)
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 4000)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4  px-14 pt-4 pb-2 sm:px-16 dark:border-gray-50 border-t-[1px]"
          >
            <FormLabel title={t('commons.email')} />
            <FormInput
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="panic@thedis.co"
              autoComplete="email"
              required
            />

            <FieldErrorLabel
              title={(errors.email && touched.email && errors.email) || ''}
            />
            <FormLabel title={t('commons.password')} />
            <FormInput
              name="password"
              type="password"
              placeholder="********"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <FieldErrorLabel
              title={
                (errors.password && touched.password && errors.password) || ''
              }
            />

            <IconButton
              type="submit"
              title={
                !isSubmitting ? 'Sign In' : <LoadingDots color="#808080" />
              }
              basicStyle="default"
              disabled={isSubmitting}
              onClick={() => setSubmitting(true)}
              iconRight={!isSubmitting ? <ArrowCircleRight /> : undefined}
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
        )}
      </Formik>
    </div>
  )
}

export default FormSignIn
