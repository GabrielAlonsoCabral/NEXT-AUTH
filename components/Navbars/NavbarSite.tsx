import ThemeChanger from '../DarkSwitch'
import { Disclosure } from '@headlessui/react'
import LinkButton from '../Buttons/LinkButton'
import NavbarMenuIcon from '../icons/NavbarMenuIcon'
import { navigations } from 'common'
import NavigationButton from '../Buttons/NavigationButton'
import IconButton from '../Buttons/IconButton'
import { useTranslation } from 'react-i18next'
import LanguageSwitch from '../LanguageSwitch'

export default function NavbarSite() {
  const { t, i18n } = useTranslation('common')

  return (
    <div className="w-full border-b-[1px] dark:border-gray-500">
      <nav className="relative flex flex-wrap items-center justify-between py-5 px-10">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <LinkButton
                  title="Citizens"
                  href="/"
                  className="text-black font-bold text-2xl uppercase dark:text-gray-200"
                />

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-grayText rounded-md lg:hidden hover:text-grayHoverText focus:text-focusGrayText focus:bg-gray-100 focus:outline-none dark:text-gray-300 dark:focus:bg-gray-800/75"
                >
                  <NavbarMenuIcon isOpen={open} />
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigations.map((item, index) => (
                      <NavigationButton
                        key={index}
                        title={t(`routes.${item.key}.title`)}
                        isMobile
                        href={t(`routes.${item.key}.path`, {
                          lang: i18n.language,
                        })}
                      />
                    ))}

                    <div className="flex flex-row w-full mb-10 mt-5">
                      <div className="w-1/2">
                        <LanguageSwitch />
                      </div>
                      <div className="w-1/2 ml-5 mt-1">
                        <ThemeChanger />
                      </div>
                    </div>

                    <IconButton
                      type="submit"
                      title={t('commons.signIn')}
                      basicStyle={'navbar'}
                    />
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden items-center justify-center lg:flex">
          {navigations.map((item, index) => (
            <NavigationButton
              key={index}
              title={t(`routes.${item.key}.title`)}
              href={t(`routes.${item.key}.path`, { lang: i18n.language })}
            />
          ))}
        </div>

        <div className="hidden lg:flex space-x-4 w-1/4">
          <LanguageSwitch />
          <IconButton
            type="submit"
            title={t('commons.signIn')}
            basicStyle={'navbar'}
          />
          <ThemeChanger />
        </div>
      </nav>
    </div>
  )
}
