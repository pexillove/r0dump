# R0DUMP

> [中文](README.md) · English · [Website](https://r0dump.com)

> [!WARNING]
> The official flashable builds target **OnePlus 9 (lemonade / sm8350) only**. Never flash them on another device. Unlocking, flashing, and test-key builds weaken device security and can cause data loss or a hard brick. Back up first and verify the device, version, and checksums.
>
> This project is for security research, interoperability analysis, and education. Use it only on software and devices you own or are explicitly authorized to test. You assume all risk.

<p align="center">
  <img src="site/public/og-image.png" alt="r0dump-fusion: Android 16 ART-integrated unpacking" width="900">
</p>

<p align="center">
  <a href="#download"><strong>Download</strong></a>
  &nbsp;·&nbsp;
  <a href="#basic-usage"><strong>Basic usage</strong></a>
  &nbsp;·&nbsp;
  <a href="docs/en/PORTING.md"><strong>Porting guide</strong></a>
  &nbsp;·&nbsp;
  <a href="#community-ports"><strong>Community ports</strong></a>
  &nbsp;·&nbsp;
  <a href="patches/v2026-09-12-fusion"><strong>Fusion patches</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/tiwe0/r0dump/releases/latest"><strong>Latest release</strong></a>
</p>

`R0DUMP` brings [`FART`](https://github.com/hanbinglengyue/FART)-style active invocation to **Android 16 / ART**. It captures standard and in-memory DEX files inside ART, reconstructs their runtime structures, and uses **R0dump Manager** for configuration, repair, verification, and ZIP export. Exported DEX files can be inspected with `dexdump` or JADX.

Compatibility samples that cannot be captured, repaired, or exported correctly are welcome and help improve R0DUMP. Contact [contact@ivory.cafe](mailto:contact@ivory.cafe).

## Core capabilities

- **ART-integrated capture:** observes DEX registration, class loading, and method dispatch without a third-party hook framework or runtime injection.
- **FART-style active invocation:** walks loaded ClassLoaders and triggers methods so packers decrypt code at runtime.
- **In-memory DEX capture:** recovers business DEX loaded through `InMemoryDexClassLoader` or paths that bypass the standard loader chain.
- **DEX reconstruction:** restores displaced ID tables and section counts from `runtime_view`, rehydrates a standard DEX on device, and recomputes Adler-32 / SHA-1.
- **Stability controls:** asynchronous DUMP queues with scope, budget, and ANR protection.
- **R0dump Manager:** provides target selection, capture configuration, run status, repair, verification, and ZIP export; it also includes an embedded MCP bridge driven over ADB stdio.

## Download

The official reference build is `r0dump-fusion-16`, based on **LineageOS 23.2 / Android 16** for **OnePlus 9 (lemonade / sm8350)** and signed with test keys.

| Variant | Notes | Download |
|---------|-------|----------|
| No-GApps | Clean ROM with the complete R0DUMP feature set | [nogapps.zip](https://dl.r0dump.com/v2026-09-12/lineage_lemonade-r0dump-fusion-16-nogapps.zip) |
| GApps | MindTheGapps injected offline into `product` / `system_ext` | [gapps.zip](https://dl.r0dump.com/v2026-09-12/lineage_lemonade-r0dump-fusion-16-gapps.zip) |
| Source patch bundle | Fusion patch set for reproducible ports | [GitHub Release](https://github.com/tiwe0/r0dump/releases/tag/v2026-09-12-fusion) |

Downloads are also available at [r0dump.com](https://r0dump.com). Read the [Fusion flashing guide](docs/en/FLASHING.md) before starting; the GApps build requires `--disable-verification` when flashing `vbmeta`.

## Basic usage

1. On a OnePlus 9 running the matching build, open R0dump Manager and select an app you are authorized to test.
2. Choose a process mode and DUMP strategy; the defaults target first- and second-generation packer baselines.
3. Enable capture, cold-start the target app, and wait for the run to stop automatically.
4. Tap “Repair and export latest run.”
5. Pull the ZIP and SHA-256 sidecar from `/sdcard/Downloads/r0dump-exports/`, then inspect the repaired DEX files with JADX / `dexdump`.

## Results

| Before | After capture, reconstruction, and repair |
|--------|-------------------------------------------|
| ![Before unpacking](assets/before.png) | ![After repair](assets/after.png) |

## Patches and porting

Source changes are published as `git format-patch` series for Android 16 device and ROM ports. New ports should start with the [porting guide](docs/en/PORTING.md).

| Directory | Notes |
|-----------|-------|
| [`patches/v2026-07-18-seen/`](patches/v2026-07-18-seen) | Early FART-style version, retained for historical reference. |
| [`patches/v2026-09-12-fusion/`](patches/v2026-09-12-fusion) | Current fusion baseline: ART capture, container / in-memory DEX reconstruction, full Manager, MCP bridge, and GApps offline-injection support. |

The fusion set is split across `art`, `frameworks/base`, `system/sepolicy`, `packages/apps/R0dumpManager`, and `vendor/lineage`. See the [patch-set README](patches/v2026-09-12-fusion/README.md) for exact baselines, application order, and conflict handling.

## Community ports

Each Community Port is published and maintained independently. Refer to its repository for the source baseline, installation guide, support, and verification scope.

| Device / ROM | Maintainer | Status and evidence | Source |
|--------------|------------|---------------------|--------|
| Redmi 9A (`blossom` / `dandelion`) · crDroid 12.11 · Android 16 | [`yruh`](https://github.com/yruh) | Reproducible patches + overlays; on-device boot, Manager, DUMP, Repair, and ZIP flow verified; repaired DEX files pass Android 16 `dexdump` | [`yruh/r0dump-redmi9a-crdroid16`](https://github.com/yruh/r0dump-redmi9a-crdroid16) |

To submit a port, follow the [community-port submission checklist](docs/en/PORTING.md#submit-a-community-port) and provide source baselines, patches, build results, on-device verification scope, and safety notes in an Issue or PR. Submissions should be reproducible and must not include proprietary blobs, private keys, or user data.

## Project boundaries

- The only official flashable images currently published are the OnePlus 9 reference builds. Build other devices from the matching Community Port.
- R0DUMP cannot guarantee recovery from every packer or every dynamically generated code path. Results depend on when code is decrypted, observable ART paths, capture budgets, and target behavior.
- Manager ZIP files, reports, and checksum sidecars are research evidence. Preserve the original sample, build metadata, and authorization record.

## Background

R0DUMP studies FART's runtime active-invocation approach and validates its migration, boundary hardening, and engineering on Android 16 / LineageOS 23. LLMs assisted with source reading, cross-version diffing, code changes, and log analysis; conclusions were checked against patches, builds, on-device runs, and dump / repair artifacts.

Technical write-up: [r0dump on Kanxue](https://bbs.kanxue.com/thread-292107.htm)

## Acknowledgements

- Thanks to [`r0ysue`](https://github.com/r0ysue) for guidance and advice.
- Thanks to `寒冰冷月` for [`FART`](https://github.com/hanbinglengyue/FART) and the original articles:
  - [FART: automated unpacking via active invocation under ART](https://bbs.kanxue.com/thread-252630.htm)
  - [FART appetizer: simple, efficient ways to dump in-memory DEX under ART](https://bbs.kanxue.com/thread-254028.htm)
  - [Clearing the fog: the essence of Android unpacking and finding ART unpacking points](https://bbs.kanxue.com/thread-254555.htm)
- Thanks to the **Kanxue community** for open discussion and samples.

## Star history

If R0DUMP is useful to you, a Star is appreciated.

[![Star History Chart](https://api.star-history.com/chart?repos=tiwe0/r0dump&type=date&legend=top-left)](https://www.star-history.com/?repos=tiwe0%2Fr0dump&type=date&legend=top-left)
