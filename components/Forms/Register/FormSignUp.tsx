import LoadingDots from '@/components/app/loading-dots'
import IconButton from '@/components/Buttons/IconButton'
import LinkButton from '@/components/Buttons/LinkButton'
import ArrowCircleRight from '@/components/icons/arrowCircleRight'
import { isValidEmail, isValidName, isValidPassword } from '@/lib/helpers'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import FieldErrorLabel from '../FieldErrorLabel'
import FormInput from '../FormInput'
import FormLabel from '../FormLabel'

const FormSignIn = () => {
  const { t } = useTranslation('common')

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
          confirmPassword: '',
        }}
        validate={(values) => {
          const errors = {
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
          }

          if (!values.email) {
            errors.email = t('forms.requireds.email')
            return errors
          }

          if (!values.name) {
            errors.name = t('forms.requireds.name')
            return errors
          }

          if (!values.confirmPassword) {
            errors.confirmPassword = t('forms.requireds.confirmPassword')
            return errors
          }

          if (!values.password) {
            errors.password = t('forms.requireds.password')
            return errors
          }

          if (!isValidEmail(values.email)) {
            errors.email = t('forms.invalids.email')
            return errors
          }

          if (!isValidName(values.name)) {
            errors.name = t('forms.invalids.name')
            return errors
          }

          if (!isValidPassword(values.password)) {
            errors.password = t('forms.invalids.password')
            return errors
          }

          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = t('forms.invalids.confirmPassword')
            return errors
          }

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
            className="flex flex-col space-y-4  px-14 pt-4 pb-2 sm:px-16 dark:border-gray-500 border-t-[1px]"
          >
            <div className="w-full">
              <FormLabel title={t('commons.email')} />
              <FormInput
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder={t('forms.placeholders.email')}
                autoComplete="email"
                required
              />

              <FieldErrorLabel
                title={(errors.email && touched.email && errors.email) || ''}
              />
            </div>

            <div className="w-full">
              <FormLabel title={t('commons.name')} />
              <FormInput
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder={t('forms.placeholders.name')}
                required
              />

              <FieldErrorLabel
                title={(errors.name && touched.name && errors.name) || ''}
              />
            </div>

            <div className="flex">
              <div className="w-1/2 pr-2">
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
                    (errors.password && touched.password && errors.password) ||
                    ''
                  }
                />
              </div>

              <div className="w-1/2">
                <FormLabel title={t('register.confirmPassword')} />
                <FormInput
                  name="confirmPassword"
                  type="confirmPassword"
                  placeholder="********"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <FieldErrorLabel
                  title={
                    (errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword) ||
                    ''
                  }
                />
              </div>
            </div>

            <IconButton
              type="submit"
              title={
                !isSubmitting ? (
                  t('commons.signUp')
                ) : (
                  <LoadingDots color="#808080" />
                )
              }
              basicStyle="default"
              disabled={isSubmitting}
              onClick={() => setSubmitting(true)}
              iconRight={!isSubmitting ? <ArrowCircleRight /> : undefined}
            />
            <p className="text-center text-sm text-grayText dark:text-gray-300">
              {t('register.accountSignIn')}{' '}
              <LinkButton href="/login" title={t('commons.signIn')} />.
            </p>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default FormSignIn
