import LoadingDots from '@/components/app/loading-dots'
import IconButton from '@/components/Buttons/IconButton'
import LinkButton from '@/components/Buttons/LinkButton'
import ArrowCircleRight from '@/components/icons/arrowCircleRight'
import useToast from '@/lib/useToast'
import { bodyParser } from '@/lib/util'
import { HttpMethod, ICreateUserResponseBody, IUserRequestBody } from '@/types'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import FieldErrorLabel from '../FieldErrorLabel'
import FormInput from '../FormInput'
import FormLabel from '../FormLabel'
import { FormSignUpValidate } from './FormSignUpValidate'

const FormSignIn = () => {
  const { addCustomizedToast, closeToast } = useToast()

  const { t } = useTranslation('common')

  return (
    <div>
      <Formik
        initialValues={
          {
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
          } as IUserRequestBody
        }
        validate={(values) => FormSignUpValidate({ values, t })}
        onSubmit={async (values, { setSubmitting }) => {}}
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
            <>
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
                      (errors.password &&
                        touched.password &&
                        errors.password) ||
                      ''
                    }
                  />
                </div>

                <div className="w-1/2 pl-2">
                  <FormLabel title={t('register.confirmPassword')} />
                  <FormInput
                    name="confirmPassword"
                    type="password"
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
                onClick={async () => {
                  setSubmitting(true)
                  addCustomizedToast({ custom: 'loading' })

                  await fetch(`/api/user`, {
                    body: bodyParser(values),
                    method: HttpMethod.POST,
                  }).then(async (response) => {
                    closeToast()
                    const responseData: ICreateUserResponseBody =
                      await response.json()

                    if (!responseData.success)
                      addCustomizedToast({
                        message: responseData.failured,
                        custom: 'error',
                      })
                  })
                  setSubmitting(false)
                }}
                iconRight={!isSubmitting ? <ArrowCircleRight /> : undefined}
              />
              <p className="text-center text-sm text-grayText dark:text-gray-300">
                {t('register.accountSignIn')}{' '}
                <LinkButton href="/login" title={t('commons.signIn')} />.
              </p>
            </>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default FormSignIn
