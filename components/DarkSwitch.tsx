import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true)
    if (!theme) setTheme('light')
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center">
      {theme === 'dark' ? (
        <button
          onClick={() => setTheme('light')}
          className="text-gray-600 dark:text-gray-300 rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-gray-600 font-medium inline-flex p-1"
        >
          <span className="sr-only">Dark Mode</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        </button>
      ) : (
        <button
          onClick={() => setTheme('dark')}
          className="text-gray-600 dark:text-gray-300 rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium inline-flex p-1"
        >
          <span className="sr-only">Light Mode</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default ThemeChanger
