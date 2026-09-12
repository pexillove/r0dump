import { createContext, useContext, useEffect, useState } from 'react'

const ThemeCtx = createContext({ theme: 'dark', toggle: () => {} })
const KEY = 'r0dump-theme'

function initial() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  try {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  } catch {}
  return 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initial)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
    try { localStorage.setItem(KEY, theme) } catch {}
    // keep mobile browser chrome in sync with the theme
    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', theme === 'dark' ? '#121318' : '#faf8ff')
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
}

export const useTheme = () => useContext(ThemeCtx)
