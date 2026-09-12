# R0DUMP

> [中文](README.md) · English · Site: [r0dump.com](https://r0dump.com)

`R0DUMP` is an ART-integrated Android unpacking system for **Android 16 / LineageOS 23.2**, inspired by [`FART`](https://github.com/hanbinglengyue/FART): it migrates and deepens the classic *active-invocation* unpacking idea straight into the ART runtime, and ships **R0dump Manager** — a GUI that unifies configuration, monitoring, repair and export.

## Disclaimer

> ⚠️ This build targets `OnePlus 9` / `Android 16` only. Do not flash it on other devices. Bricking is on you.
>
> ⚠️ For security research and study only. Use it strictly on software and devices you are authorized to test; the authors are not responsible for any use.
>
> ⚠️ Use at your own risk.

## Features

- **ART-integrated capture**: unpacking lives in the runtime, covering DEX registration, class loading and method dispatch — no hook framework, no injection.
- **Active invocation (FART-style)**: delay + walk every loaded ClassLoader and actively invoke, so hardened packers decrypt the real code.
- **In-memory DEX capture**: recovers business DEX loaded by `InMemoryDexClassLoader` that bypasses the standard load chain.
- **Container / in-memory DEX rebuild**: restores displaced ID tables and section counts from `runtime_view`, rehydrating valid standard DEX on device (adler32 / SHA-1 recomputed) — ready for `dexdump` / JADX.
- **Async queued DUMP + ANR protection**; **R0dump Manager** for one-stop app selection, capture-mask/budget config, enable/disable, and "repair & export" into a zip.

## Download

| Variant | Notes | Link |
|---------|-------|------|
| No-GApps | Clean base ROM with all R0DUMP capabilities | [nogapps.zip](https://dl.r0dump.com/v2026-09-12/lineage_lemonade-r0dump-fusion-16-nogapps.zip) |
| GApps | MindTheGapps baked into product/system_ext | [gapps.zip](https://dl.r0dump.com/v2026-09-12/lineage_lemonade-r0dump-fusion-16-gapps.zip) |

Or download from the site: [r0dump.com](https://r0dump.com). Device: `OnePlus 9` (lemonade / sm8350); base: `LineageOS 23.2 / Android 16`; test-keys signed.

## Usage

### Prepare
1. A OnePlus 9 with an unlocked bootloader;
2. Download the latest R0DUMP build (use the GApps variant if you need Google services).

### Flash
See the [flashing guide](docs/R0DUMP%20刷机教程.md). The GApps build is offline-injected, so flash `vbmeta` with `--disable-verification`.

### DUMP
1. Open R0dump Manager and pick the target app;
2. Choose the process mode and DUMP strategy (defaults target 1st/2nd-gen packers);
3. Enable capture, cold-start the target, and grab a coffee;
4. "Repair and export latest run" → the zip lands in `/sdcard/Downloads/r0dump-exports/`.

## Patches / porting (`patches/`)

Source changes are provided as `git format-patch` series so they can be ported to other devices/builds. Two versions:

| Directory | Notes |
|-----------|-------|
| [`patches/v2026-07-18-seen/`](patches/v2026-07-18-seen) | Early version: the initial FART-style port, aggregated per-repo patches (`patches/`, `new-projects/` + `apply-patches.sh`). |
| [`patches/v2026-09-12-fusion/`](patches/v2026-09-12-fusion) | Latest **fusion** version: a cross-repo per-commit patch set — container/in-memory DEX rebuild, full Manager capabilities with an embedded MCP server, and the GApps offline-injection toolkit. |

The fusion set is split per repo (`art/`, `frameworks_base/`, `system_sepolicy/`, `packages_apps_R0dumpManager/`, `vendor_lineage/`); see [`patches/v2026-09-12-fusion/README.md`](patches/v2026-09-12-fusion/README.md) for baselines, `git am` order and conflict handling.

## Results

| Before | After |
|--------|-------|
| ![before](assets/before.png) | ![after](assets/after.png) |

## About

This project studies `FART`'s runtime-unpacking approach and validates its migration and enhancement on `Android 16` / `LineageOS 23`. LLMs assisted with source reading, cross-version diffing, code changes and log analysis; every conclusion was cross-checked against real patches, build results, on-device runs and dump/repair artifacts (verified on a multi-process hardened-packer sample: the in-memory business DEX was recovered in full and decompiled in JADX).

More on Kanxue: [r0dump](https://bbs.kanxue.com/thread-292107.htm).

## Acknowledgements

- Thanks to [`r0ysue`](https://github.com/r0ysue) for guidance and advice;
- Thanks to `寒冰冷月` for the [`FART` project](https://github.com/hanbinglengyue/FART) and articles:
  - [FART: automated unpacking via active invocation under ART](https://bbs.kanxue.com/thread-252630.htm)
  - [FART appetizer: simple, efficient ways to dump in-memory dex under ART](https://bbs.kanxue.com/thread-254028.htm)
  - [Clearing the fog: the essence of Android unpacking and how to find ART unpacking points](https://bbs.kanxue.com/thread-254555.htm)
- Thanks to the **Kanxue community** for open discussion and samples.
