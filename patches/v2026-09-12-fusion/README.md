# r0dump-fusion patch set

本目录是 **r0dump-fusion** 特性相对各仓库上游基线的完整改动，导出为 `git format-patch` 系列。
配套刷机包见上级目录：`lineage_lemonade-r0dump-fusion-16-nogapps.zip` / `-gapps.zip`。

生成日期：2026-09-12。目标：LineageOS 23.2（Android 16）/ OnePlus 9 (lemonade, sm8350)。

## 各仓库基线与提交数

| 子目录 | 仓库路径 | 上游基线 | 提交数 |
|--------|----------|----------|--------|
| `art/` | `art` | tag `android-16.0.0_r4` (aosp) | 21 |
| `frameworks_base/` | `frameworks/base` | `lineage-23.2` (LineageOS) | 9 |
| `system_sepolicy/` | `system/sepolicy` | `lineage-23.2` (LineageOS) | 4 |
| `packages_apps_R0dumpManager/` | `packages/apps/R0dumpManager` | 全新仓库（`--root`，无上游） | 32 |
| `vendor_lineage/` | `vendor/lineage` | 未提交改动（`git diff`） | 1 (diff) |

`packages/apps/R0dumpManager` 是本项目新增的整仓，需在 manifest 里新增该 project 后再应用（或直接把 32 个 patch 从 `--root` 顺序 am 到一个空仓）。

`vendor_lineage/0001-*.diff` 是设置>关于里“LineageOS 版本”品牌名改为 `r0dump-fusion-16` 的改动（`config/version.mk` 的 `LINEAGE_DISPLAY_VERSION`），当时未提交，故以 `git diff` 形式给出。

## 应用方法

在对应仓库根目录（顺序 = 文件名编号）：

```bash
# 已提交的仓库（art / frameworks_base / system_sepolicy / R0dumpManager）
cd <repo>
git am /mnt/d/r0dump-fusion-16/patches/<subdir>/*.patch

# vendor/lineage 品牌名（未提交 diff）
cd vendor/lineage
git apply /mnt/d/r0dump-fusion-16/patches/vendor_lineage/0001-brand-r0dump-fusion-16-display-version.diff
```

若 `git am` 因基线差异冲突，可改用 `git am -3`（三方合并）或对单个 patch `git apply --reject` 后手动处理。

## 特性概要

- **art**：ART 集成脱壳捕获管线（43 capture points、class-loader walk + force-invoke）、容器/内存 DEX 重建与证据保留、加固壳内存业务 DEX 捕获修复。
- **frameworks/base**：fusion 配置读写路径、AMS 产物导出桥接、force-capture 作用域、owner-scoped 发布。
- **system/sepolicy**：r0dump_manager_app / helper 域、属性契约、导出存储、MCP 桥接 socket（userdebug）。
- **packages/apps/R0dumpManager**：Manager 应用（配置 UI、run 选择、on-device rehydrate、adler32 修复、rescan、gen1/2 默认基线、内嵌 MCP server + stdio 桥接）。
- **vendor/lineage**：品牌显示名 `r0dump-fusion-16`。
