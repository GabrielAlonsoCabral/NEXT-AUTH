import { useTheme } from 'next-themes'
import MoonIcon from './icons/moon'
import SunIcon from './icons/sun'

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()

  const themeSwitch = () => {
    const handleThemes = {
      dark: () => setTheme('light'),
      light: () => setTheme('dark'),
      system: () => setTheme('light'),
    }

    type Themes = keyof typeof handleThemes

    handleThemes[theme as Themes]()
  }

  return (
    <div className="flex items-center">
      {theme === 'dark' ? (
        <button
          onClick={themeSwitch}
          className="text-gray-300 hover:text-gray-500 rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-gray-600 font-medium inline-flex p-1 "
        >
          <span className="sr-only">Dark Mode</span>
          <MoonIcon />
        </button>
      ) : (
        <button
          onClick={themeSwitch}
          className="text-gray-600 hover:text-gray-400 rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-gray-300 inline-flex p-1"
        >
          <SunIcon />
        </button>
      )}
    </div>
  )
}

export default ThemeChanger
