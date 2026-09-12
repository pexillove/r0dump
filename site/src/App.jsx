import { useEffect } from 'react'
import { motion, useScroll, useSpring, MotionConfig } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Pipeline from './components/Pipeline.jsx'
import Manager from './components/Manager.jsx'
import Download from './components/Download.jsx'
import Thanks from './components/Thanks.jsx'
import Disclaimer from './components/Disclaimer.jsx'
import Footer from './components/Footer.jsx'

function ScrollBar() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  return (
    <Box
      component={motion.div}
      style={{ scaleX: x }}
      sx={{ position: 'fixed', insetInline: 0, top: 0, height: 2, transformOrigin: '0%', bgcolor: 'primary.main', zIndex: 1300 }}
    />
  )
}

const TITLES = {
  zh: 'r0dump-fusion — ART 集成脱壳系统',
  en: 'r0dump-fusion — ART-integrated Android unpacking',
}
const DESCS = {
  zh: 'r0dump-fusion:ART 集成的 Android 脱壳系统——加载链捕获、FART 式主动调用、容器/内存 DEX 重建,配套 R0dump Manager。',
  en: 'r0dump-fusion: an ART-integrated Android unpacking system — load-chain capture, FART-style active invocation, container/in-memory DEX rebuild, with R0dump Manager.',
}

export default function App() {
  const { i18n } = useTranslation()
  useEffect(() => {
    const lng = i18n.language && i18n.language.startsWith('en') ? 'en' : 'zh'
    document.documentElement.lang = lng === 'en' ? 'en' : 'zh-CN'
    document.title = TITLES[lng]
    const setMeta = (sel, attr, val) => {
      const el = document.querySelector(sel)
      if (el) el.setAttribute(attr, val)
    }
    setMeta('meta[name="description"]', 'content', DESCS[lng])
    setMeta('meta[property="og:title"]', 'content', TITLES[lng])
    setMeta('meta[property="og:description"]', 'content', DESCS[lng])
    setMeta('meta[property="og:locale"]', 'content', lng === 'en' ? 'en_US' : 'zh_CN')
    setMeta('meta[name="twitter:title"]', 'content', TITLES[lng])
    setMeta('meta[name="twitter:description"]', 'content', DESCS[lng])
  }, [i18n.language])

  return (
    <MotionConfig reducedMotion="user">
      {/* ambient background — mesh gradient is theme-aware (rich in dark, faint in light) */}
      <Box aria-hidden sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'var(--mesh)', transition: 'background .5s ease' }} />
      <Box aria-hidden className="bg-grid" />
      <ScrollBar />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <main>
          <Hero />
          <Features />
          <Pipeline />
          <Manager />
          <Download />
          <Thanks />
          <Disclaimer />
        </main>
        <Footer />
      </Box>
    </MotionConfig>
  )
}
