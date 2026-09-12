import { useTranslation } from 'react-i18next'
import { Box, Container, Card, CardContent, Typography, Stack, Link } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Reveal, SectionHead, MBox } from './ui.jsx'

export default function Thanks() {
  const { t } = useTranslation()
  const items = t('thanks.items', { returnObjects: true })
  return (
    <Box component="section" id="thanks" sx={{ py: 12 }}>
      <Container maxWidth={false} sx={{ maxWidth: 1160 }}>
        <SectionHead eyebrow={t('thanks.eyebrow')} title={t('thanks.title')} lead={t('thanks.lead')} />
        <Box sx={{ mt: 4.5, display: 'grid', gap: 1.75, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' } }}>
          {items.map(([name, desc, url], i) => (
            <Reveal i={i} key={name}>
              <MBox whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} sx={{ height: '100%' }}>
                <Card sx={{ height: '100%', borderRadius: 3, transition: 'border-color .25s', '&:hover': { borderColor: 'primary.main' } }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.75 }}>
                      <FavoriteBorderIcon sx={{ fontSize: 15, color: 'primary.main' }} />
                      <Typography sx={{ fontSize: 15.5, fontWeight: 650 }}>{name}</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 13, lineHeight: 1.55, color: 'text.secondary' }}>
                      {desc}{' '}
                      {url && (
                        <Link href={url} target="_blank" rel="noreferrer" aria-label={`${name} ↗`} sx={{ display: 'inline-flex', verticalAlign: 'middle', color: 'primary.main' }}>
                          <OpenInNewIcon sx={{ fontSize: 13 }} />
                        </Link>
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </MBox>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
