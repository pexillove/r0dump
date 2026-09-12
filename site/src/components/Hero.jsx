import { useTranslation } from 'react-i18next'
import { Box, Container, Button, Stack, Chip, Typography, useTheme } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import GitHubIcon from '@mui/icons-material/GitHub'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { MBox } from './ui.jsx'
import { CONFIG } from '../config.js'

export default function Hero() {
  const { t } = useTranslation()
  const mui = useTheme()
  const dark = mui.palette.mode === 'dark'
  const termColor = { mut: 'text.disabled', cmd: 'primary.main', ok: 'success.main', warn: 'warning.main' }
  const TERM = [
    ['mut', t('hero.termComment')],
    ['cmd', 'event=walk_completed dex_count=7 class_candidates=16384'],
    ['ok', 'accepted   base.apk          58.7 MB   class_defs=26'],
    ['ok', 'accepted   AnonymousDex #1   12.1 MB   class_defs=7794'],
    ['ok', 'accepted   AnonymousDex #2   15.9 MB   class_defs=10209'],
    ['ok', 'accepted   AnonymousDex #3   14.1 MB   class_defs=7481'],
    ['warn', t('hero.termVerified')],
  ]
  const stats = [
    ['43', t('hero.stats.points')],
    ['walk', t('hero.stats.walk')],
    ['on-device', t('hero.stats.rebuild')],
    ['MCP', t('hero.stats.mcp')],
  ]
  const fade = (d) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] } })

  return (
    <Box component="header" id="top" sx={{ position: 'relative', pt: 12, pb: 8, textAlign: 'center' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1160 }}>
        <MBox {...fade(0)}>
          <Chip
            size="small"
            icon={<FiberManualRecordIcon sx={{ fontSize: '11px !important', color: 'success.main !important' }} />}
            label={t('hero.badge')}
            variant="outlined"
            sx={{ borderColor: 'divider', color: 'text.secondary', py: 2, px: 0.5 }}
          />
        </MBox>

        <MBox
          {...fade(0.06)}
          component="h1"
          sx={{
            m: 0, mt: 3, fontSize: 'clamp(46px,8.5vw,98px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.98,
            ...(dark
              ? { background: 'var(--title-grad)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }
              : { color: 'text.primary' }),
          }}
        >
          r0dump<Box component="span" sx={{ color: dark ? 'transparent' : 'primary.main' }}>-fusion</Box>
        </MBox>

        <MBox {...fade(0.16)} sx={{ mt: 1.5, fontFamily: 'var(--mono)', color: 'primary.main', fontSize: 'clamp(14px,2.4vw,19px)', letterSpacing: '0.04em' }}>
          {t('hero.tag')}
        </MBox>

        <MBox {...fade(0.24)}>
          <Typography sx={{ mx: 'auto', mt: 3, maxWidth: 680, color: 'text.secondary', fontSize: 18, lineHeight: 1.66 }}>
            {t('hero.lead', { mgr: t('hero.mgr') })}
          </Typography>
        </MBox>

        <MBox {...fade(0.32)}>
          <Stack direction="row" spacing={1.75} justifyContent="center" sx={{ mt: 4.5, flexWrap: 'wrap', gap: 1.75 }}>
            <Button href="#download" variant="contained" size="large" startIcon={<DownloadIcon />}>
              {t('hero.ctaDownload')}
            </Button>
            <Button href={CONFIG.github} target="_blank" rel="noreferrer" variant="outlined" color="inherit" size="large"
              startIcon={<GitHubIcon />} sx={{ borderColor: 'divider', color: 'text.primary' }}>
              {t('hero.ctaSource')}
            </Button>
          </Stack>
        </MBox>

        {/* terminal card */}
        <MBox
          {...fade(0.42)}
          sx={{
            mx: 'auto', mt: 7, maxWidth: 760, textAlign: 'left', overflow: 'hidden',
            borderRadius: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper',
            boxShadow: dark ? '0 40px 90px -46px rgba(0,0,0,0.7)' : '0 30px 70px -46px rgba(70,93,145,0.35)',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box aria-hidden sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main', boxShadow: (th) => `0 0 8px ${th.palette.success.main}`, animation: 'r0pulse 2s ease-in-out infinite', '@keyframes r0pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.35 } } }} />
            <Box sx={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'text.secondary', letterSpacing: '0.06em' }}>capture</Box>
            <Box sx={{ ml: 'auto', fontFamily: 'var(--mono)', fontSize: 12, color: 'text.disabled' }}>run 20260819T…-elife</Box>
          </Stack>
          <Box className="term-scroll" sx={{ px: 2.5, py: 2, fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 1.85, overflowX: 'auto' }}>
            {TERM.map(([c, line], idx) => (
              <MBox
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.12, duration: 0.4 }}
                sx={{ color: termColor[c], whiteSpace: 'pre' }}
              >
                {line}
              </MBox>
            ))}
          </Box>
        </MBox>

        {/* stats */}
        <Stack direction="row" justifyContent="center" alignItems="stretch" sx={{ mt: 8, flexWrap: 'wrap', columnGap: 5, rowGap: 4 }}>
          {stats.map(([n, l], i) => (
            <MBox key={l} {...fade(0.6 + i * 0.08)} sx={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 2 }}>
              {i > 0 && <Box aria-hidden sx={{ width: '1px', height: 34, bgcolor: 'divider', display: { xs: 'none', sm: 'block' } }} />}
              <Box>
                <Box sx={{ fontFamily: 'var(--mono)', fontSize: 26, fontWeight: 700, color: 'primary.main', lineHeight: 1 }}>{n}</Box>
                <Box sx={{ mt: 0.75, fontSize: 12.5, color: 'text.secondary' }}>{l}</Box>
              </Box>
            </MBox>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
