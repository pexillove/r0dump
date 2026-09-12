import { createTheme } from '@mui/material/styles'

const mono = '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace'

// Palettes taken from R0dump Manager's Material 3 light/dark schemes. Flat, no gradients.
const palettes = {
  dark: {
    mode: 'dark',
    primary: { main: '#afc6ff', contrastText: '#0e1626' },
    secondary: { main: '#2d4678', contrastText: '#dbe3ff' },
    success: { main: '#9dd67d' },
    warning: { main: '#fabb63' },
    background: { default: '#121318', paper: '#191b21' },
    text: { primary: '#e5e4ec', secondary: '#b7b8c4' },
    divider: 'rgba(143,144,154,0.24)',
    grid: 'rgba(143,144,154,0.06)',
    mesh:
      'radial-gradient(60% 50% at 12% -5%, rgba(45,70,120,0.55), transparent 60%),' +
      'radial-gradient(55% 45% at 92% 8%, rgba(80,60,140,0.34), transparent 60%),' +
      'radial-gradient(50% 60% at 60% 105%, rgba(30,60,110,0.4), transparent 65%)',
    titleGrad: 'linear-gradient(180deg, #ffffff 16%, #afc6ff 130%)',
    accent: 'linear-gradient(135deg, #afc6ff, #8fb0ff)',
  },
  light: {
    mode: 'light',
    primary: { main: '#465d91', contrastText: '#ffffff' },
    secondary: { main: '#d9e2ff', contrastText: '#001a41' },
    success: { main: '#386a20' },
    warning: { main: '#805500' },
    background: { default: '#faf8ff', paper: '#ffffff' },
    text: { primary: '#1a1b21', secondary: '#444552', disabled: '#5b5d69' },
    divider: 'rgba(28,27,33,0.14)',
    grid: 'rgba(70,93,145,0.06)',
    // very subtle on white so it never looks "off"
    mesh: 'radial-gradient(60% 50% at 92% 4%, rgba(70,93,145,0.07), transparent 62%)',
    titleGrad: 'none',
    accent: 'none',
  },
}

export function getTheme(mode) {
  const p = palettes[mode] || palettes.dark
  return createTheme({
    palette: {
      mode: p.mode,
      primary: p.primary,
      secondary: p.secondary,
      success: p.success,
      warning: p.warning,
      background: p.background,
      text: p.text,
      divider: p.divider,
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: '"Inter Variable", Inter, system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.04em' },
      h2: { fontWeight: 750, letterSpacing: '-0.02em' },
      h3: { fontWeight: 700 },
      button: { textTransform: 'none', fontWeight: 600 },
      overline: { fontFamily: mono, letterSpacing: '0.22em', fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--grid': p.grid,
            '--scroll': p.divider,
            '--mesh': p.mesh,
            '--title-grad': p.titleGrad,
            '--accent': p.accent,
            '--mono': mono,
          },
          body: { backgroundColor: p.background.default, transition: 'background-color .4s ease, color .4s ease' },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: 'transparent' },
        styleOverrides: {
          root: {
            backdropFilter: 'blur(16px)',
            backgroundColor:
              mode === 'dark' ? 'rgba(18,19,24,0.72)' : 'rgba(250,248,255,0.72)',
            borderBottom: `1px solid ${p.divider}`,
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: `1px solid ${p.divider}`,
            backgroundColor: p.background.paper,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 12, paddingInline: 20, paddingBlock: 10 },
          containedPrimary: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
        },
      },
      MuiChip: { styleOverrides: { root: { fontFamily: mono } } },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    },
  })
}

export const monoFont = mono
