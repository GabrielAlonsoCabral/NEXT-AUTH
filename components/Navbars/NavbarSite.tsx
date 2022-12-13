import Link from 'next/link'
import ThemeChanger from '../DarkSwitch'
import { Disclosure } from '@headlessui/react'
import LinkButton from '../Buttons/LinkButton'
import NavbarMenuIcon from '../icons/NavbarMenuIcon'
import { siteNavigations } from 'common'
import NavigationButton from '../Buttons/NavigationButton'
import IconButton from '../Buttons/IconButton'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import LanguageSwitch from '../LanguageSwitch'

export default function NavbarSite() {
  const { t } = useTranslation('common')
  const { theme } = useTheme()

  return (
    <div className="w-full border-b-[1px] dark:border-gray-500">
      <nav className="container relative flex flex-wrap items-center justify-between px-8 py-5 mx-auto xl:px-0">
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
                    {siteNavigations.map((item, index) => (
                      <Link
                        key={index}
                        href="/"
                        className="w-full px-4 py-2 -ml-4 text-grayText dark:hover:text-gray-100 rounded-md dark:text-gray-300 hover:text-grayHoverText focus:text-white focus:bg-purple dark:focus:bg-purple dark:focus:text-white focus:outline-none dark:focus:bg-neutral-700"
                      >
                        {item}
                      </Link>
                    ))}

                    <div className="mt-5 flex flex-row w-full">
                      <div>
                        <span className="text-gray-800 dark:text-gray-300">
                          {theme === 'dark' ? 'Dark' : 'Light'} Mode
                        </span>
                      </div>
                      <div className="ml-2">
                        <ThemeChanger />
                      </div>
                    </div>

                    {/* <div className="mt-5 flex-row"> */}
                    <div className="w-1/3 mb-3 mt-5">
                      <LanguageSwitch />
                    </div>
                    {/* </div> */}

                    <Link
                      href="/"
                      className="w-full px-6 py-2 mt-3 text-center text-black rounded-md md:ml-5 border border-purple dark:border-white dark:text-white dark:hover:border-purple"
                    >
                      Login
                    </Link>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {siteNavigations.map((menu, index) => (
              <NavigationButton key={index} title={menu} href={'/'} />
            ))}
          </ul>
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
