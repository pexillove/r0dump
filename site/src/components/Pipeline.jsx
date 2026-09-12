import { useTranslation } from 'react-i18next'
import { Box, Container, Card, CardContent, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos'
import { Reveal, SectionHead } from './ui.jsx'

export default function Pipeline() {
  const { t } = useTranslation()
  const steps = t('pipeline.steps', { returnObjects: true })
  return (
    <Box component="section" id="pipeline" sx={{ py: 12 }}>
      <Container maxWidth={false} sx={{ maxWidth: 1160 }}>
        <SectionHead eyebrow={t('pipeline.eyebrow')} title={t('pipeline.title')} lead={t('pipeline.lead')} />
        <Box sx={{ mt: 5.5, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4,1fr)' } }}>
          {steps.map(([title, desc], i) => (
            <Reveal i={i} key={title}>
              <Card sx={{ height: '100%', borderRadius: 3, position: 'relative' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography sx={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'primary.main' }}>
                    {String(i + 1).padStart(2, '0')}
                  </Typography>
                  <Typography sx={{ mt: 1, mb: 1, fontSize: 17, fontWeight: 650 }}>{title}</Typography>
                  <Typography sx={{ fontSize: 13.5, lineHeight: 1.55, color: 'text.secondary' }}>{desc}</Typography>
                  {i < steps.length - 1 && (
                    <ArrowForwardIcon sx={{ position: 'absolute', right: -11, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: 'text.disabled', display: { xs: 'none', lg: 'block' } }} />
                  )}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
