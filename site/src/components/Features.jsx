import { useTranslation } from 'react-i18next'
import { Box, Container, Card, CardContent, Typography } from '@mui/material'
import MemoryIcon from '@mui/icons-material/Memory'
import LoopIcon from '@mui/icons-material/Loop'
import LayersIcon from '@mui/icons-material/Layers'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import TerminalIcon from '@mui/icons-material/Terminal'
import { Reveal, SectionHead, MBox } from './ui.jsx'

const ICONS = [MemoryIcon, LoopIcon, LayersIcon, LocalOfferIcon, DashboardCustomizeIcon, TerminalIcon]

export default function Features() {
  const { t } = useTranslation()
  const items = t('features.items', { returnObjects: true })
  return (
    <Box component="section" id="features" sx={{ py: 12, position: 'relative' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1160 }}>
        <SectionHead eyebrow={t('features.eyebrow')} title={t('features.title')} lead={t('features.lead')} />
        <Box sx={{ mt: 5, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' } }}>
          {items.map(([title, desc], i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <Reveal i={i} key={title}>
                <MBox whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} sx={{ height: '100%' }}>
                  <Card sx={{ height: '100%', borderRadius: 4, transition: 'border-color .25s', '&:hover': { borderColor: 'primary.main' } }}>
                    <CardContent sx={{ p: 3.25 }}>
                      <Box sx={{
                        width: 44, height: 44, mb: 2.25, display: 'grid', placeItems: 'center', borderRadius: 2.5,
                        color: 'primary.main', border: '1px solid', borderColor: 'divider',
                        bgcolor: (th) => (th.palette.mode === 'dark' ? 'rgba(45,70,120,0.4)' : 'secondary.main'),
                      }}>
                        <Icon />
                      </Box>
                      <Typography sx={{ fontSize: 19, fontWeight: 650, mb: 1 }}>{title}</Typography>
                      <Typography sx={{ fontSize: 14.5, lineHeight: 1.62, color: 'text.secondary' }}>{desc}</Typography>
                    </CardContent>
                  </Card>
                </MBox>
              </Reveal>
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}
