import { useTranslation } from 'react-i18next'
import { Box, Container, Card, CardContent, Typography, Button, Stack, Alert, Link } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import CheckIcon from '@mui/icons-material/CheckCircleOutline'
import { Reveal, SectionHead } from './ui.jsx'
import { CONFIG } from '../config.js'

function NoteBody() {
  const { t } = useTranslation()
  const flag = '--disable-verification'
  const parts = t('download.note', { flag: '§FLAG§', patches: '§PATCHES§' }).split(/(§FLAG§|§PATCHES§)/)
  return (
    <Typography sx={{ fontSize: 13.5, lineHeight: 1.6, color: 'text.secondary' }}>
      {parts.map((p, i) => {
        if (p === '§FLAG§') return <Box key={i} component="code" sx={{ fontFamily: 'var(--mono)', color: 'warning.main' }}>{flag}</Box>
        if (p === '§PATCHES§') return <Link key={i} href={CONFIG.patches} target="_blank" rel="noreferrer" color="warning.main" underline="hover">{t('download.patches')}</Link>
        return <Box component="span" key={i}>{p}</Box>
      })}
    </Typography>
  )
}

function DlCard({ featured, tag, title, file, size, list, btn, href }) {
  return (
    <Card sx={{ height: '100%', borderRadius: 4, ...(featured && { borderColor: 'primary.main', boxShadow: (th) => `0 30px 70px -46px ${th.palette.mode === 'dark' ? 'rgba(175,198,255,0.5)' : 'rgba(70,93,145,0.4)'}` }) }}>
      <CardContent sx={{ p: 3.5, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography sx={{ fontFamily: 'var(--mono)', fontSize: 11.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'primary.main' }}>{tag}</Typography>
        <Typography sx={{ mt: 1.5, mb: 0.5, fontSize: 22, fontWeight: 700 }}>{title}</Typography>
        <Typography sx={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: 'text.disabled', wordBreak: 'break-all' }}>{file} · {size}</Typography>
        <Stack spacing={1.25} sx={{ my: 2.5 }}>
          {list.map((li) => (
            <Stack key={li} direction="row" spacing={1.25} alignItems="flex-start">
              <CheckIcon sx={{ fontSize: 18, color: 'primary.main', mt: '2px' }} />
              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>{li}</Typography>
            </Stack>
          ))}
        </Stack>
        <Button href={href} target="_blank" rel="noreferrer" variant={featured ? 'contained' : 'outlined'} color={featured ? 'primary' : 'inherit'}
          startIcon={<DownloadIcon />} sx={{ mt: 'auto', ...(!featured && { borderColor: 'divider', color: 'text.primary' }) }}>
          {btn}
        </Button>
      </CardContent>
    </Card>
  )
}

export default function Download() {
  const { t } = useTranslation()
  return (
    <Box component="section" id="download" sx={{ py: 12 }}>
      <Container maxWidth={false} sx={{ maxWidth: 1160 }}>
        <SectionHead eyebrow={t('download.eyebrow')} title={t('download.title')} />
        <Reveal>
          <Typography sx={{ mt: 2, maxWidth: 680, color: 'text.secondary', fontSize: 17, lineHeight: 1.65 }}>
            {t('download.lead')}{' '}
            <Box component="code" sx={{ fontFamily: 'var(--mono)', color: 'primary.main' }}>fastboot -w update xxx.zip</Box>.
          </Typography>
        </Reveal>

        <Box sx={{ mt: 4.5, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          <Reveal>
            <DlCard tag={t('download.vanillaTag')} title={t('download.vanillaTitle')} file="…-nogapps.zip" size="~2.05 GB"
              list={t('download.vanillaList', { returnObjects: true })} btn={t('download.vanillaBtn')} href={CONFIG.releaseNoGapps} />
          </Reveal>
          <Reveal i={1}>
            <DlCard featured tag={t('download.gappsTag')} title={t('download.gappsTitle')} file="…-gapps.zip" size="~3.27 GB"
              list={t('download.gappsList', { returnObjects: true })} btn={t('download.gappsBtn')} href={CONFIG.releaseGapps} />
          </Reveal>
        </Box>

        <Reveal>
          <Alert severity="warning" variant="outlined" sx={{ mt: 3.5, borderRadius: 3, alignItems: 'flex-start', '& .MuiAlert-message': { pt: '3px' } }}>
            <NoteBody />
          </Alert>
        </Reveal>
      </Container>
    </Box>
  )
}
