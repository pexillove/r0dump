import { useTranslation } from 'react-i18next'
import { Box, Container, Typography, Stack, Chip } from '@mui/material'
import { Reveal, GradientText, MBox } from './ui.jsx'

export default function Manager() {
  const { t } = useTranslation()
  const rows = t('manager.rows', { returnObjects: true })
  const phoneRows = t('manager.phoneRows', { returnObjects: true })
  const tabs = ['Apps', 'Capture', 'Budgets', 'Advanced']
  return (
    <Box component="section" id="manager" sx={{ py: 12 }}>
      <Container maxWidth={false} sx={{ maxWidth: 1160, display: 'grid', gap: 5.5, alignItems: 'center', gridTemplateColumns: { xs: '1fr', lg: '1.05fr 0.95fr' } }}>
        <Reveal>
          <Box>
            <Typography variant="overline" sx={{ color: 'primary.main', fontSize: 12.5, display: 'inline-flex', alignItems: 'center', gap: 1 }}>
              <Box component="span" sx={{ width: 22, height: '1px', bgcolor: 'primary.main', opacity: 0.6 }} />
              {t('manager.eyebrow')}
            </Typography>
            <GradientText sx={{ mt: 1.5, fontSize: 'clamp(28px,4vw,44px)' }}>{t('manager.title')}</GradientText>
            <Typography sx={{ mt: 2, maxWidth: 560, color: 'text.secondary', fontSize: 17, lineHeight: 1.65 }}>{t('manager.lead')}</Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              {rows.map(([title, desc], i) => (
                <Stack key={title} direction="row" spacing={1.75}>
                  <Box sx={{ flex: 'none', width: 28, height: 28, display: 'grid', placeItems: 'center', borderRadius: 2, fontFamily: 'var(--mono)', fontSize: 13, color: 'primary.main', bgcolor: (th) => (th.palette.mode === 'dark' ? 'rgba(45,70,120,0.5)' : 'secondary.main') }}>
                    {i + 1}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 15.5, fontWeight: 650 }}>{title}</Typography>
                    <Typography sx={{ fontSize: 13.5, lineHeight: 1.5, color: 'text.secondary' }}>{desc}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Reveal>

        <Reveal i={1}>
          <MBox
            initial={{ rotate: -2 }}
            whileHover={{ rotate: 0, scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            sx={{
              mx: 'auto', width: '100%', maxWidth: 360, p: 1.5, borderRadius: '30px',
              border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper',
              boxShadow: (th) => (th.palette.mode === 'dark' ? '0 50px 100px -46px rgba(0,0,0,0.7)' : '0 40px 80px -46px rgba(70,93,145,0.35)'),
            }}
          >
            <Box sx={{ overflow: 'hidden', borderRadius: '22px', border: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
              <Box sx={{ px: 2.5, pt: 2, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography sx={{ fontSize: 15, fontWeight: 650 }}>R0dump Manager</Typography>
                <Typography sx={{ mt: 0.25, fontFamily: 'var(--mono)', fontSize: 12, color: 'text.disabled' }}>com.example.packed · all processes</Typography>
              </Box>
              <Stack spacing={1.25} sx={{ p: 2 }}>
                <Chip
                  size="small"
                  label={t('manager.phoneStatus')}
                  sx={{ alignSelf: 'flex-start', color: 'success.main', borderColor: 'success.main', bgcolor: (th) => (th.palette.mode === 'dark' ? 'rgba(157,214,125,0.1)' : 'rgba(56,106,32,0.08)') }}
                  variant="outlined"
                />
                {phoneRows.map(([lab, val]) => (
                  <Stack key={lab} direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 1.75, py: 1.25, borderRadius: 2, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                    <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{lab}</Typography>
                    <Typography sx={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: 'primary.main' }}>{val}</Typography>
                  </Stack>
                ))}
                <Stack direction="row" spacing={0.75} sx={{ pt: 0.5 }}>
                  {tabs.map((tab) => (
                    <Box key={tab} sx={{
                      flex: 1, textAlign: 'center', py: 1, borderRadius: 2, fontSize: 11.5,
                      color: tab === 'Advanced' ? 'primary.main' : 'text.disabled',
                      bgcolor: tab === 'Advanced' ? ((th) => (th.palette.mode === 'dark' ? 'rgba(45,70,120,0.5)' : 'secondary.main')) : 'transparent',
                    }}>
                      {tab}
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </MBox>
        </Reveal>
      </Container>
    </Box>
  )
}
