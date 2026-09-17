# R0DUMP Porting Guide

> [中文](../zh/PORTING.md) · English

This guide describes how to build a reproducible device / ROM port from the published Android 16 fusion patch set. Patch applicability varies by source tree, so the guide uses a verification checklist.

> [!WARNING]
> Never flash the OnePlus 9 release images on another device. A port must be rebuilt against its own ROM and device trees, then validated on disposable or recoverable test hardware. Do not publish proprietary blobs, signing keys, device backups, app data, or protected third-party code.

## 1. Define the port before changing code

Record these facts in the port repository:

| Field | Required value |
|-------|----------------|
| Device | Marketing name, product code, device codename, SoC, supported ABIs |
| ROM | Project, branch, Android version / SDK, manifest revision |
| R0DUMP | Patch-set version or tag, plus any rebased commits |
| Build | Product / lunch target, host requirements, signing model |
| Recovery | Known-good stock package, recovery / fastboot path, rollback steps |
| Verification | What was built, flashed, and tested on real hardware |

Pin the manifest and every affected repository revision. “Latest” is not a reproducible baseline.

## 2. Start from the fusion baseline

The current upstream patch set is [`patches/v2026-09-12-fusion/`](../../patches/v2026-09-12-fusion/README.md):

| Patch group | Upstream baseline | Role |
|-------------|-------------------|------|
| `art/` | AOSP tag `android-16.0.0_r4` | Capture points, force-invoke flow, DEX evidence and reconstruction |
| `frameworks_base/` | LineageOS `lineage-23.2` | Configuration path, orchestration, scoped output preparation |
| `system_sepolicy/` | LineageOS `lineage-23.2` | Manager / helper domains and bounded export policy |
| `packages_apps_R0dumpManager/` | New repository, root patch series | Manager UI, helper, repair / export, embedded MCP bridge |
| `vendor_lineage/` | LineageOS `vendor/lineage` | Optional display-version branding |

Apply each directory in filename order. For committed repositories use `git am`; the vendor branding file is a plain diff and uses `git apply`. Read the [patch-set README](../../patches/v2026-09-12-fusion/README.md) for the authoritative commands.

Do not resolve conflicts by dropping patches wholesale. For each rebase conflict, document:

- upstream file and revision;
- original R0DUMP intent;
- adapted implementation;
- build or runtime evidence that preserves the intent.

## 3. Integrate the Manager and product configuration

The port must make `packages/apps/R0dumpManager` a real source project and product package. Verify all of the following against the target ROM:

- the Manager project is present in the manifest and built from source;
- package name, privileged permissions, platform signing, and product inclusion match the patch contracts;
- framework, Manager, native helper, and SELinux policy use the same protocol and paths;
- R0DUMP system properties and configuration files are included in the final images;
- release branding changes are optional and do not replace functional integration;
- production signing keys stay outside the public repository.

## 4. Adapt device- and ROM-specific boundaries

Treat these as explicit porting work, not incidental merge conflicts:

1. **Architecture:** build the ART changes for every ABI the device actually executes (for example ARM32 apps on an ARM64 system).
2. **Storage:** validate the target ROM's emulated-storage mounts and the fixed public export path used by Manager. Never add a silent fallback to broad private or root-writable locations.
3. **SELinux:** keep Enforcing. Add the minimum device-specific policy required for the existing Manager → framework → helper contract; do not use permissive domains as acceptance evidence.
4. **Process lifecycle:** confirm cold start, secondary processes, zygote variants, and app restarts do not leave capture enabled unexpectedly.
5. **Resource budgets:** tune walk, call, time, and output limits for the device without removing stop conditions or ANR protection.
6. **ROM framework differences:** revalidate ActivityManager / storage hooks, privileged permission declarations, and hidden-API access on the target branch.
7. **OTA and rollback:** document what partitions are replaced, how user data is protected, and how to return to a known-good build.

## 5. Build gates

At minimum, record fresh results for:

- affected ART host tests and repair-tool tests;
- Manager unit / instrumentation tests included by the rebased patch set;
- SELinux policy build, `neverallow`, and mapping / compatibility checks;
- full target product build covering all affected modules;
- patch / overlay reproducibility from a clean pinned source tree;
- release-archive integrity and cryptographic checksums.

A successful module build is not proof that the boot image, system image, policy, Manager, and runtime protocol agree.

## 6. On-device acceptance

Use only an authorized test sample and preserve logs without uploading protected code. A port is “verified” only for the steps actually completed.

- [ ] Device boots with SELinux Enforcing and no new persistent crash loop.
- [ ] The active Manager APK and policy files match the tested build.
- [ ] Manager lists apps, accepts a bounded configuration, and enables only the selected target.
- [ ] Cold-starting the target creates one identifiable run and respects stop limits.
- [ ] Standard and in-memory DEX paths are exercised where the sample supports them.
- [ ] “Repair and export” selects the intended run through a stable run identifier.
- [ ] Exported ZIP and `.sha256` sidecar verify successfully.
- [ ] Repaired DEX files pass the target Android version's `dexdump` and can be inspected in JADX.
- [ ] Reboot, disable, failure, and no-output paths leave the device recoverable.
- [ ] Logs contain no private keys, app data, proprietary blobs, or redistributed protected payloads.

Publish exact counts and tool versions when reporting success. For example, “5/5 repaired DEX files passed Android 16 `dexdump`” is useful evidence; “works” is not.

## Reference community port

[`yruh/r0dump-redmi9a-crdroid16`](https://github.com/yruh/r0dump-redmi9a-crdroid16) is the first listed community case study. It ports R0DUMP to Redmi 9A (`blossom` / `dandelion`) on crDroid 12.11 / Android 16 and includes pinned manifests, per-repository patches, overlays, application / verification scripts, build documentation, and on-device evidence.

Use it as an example of repository structure and evidence reporting, not as a patch source for unrelated devices.

## Submit a Community Port

Before requesting a README listing, open an Issue or PR with the same information described above: public repository and license, exact source baselines, reproducible build steps, on-device evidence, known limits and rollback steps, plus a statement that no proprietary or sensitive material is included.

Community ports remain maintained and supported by their authors. Listing a port documents evidence; it does not turn it into an official R0DUMP release.
