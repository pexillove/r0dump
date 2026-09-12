import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const en = {
  nav: { features: 'Features', how: 'How', manager: 'Manager', download: 'Download', thanks: 'Thanks' },
  hero: {
    badge: 'ART-integrated · LineageOS 23.2 · Android 16',
    tag: '> ART-integrated Android unpacking system',
    lead: 'Unpacking compiled straight into the ART runtime: capture along the load chain, FART-style active invocation, and on-device rebuild of container / in-memory DEX — with the {{mgr}} app for one-stop config and export. For hardened in-memory DEX, if the app opens, it dumps.',
    mgr: 'R0dump Manager',
    ctaDownload: 'Download build',
    ctaSource: 'View source',
    termComment: '# cold-start the target, walk triggers active invocation',
    termVerified: 'rehydrate → verified DEX · decompilable in JADX ✓',
    stats: {
      points: 'capture points',
      walk: 'walk + force-invoke',
      rebuild: 'on-device DEX rebuild',
      mcp: 'embedded automation',
    },
  },
  features: {
    eyebrow: 'Capabilities',
    title: 'A runtime built for unpacking',
    lead: 'Not another hook framework — capture, active invocation, rebuild and export wired into one chain from ART to host.',
    items: [
      ['ART-integrated capture', 'Unpacking lives in the runtime. 43 capture points cover DEX registration, class loading and method dispatch — no hook framework, no injection.'],
      ['ClassLoader walk + force-invoke', 'FART-style delay + active invocation: walk every loaded ClassLoader and its DEX, materialize methods on demand so hardened packers decrypt the real code.'],
      ['Container / in-memory DEX rebuild', 'runtime_view records displaced ID tables and section counts; rehydrate into a valid standard DEX on device, recompute adler32 / SHA-1 — ready for dexdump and JADX.'],
      ['Off-load-chain in-memory DEX', 'Tagged pointers from InMemoryDexClassLoader are untagged before maps / process_vm_readv, so business DEX once wrongly dropped is now fully captured.'],
      ['R0dump Manager', 'A native app: pick the app, configure capture mask and budgets, enable / disable, one-tap Repair & Export packaged as a pullable zip.'],
      ['Embedded MCP automation', 'The Manager embeds an MCP server exposed over an adb stdio bridge — pick, configure, start/stop and export are all scriptable.'],
    ],
  },
  pipeline: {
    eyebrow: 'How it works',
    title: 'Configure → Capture → Rebuild → Export',
    lead: 'A deterministic pipeline where every step leaves on-disk evidence and reviewable records.',
    steps: [
      ['Configure', 'Pick target app and process in Manager; set capture mask, walk mode and budgets. Config ships via a generation-sandwich.'],
      ['Capture', 'Cold-start the target, observe DEX along the load chain; the walk actively invokes across ClassLoaders, triggering the packer to decrypt and land raw images.'],
      ['Rebuild', 'RepairDexFixed / rehydrate restore displaced tables and checksums from runtime_view, emitting valid standard DEX.'],
      ['Export', 'Repair & Export packs verified artifacts into a zip; pull over adb and analyze in JADX / dexdump.'],
    ],
  },
  manager: {
    eyebrow: 'R0dump Manager',
    title: 'The whole pipeline in one app',
    lead: 'A Material 3 interface — four tabs cover everything from picking an app to exporting. No commands to memorize, no props to hand-edit.',
    rows: [
      ['Apps', 'Search / rescan installed packages in the picker and lock onto the exact owner-user target process.'],
      ['Capture', 'Configure the 43-bit capture-point mask, choose walk mode and force-invoke strategy.'],
      ['Budgets', 'records / dex bytes / total bytes budgets are independently tunable — coverage vs stability.'],
      ['Advanced', 'ANR protection, MCP switch; one tap to repair and export the latest run as a zip.'],
    ],
    phoneStatus: 'Capture enabled · generation 32',
    phoneRows: [
      ['capture mask', '0x2800000002d'],
      ['walk mode', 'dex_names + force'],
      ['max records', '4096'],
      ['last export', 'verified 102 · usable 24'],
    ],
  },
  download: {
    eyebrow: 'Download',
    title: 'r0dump-fusion-16 · fastboot builds',
    lead: 'Based on LineageOS 23.2 (Android 16), device OnePlus 9 (lemonade · sm8350). Both are fastboot image zips — flash directly with',
    vanillaTag: 'Vanilla',
    vanillaTitle: 'No-GApps build',
    vanillaList: [
      'Clean base ROM with all r0dump-fusion capabilities',
      'R0dump Manager preinstalled',
      'test-keys signed',
    ],
    vanillaBtn: 'Download nogapps',
    gappsTag: 'Recommended',
    gappsTitle: 'GApps build',
    gappsList: [
      'MindTheGapps baked into product / system_ext',
      'GMS / Play Store / services out of the box',
      'Offline injection + AVB re-sign, no recovery sideload',
    ],
    gappsBtn: 'Download gapps',
    note: 'Unlock the bootloader first. The GApps build has product/system_ext offline-injected, so flash vbmeta with {{flag}} (otherwise AVB verification fails). Source changes ship as a patch set — see {{patches}} in Releases. Flashing carries brick risk; verify your device model and back up.',
    patches: 'patches',
  },
  thanks: {
    eyebrow: 'Acknowledgements',
    title: 'Thanks',
    lead: 'r0dump-fusion stands on these open-source projects and research.',
    items: [
      ['LineageOS', 'Built on LineageOS 23.2 — thanks for the long-maintained open Android distribution.', 'https://lineageos.org'],
      ['AOSP / ART', 'The Android Open Source Project and the ART runtime are the foundation of every capture.', 'https://source.android.com'],
      ['FART', 'The delay + active-invocation methodology pays tribute to FART.', null],
      ['MindTheGapps', 'The Google apps in the GApps build come from MindTheGapps.', null],
      ['Kanxue community', 'Thanks to the Kanxue (pediy) reverse-engineering community for open discussion and samples.', 'https://bbs.kanxue.com'],
      ['r0ysue · hanbinglengyue', 'Thanks to r0ysue and hanbinglengyue for their sharing, inspiration and guidance in mobile security.', null],
    ],
  },
  disclaimer: {
    eyebrow: 'Disclaimer',
    title: 'Disclaimer',
    items: [
      ['Research & education only.', 'r0dump-fusion targets Android security research, malware analysis, CTF and authorized testing. Use it lawfully and compliantly.'],
      ['Authorization required.', 'Only unpack devices and apps you own or are explicitly authorized to test. Never use it to infringe IP or for any unlawful purpose.'],
      ['Flash at your own risk.', 'Unlocking the bootloader and flashing unofficial firmware may cause data loss, void warranty or brick the device — you bear the consequences.'],
      ['Unofficial build.', 'This is an UNOFFICIAL build with no affiliation or endorsement from LineageOS, Google, OnePlus or any vendor.'],
      ['Third-party trademarks.', 'Google, Google Play and related apps are trademarks of Google LLC; the GApps build bundles them for convenience only, rights belong to their owners.'],
      ['No warranty.', 'The software is provided “as is” without warranty of any kind; the authors are not liable for any loss from its use.'],
    ],
  },
  footer: {
    tagline: 'ART-integrated Android unpacking · LineageOS 23.2',
    rights: 'For security research and education only · using it means you accept the disclaimer',
  },
  theme: { toLight: 'Switch to light', toDark: 'Switch to dark' },
  lang: { switch: '中文' },
}

