import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import '@fontsource-variable/inter/wght.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import '@fontsource/jetbrains-mono/latin-700.css'
import './i18n'
import './index.css'
import App from './App.jsx'
import { ThemeProvider as ModeProvider, useTheme } from './theme.jsx'
import { getTheme } from './muiTheme.js'

function Root() {
  const { theme } = useTheme()
  const muiTheme = React.useMemo(() => getTheme(theme), [theme])
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModeProvider>
      <Root />
    </ModeProvider>
  </React.StrictMode>,
)
