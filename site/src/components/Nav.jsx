import { useTranslation } from 'react-i18next'
import { AppBar, Toolbar, Box, Button, IconButton, Stack, Container } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LightModeIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined'
import TranslateIcon from '@mui/icons-material/Translate'
import { useTheme as useMode } from '../theme.jsx'
import { CONFIG } from '../config.js'

function Logo() {
  return (
    <Box component="a" href="#top" sx={{ display: 'flex', alignItems: 'center', gap: 1.25, textDecoration: 'none', color: 'text.primary' }}>
      <Box
        sx={{
          width: 32, height: 32, display: 'grid', placeItems: 'center', borderRadius: '9px',
          border: '1px solid', borderColor: 'primary.main', color: 'primary.main',
          fontFamily: 'var(--mono, monospace)', fontWeight: 700, fontSize: 15,
          bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(45,70,120,0.35)' : 'secondary.main'),
        }}
      >
        r0
      </Box>
      <Box sx={{ fontWeight: 700, fontSize: 16 }}>
        r0dump<Box component="span" sx={{ color: 'primary.main' }}>-fusion</Box>
      </Box>
    </Box>
  )
}

export default function Nav() {
  const { t, i18n } = useTranslation()
  const { theme, toggle } = useMode()
  const links = [
    ['#features', t('nav.features')],
    ['#pipeline', t('nav.how')],
    ['#manager', t('nav.manager')],
    ['#download', t('nav.download')],
    ['#thanks', t('nav.thanks')],
  ]
  const switchLang = () => i18n.changeLanguage(i18n.language.startsWith('zh') ? 'en' : 'zh')

  return (
    <AppBar position="sticky">
      <Container maxWidth={false} sx={{ maxWidth: 1160 }}>
        <Toolbar disableGutters sx={{ minHeight: 64, gap: 2 }}>
          <Logo />
          <Stack direction="row" spacing={0.5} sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}>
            {links.map(([href, label]) => (
              <Button key={href} href={href} color="inherit" sx={{ color: 'text.secondary', fontWeight: 500, '&:hover': { color: 'text.primary' } }}>
                {label}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: { xs: 'auto', md: 2 } }}>
            <Button onClick={switchLang} size="small" variant="outlined" color="inherit" startIcon={<TranslateIcon sx={{ fontSize: 16 }} />}
              sx={{ borderColor: 'divider', color: 'text.secondary', minWidth: 0 }}>
              {t('lang.switch')}
            </Button>
            <IconButton onClick={toggle} aria-label={theme === 'dark' ? t('theme.toLight') : t('theme.toDark')} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, color: 'text.secondary' }}>
              {theme === 'dark' ? <LightModeIcon sx={{ fontSize: 18 }} /> : <DarkModeIcon sx={{ fontSize: 18 }} />}
            </IconButton>
            <Button href={CONFIG.github} target="_blank" rel="noreferrer" aria-label="GitHub" variant="outlined" color="inherit"
              startIcon={<GitHubIcon sx={{ fontSize: 16 }} />}
              sx={{ borderColor: 'divider', color: 'text.primary' }}>
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>GitHub</Box>
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
