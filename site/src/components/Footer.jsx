import { useTranslation } from 'react-i18next'
import { Box, Container, Stack, Typography, Link } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { CONFIG } from '../config.js'

export default function Footer() {
  const { t } = useTranslation()
  const link = { color: 'text.secondary', fontSize: 14, '&:hover': { color: 'primary.main' } }
  return (
    <Box component="footer" sx={{ mt: 5, borderTop: '1px solid', borderColor: 'divider', py: 6 }}>
      <Container maxWidth={false} sx={{ maxWidth: 1160 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'wrap', gap: 3 }}>
          <Box>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Box sx={{ width: 32, height: 32, display: 'grid', placeItems: 'center', borderRadius: '9px', border: '1px solid', borderColor: 'primary.main', color: 'primary.main', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 15, bgcolor: (th) => (th.palette.mode === 'dark' ? 'rgba(45,70,120,0.35)' : 'secondary.main') }}>r0</Box>
              <Typography sx={{ fontSize: 16, fontWeight: 700 }}>r0dump<Box component="span" sx={{ color: 'primary.main' }}>-fusion</Box></Typography>
            </Stack>
            <Typography sx={{ mt: 1.25, fontSize: 13, color: 'text.disabled' }}>{t('footer.tagline')}</Typography>
          </Box>
          <Stack direction="row" spacing={2.5} alignItems="center" sx={{ flexWrap: 'wrap' }}>
            <Link href={CONFIG.github} target="_blank" rel="noreferrer" underline="none" sx={{ ...link, display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
              <GitHubIcon sx={{ fontSize: 16 }} /> GitHub
            </Link>
            <Link href="#download" underline="none" sx={link}>{t('nav.download')}</Link>
            <Link href="#thanks" underline="none" sx={link}>{t('nav.thanks')}</Link>
            <Link href="#disclaimer" underline="none" sx={link}>{t('disclaimer.title')}</Link>
          </Stack>
        </Stack>
        <Typography sx={{ mt: 3, fontSize: 12.5, color: 'text.disabled' }}>
          © {new Date().getFullYear()} r0dump-fusion · {t('footer.rights')}
        </Typography>
      </Container>
    </Box>
  )
}