const zh = {
  nav: { features: '特性', how: '原理', manager: 'Manager', download: '下载', thanks: '致谢' },
  hero: {
    badge: 'ART 集成 · LineageOS 23.2 · Android 16',
    tag: '> ART 集成的 Android 脱壳系统',
    lead: '把脱壳能力直接编进 ART 运行时:沿加载链捕获、FART 式主动调用、容器/内存 DEX 在设备上重建,配套 {{mgr}} 一站式配置与导出。对加固壳的内存 DEX,做到「进到应用即可脱」。',
    mgr: 'R0dump Manager',
    ctaDownload: '下载刷机包',
    ctaSource: '查看源码',
    termComment: '# 冷启目标应用,walk 触发主动调用',
    termVerified: 'rehydrate → verified DEX · JADX 可反编译业务类 ✓',
    stats: {
      points: 'capture points',
      walk: 'walk + force-invoke',
      rebuild: '设备端 DEX 重建',
      mcp: '内嵌自动化',
    },
  },
  features: {
    eyebrow: 'Capabilities',
    title: '为脱壳而生的运行时',
    lead: '不是又一个 hook 框架,而是把捕获、主动调用、重建、导出串成一条从 ART 到主机的完整链路。',
    items: [
      ['ART 集成捕获', '脱壳逻辑内建于运行时,43 个 capture point 覆盖 DEX 注册、类加载、方法分派等关键路径,无需 hook 框架、不依赖注入。'],
      ['ClassLoader Walk + Force-Invoke', 'FART 式「延迟 + 主动调用」:遍历所有已加载 ClassLoader 与其 DEX,按需触发方法物化,让加固壳把真实代码解密出来。'],
      ['容器 / 内存 DEX 重建', 'runtime_view 记录位移的 ID 表与段计数,设备端 rehydrate 成合法标准 DEX;adler32 / SHA-1 重算,dexdump 与 JADX 直接可用。'],
      ['绕加载链的内存 DEX', 'InMemoryDexClassLoader 的带标签指针在 maps / process_vm_readv 前统一 untag,过去被误丢的业务 DEX 现在完整捕获。'],
      ['R0dump Manager', '原生 App:选应用、配置捕获掩码与预算、启用/停用、一键「修复并导出」,产物打包为 zip 直接拉取。'],
      ['内嵌 MCP 自动化', 'Manager 内建 MCP server,经 adb stdio 桥接暴露全部能力——选包、配置、启停、导出全可脚本化驱动。'],
    ],
  },
  pipeline: {
    eyebrow: 'How it works',
    title: '配置 → 捕获 → 重建 → 导出',
    lead: '一条确定性的管线,每一步都有落盘证据与可复核的记录。',
    steps: [
      ['配置', 'Manager 选目标应用与进程,设定捕获掩码、walk 模式、预算;配置经 generation-sandwich 下发。'],
      ['捕获', '冷启目标,沿加载链观察 DEX;walk 遍历 ClassLoader 主动调用,触发壳解密并落盘原始镜像。'],
      ['重建', 'RepairDexFixed / rehydrate 依 runtime_view 还原位移表与校验和,输出合法标准 DEX。'],
      ['导出', '「修复并导出」把 verified 产物打包 zip,adb 拉取;JADX / dexdump 直接分析业务代码。'],
    ],
  },
  manager: {
    eyebrow: 'R0dump Manager',
    title: '把复杂管线收进一个 App',
    lead: 'Material 3 界面,四个页签覆盖从选包到导出的全流程;无需记命令,也无需手改属性。',
    rows: [
      ['Apps', '在应用选择器里搜索 / 重扫已安装包,精确锁定 owner-user 目标进程。'],
      ['Capture', '按位配置 43 个 capture point 的掩码,选择 walk 模式与 force-invoke 策略。'],
      ['Budgets', 'records / dex bytes / total bytes 等预算独立可调,兼顾覆盖与稳定。'],
      ['Advanced', 'ANR 保护、MCP 开关;一键修复并导出最新产物为 zip。'],
    ],
    phoneStatus: 'Capture enabled · generation 32',
    phoneRows: [
      ['capture mask', '0x2800000002d'],
      ['walk mode', 'dex_names + force'],
      ['max records', '4096'],
      ['last export', 'verified 102 · usable 24'],
    ],
  },
  download: {
    eyebrow: 'Download',
    title: 'r0dump-fusion-16 · fastboot 刷机包',
    lead: '基于 LineageOS 23.2(Android 16),设备 OnePlus 9(lemonade · sm8350)。两种版本均为 fastboot image zip,直刷',
    vanillaTag: 'Vanilla',
    vanillaTitle: '无 GApps 版',
    vanillaList: [
      '纯净原始 ROM,含全部 r0dump-fusion 能力',
      'R0dump Manager 预装',
      'test-keys 签名',
    ],
    vanillaBtn: '下载 nogapps',
    gappsTag: 'Recommended',
    gappsTitle: 'GApps 版',
    gappsList: [
      'product / system_ext 已内置 MindTheGapps',
      'GMS / Play 商店 / 服务框架开箱即用',
      '离线注入 + AVB 重签,免 recovery sideload',
    ],
    gappsBtn: '下载 gapps',
    note: '刷机前请解锁 Bootloader;GApps 版的 product/system_ext 经离线注入,刷入 vbmeta 时需 {{flag}}(否则 AVB 校验会失败)。源码改动以 patch 集形式提供,见 Releases 中的 {{patches}}。刷机有变砖风险,请自行确认设备型号与备份。',
    patches: 'patches',
  },
  thanks: {
    eyebrow: 'Acknowledgements',
    title: '致谢',
    lead: 'r0dump-fusion 站在这些开源项目与研究成果之上。',
    items: [
      ['LineageOS', '本项目基于 LineageOS 23.2 构建,感谢其长期维护的开源 Android 发行版。', 'https://lineageos.org'],
      ['AOSP / ART', 'Android 开源项目与 ART 运行时是全部捕获能力的根基。', 'https://source.android.com'],
      ['FART', '「延迟 + 主动调用」的脱壳方法学致敬 FART 的思路。', null],
      ['MindTheGapps', 'GApps 版所用的 Google 应用打包来自 MindTheGapps。', null],
      ['看雪社区', '感谢看雪(pediy)逆向与安全研究社区的公开讨论与样本。', 'https://bbs.kanxue.com'],
      ['r0ysue · hanbinglengyue', '感谢 r0ysue 与 hanbinglengyue 在移动安全领域的分享、启发与指导。', null],
    ],
  },
  disclaimer: {
    eyebrow: 'Disclaimer',
    title: '免责说明',
    items: [
      ['仅供研究与教育。', 'r0dump-fusion 面向 Android 安全研究、恶意软件分析、CTF 与授权测试,请在合法合规的前提下使用。'],
      ['授权前提。', '仅对你拥有或已获得明确授权的设备与应用进行脱壳分析;严禁用于侵犯他人知识产权或任何违法用途。'],
      ['刷机风险自负。', '解锁 Bootloader 与刷入非官方固件可能导致数据丢失、保修失效或设备损坏,后果由使用者自行承担。'],
      ['非官方构建。', '本项目为非官方(UNOFFICIAL)构建,与 LineageOS、Google、OnePlus 及任何厂商无隶属或背书关系。'],
      ['第三方商标。', 'Google、Google Play 及相关应用为 Google LLC 的商标,GApps 版仅为便利集成,相关权利归各自所有者。'],
      ['不提供担保。', '软件按「现状」提供,不含任何明示或默示担保;作者不对使用本项目造成的任何损失负责。'],
    ],
  },
  footer: {
    tagline: 'ART 集成的 Android 脱壳 · LineageOS 23.2',
    rights: '仅供安全研究与教育用途 · 使用即代表同意免责说明',
  },
  theme: { toLight: '切换到亮色', toDark: '切换到暗色' },
  lang: { switch: 'EN' },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { t: en }, zh: { t: zh } },
    ns: ['t'],
    defaultNS: 't',
    fallbackLng: 'zh',
    supportedLngs: ['zh', 'en'],
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'], lookupLocalStorage: 'r0dump-lang' },
  })

export default i18n
