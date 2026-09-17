# r0dump-fusion-16 · v2026-09-12

R0DUMP brings **FART-style active unpacking to Android 16 ART**, then carries the captured runtime evidence through DEX reconstruction, repair, verification, and export. This is the first fusion release and the current reference build for **OnePlus 9 (`lemonade` / `sm8350`)** on **LineageOS 23.2 / Android 16**.

## Highlights

- ART-integrated DEX capture across registration, class loading, and method-dispatch paths.
- Bounded ClassLoader walk + active invocation for first- and second-generation packer baselines.
- `InMemoryDexClassLoader` and container / logical DEX capture.
- On-device DEX reconstruction from `runtime_view`, including displaced table / section recovery and Adler-32 / SHA-1 regeneration.
- R0dump Manager for target selection, configuration, status, repair, validation, and ZIP export.
- Restricted Manager → framework → helper pipeline with SELinux Enforcing support.
- Embedded MCP bridge operated over ADB stdio for authorized automation.
- Per-repository `git format-patch` series for reproducible Android 16 ports.

## Downloads

| Artifact | Target | Link |
|----------|--------|------|
| No-GApps fastboot image ZIP | OnePlus 9 only | [lineage_lemonade-r0dump-fusion-16-nogapps.zip](https://dl.r0dump.com/v2026-09-12/lineage_lemonade-r0dump-fusion-16-nogapps.zip) |
| GApps fastboot image ZIP | OnePlus 9 only; MindTheGapps injected offline | [lineage_lemonade-r0dump-fusion-16-gapps.zip](https://dl.r0dump.com/v2026-09-12/lineage_lemonade-r0dump-fusion-16-gapps.zip) |
| Source patch bundle | Porting / source review | `r0dump-fusion-16-patches-v2026-09-12.zip` attached below |

Source patch bundle SHA-256:

```text
f8ec2413236c770f4b62a85b22763478a79402deab1bfece0156ce0afa827791  r0dump-fusion-16-patches-v2026-09-12.zip
```

## Quick workflow

1. Read the [Fusion flashing guide](https://github.com/tiwe0/r0dump/blob/master/docs/en/FLASHING.md) and back up the device.
2. Flash only on OnePlus 9 (`lemonade` / `sm8350`). The GApps variant requires `--disable-verification` when flashing `vbmeta`.
3. In R0dump Manager, select an authorized target, choose a bounded strategy, enable capture, and cold-start the target.
4. Run “Repair and export latest run.”
5. Verify the ZIP sidecar and inspect repaired DEX files with Android 16 `dexdump` / JADX.

## Source and porting

- Patch tree: [`patches/v2026-09-12-fusion/`](https://github.com/tiwe0/r0dump/tree/v2026-09-12-fusion/patches/v2026-09-12-fusion)
- Exact baselines and patch order: [fusion patch README](https://github.com/tiwe0/r0dump/blob/v2026-09-12-fusion/patches/v2026-09-12-fusion/README.md)
- Main project documentation: [README](https://github.com/tiwe0/r0dump#readme)
- Website: [r0dump.com](https://r0dump.com)

## Known boundaries

- The flashable images are **OnePlus 9 only** and are signed with test keys. They are not production builds.
- R0DUMP coverage depends on the packer, code-decryption timing, observable ART paths, and dynamically generated-code behavior.
- Porting to another device / ROM requires rebasing, a full product build, SELinux validation, and real-device acceptance. Never flash these images across devices.
- Preserve the original sample and authorization record; do not redistribute protected third-party code captured during research.

## Safety

Unlocking and flashing can erase data, weaken platform security, or brick the device. Use a recoverable test device, verify every artifact, and keep a known-good rollback path. This project is for security research, interoperability analysis, and education on software and devices you own or are explicitly authorized to test.

Thanks to [`r0ysue`](https://github.com/r0ysue), [`FART`](https://github.com/hanbinglengyue/FART) author 寒冰冷月, and the Kanxue community for the foundational research and feedback.
