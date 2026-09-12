# R0DUMP

> 中文 · [English](README.en.md) · 官网:[r0dump.com](https://r0dump.com)

`R0DUMP` 是一个受 [`FART`](https://github.com/hanbinglengyue/FART) 启发、把经典**主动调用脱壳**思想迁移并深度融合进 **Android 16 / LineageOS 23.2** 运行时(ART)的脱壳定制系统,配套一个集配置、监控、修复、导出于一体的 GUI 管理器 **R0dump Manager**。

## 免责声明

> ⚠️ 该系统为适配 `OnePlus 9` 的 `Android 16` 镜像,不能跨设备随意刷,变砖概不负责。
>
> ⚠️ 本项目仅供安全研究与学习交流,请仅在获得授权的软件与设备上使用;使用者的任何行为与本项目开发者无关。
>
> ⚠️ Use at your own risk.

## 特性

- **ART 集成捕获**:脱壳内建于运行时,覆盖 DEX 注册、类加载、方法分派等关键点,无需 hook 框架、不依赖注入。
- **主动调用(FART 式)**:延迟 + 遍历所有 ClassLoader 主动调用,触发加固壳把真实代码解密。
- **加固壳内存 DEX 捕获**:能完整拿下 `InMemoryDexClassLoader` 加载、绕过标准加载链的业务 DEX。
- **容器 / 内存 DEX 重建**:依 `runtime_view` 还原位移的 ID 表与段计数,设备端 rehydrate 成合法标准 DEX(重算 adler32 / SHA-1),`dexdump` / JADX 直接可用。
- **异步队列 DUMP + ANR 保护**;**R0dump Manager** 一站式选包、配置捕获掩码与预算、启停、"修复并导出" 打包成 zip。

## 下载

| 版本 | 说明 | 下载 |
|------|------|------|
| 无 GApps | 纯净原始 ROM,含全部 R0DUMP 能力 | [nogapps.zip](https://dl.r0dump.com/v2026-09-12/lineage_lemonade-r0dump-fusion-16-nogapps.zip) |
| GApps 版 | product/system_ext 已内置 MindTheGapps | [gapps.zip](https://dl.r0dump.com/v2026-09-12/lineage_lemonade-r0dump-fusion-16-gapps.zip) |

也可直接从官网下载:[r0dump.com](https://r0dump.com)。设备:`OnePlus 9`(lemonade / sm8350),基线:`LineageOS 23.2 / Android 16`,test-keys 签名。

## 使用

### 准备
1. 一台已解锁 Bootloader 的 OnePlus 9;
2. 下载最新 R0DUMP 系统(需 Google 生态则用 GApps 版)。

### 刷机
参考 [刷机教程](docs/R0DUMP%20刷机教程.md)。GApps 版为离线注入,刷 `vbmeta` 时需 `--disable-verification`。

### DUMP
1. 打开 R0dump Manager,选择目标 App;
2. 选择进程模式与 DUMP 策略(默认面向 1/2 代壳基线);
3. 启用捕获并冷启目标,喝杯咖啡等待;
4. "修复并导出最新产物" → zip 落在 `/sdcard/Downloads/r0dump-exports/`。

## 补丁 / 移植(`patches/`)

源码改动以 `git format-patch` 形式提供,可移植到其他机型/构建。分两个版本:

| 目录 | 说明 |
|------|------|
| [`patches/v2026-07-18-seen/`](patches/v2026-07-18-seen) | 早期版本:基于 FART 思路的初版,按仓库聚合的整包 patch(`patches/`、`new-projects/` + `apply-patches.sh`)。 |
| [`patches/v2026-09-12-fusion/`](patches/v2026-09-12-fusion) | 最新**融合版**:跨仓库逐提交 patch 集,含容器/内存 DEX 重建、Manager 全量能力与内嵌 MCP、GApps 离线注入配套。 |

fusion 版按仓库分目录(`art/`、`frameworks_base/`、`system_sepolicy/`、`packages_apps_R0dumpManager/`、`vendor_lineage/`),各目录内为编号 patch;应用方式(基线、`git am` 顺序、冲突处理)见 [`patches/v2026-09-12-fusion/README.md`](patches/v2026-09-12-fusion/README.md)。

## 脱壳效果

| 脱壳前 | 脱壳后 |
|--------|--------|
| ![before](assets/before.png) | ![after](assets/after.png) |

## 开发说明

本项目主要用于学习 `FART` 的运行时脱壳思路,并验证其在 `Android 16` / `LineageOS 23` 环境中的迁移与增强可行性。开发中使用了大模型辅助源码阅读、版本差异整理、代码修改与日志分析;相关结论均结合实际 patch、编译结果、真机运行与 dump/repair 产物核对(已在多进程加固壳样本上实测:内存业务 DEX 可完整脱出并经 JADX 反编译)。

详情移步看雪论坛:[r0dump](https://bbs.kanxue.com/thread-292107.htm)。

## 致谢

- 感谢 [`r0ysue`](https://github.com/r0ysue) 老师的指导与建议;
- 感谢 `寒冰冷月` 老师的 [`FART` 项目](https://github.com/hanbinglengyue/FART) 及技术文章:
  - [FART:ART环境下基于主动调用的自动化脱壳方案](https://bbs.kanxue.com/thread-252630.htm)
  - [FART正餐前甜点:ART下几个通用简单高效的 dump 内存中 dex 方法](https://bbs.kanxue.com/thread-254028.htm)
  - [拨云见日:安卓 App 脱壳的本质以及如何快速发现 ART 下的脱壳点](https://bbs.kanxue.com/thread-254555.htm)
- 感谢 **看雪社区** 的公开讨论与样本。
