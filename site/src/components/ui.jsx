import { motion } from 'framer-motion'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export const MBox = motion(Box)

export const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function Reveal({ children, i = 0, sx, id }) {
  return (
    <MBox
      id={id}
      sx={sx}
      variants={rise}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
    >
      {children}
    </MBox>
  )
}

// gradient title in dark, solid in light (light-mode gradients looked off)
export function GradientText({ children, sx, variant = 'h2', component }) {
  const t = useTheme()
  const dark = t.palette.mode === 'dark'
  return (
    <Typography
      variant={variant}
      component={component}
      sx={{
        ...(dark
          ? {
              background: 'var(--title-grad)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }
          : { color: 'text.primary' }),
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
}

export function SectionHead({ eyebrow, title, lead }) {
  return (
    <Reveal>
      <Typography variant="overline" sx={{ color: 'primary.main', fontSize: 12.5, display: 'inline-flex', alignItems: 'center', gap: 1 }}>
        <Box component="span" sx={{ width: 22, height: '1px', bgcolor: 'primary.main', opacity: 0.6 }} />
        {eyebrow}
      </Typography>
      <GradientText sx={{ mt: 1.5, fontSize: 'clamp(28px,4vw,44px)' }}>{title}</GradientText>
      {lead && (
        <Typography sx={{ mt: 2, maxWidth: 660, color: 'text.secondary', fontSize: 17, lineHeight: 1.65 }}>
          {lead}
        </Typography>
      )}
    </Reveal>
  )
}
