import { useTranslation } from 'react-i18next'
import { Box, Container, Card, Stack, Typography } from '@mui/material'
import GppMaybeIcon from '@mui/icons-material/GppMaybeOutlined'
import { Reveal, SectionHead } from './ui.jsx'

export default function Disclaimer() {
  const { t } = useTranslation()
  const items = t('disclaimer.items', { returnObjects: true })
  return (
    <Box component="section" id="disclaimer" sx={{ py: 12 }}>
      <Container maxWidth={false} sx={{ maxWidth: 1160 }}>
        <SectionHead eyebrow={t('disclaimer.eyebrow')} title={t('disclaimer.title')} />
        <Reveal>
          <Card sx={{ mt: 3.5, borderRadius: 4 }}>
            <Box sx={{ p: 3.5, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
              {items.map(([head, body]) => (
                <Stack key={head} direction="row" spacing={1.5}>
                  <GppMaybeIcon sx={{ fontSize: 20, color: 'warning.main', mt: '2px', flex: 'none' }} />
                  <Typography sx={{ fontSize: 14, lineHeight: 1.6, color: 'text.secondary' }}>
                    <Box component="b" sx={{ color: 'text.primary' }}>{head}</Box> {body}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Card>
        </Reveal>
      </Container>
    </Box>
  )
}
