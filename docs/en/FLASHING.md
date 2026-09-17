# R0DUMP Fusion Flashing Guide

> [中文](../zh/FLASHING.md) · English

> [!WARNING]
> This guide applies only to **OnePlus 9 (lemonade / sm8350)**. Never flash these images on another device. Unlocking the bootloader and running `fastboot -w update` erase user data, and test-key builds weaken device security. Back up first and keep a working stock package and rollback procedure available.

## Requirements

- A OnePlus 9 with an unlocked bootloader;
- the latest [Android SDK Platform-Tools](https://developer.android.com/tools/releases/platform-tools);
- a reliable USB connection, sufficient battery charge, and a complete data backup;
- a stock recovery package for the device.

## Download

The current release is `r0dump-fusion-16`, based on LineageOS 23.2 / Android 16 and signed with test keys.

| Variant | Notes | Download |
|---------|-------|----------|
| No-GApps | Does not include Google services | [lineage_lemonade-r0dump-fusion-16-nogapps.zip](https://dl.r0dump.com/v2026-09-12/lineage_lemonade-r0dump-fusion-16-nogapps.zip) |
| GApps | MindTheGapps injected offline into `product` / `system_ext` | [lineage_lemonade-r0dump-fusion-16-gapps.zip](https://dl.r0dump.com/v2026-09-12/lineage_lemonade-r0dump-fusion-16-gapps.zip) |

Check the ZIP for download corruption before flashing:

```shell
unzip -t "path-to-image.zip"
```

## Flash

1. Connect the phone and reboot into Fastboot mode:

   ```shell
   adb reboot fastboot
   ```

2. Confirm that the host can see the device:

   ```shell
   fastboot devices
   ```

3. Run the command for the downloaded variant. `-w` erases user data. Pass the ZIP directly to `fastboot`; do not extract it.

   No-GApps:

   ```shell
   fastboot -w update "lineage_lemonade-r0dump-fusion-16-nogapps.zip"
   ```

   GApps:

   ```shell
   fastboot --disable-verification -w update "lineage_lemonade-r0dump-fusion-16-gapps.zip"
   ```

   The GApps build modifies `product` / `system_ext`. `--disable-verification` disables verification when `vbmeta` is flashed; omitting it causes AVB verification to fail.

4. Keep the device connected until flashing and the first boot complete. The first boot may take longer than usual.

## If flashing fails

- Save the complete `fastboot` output and avoid running unverified recovery commands;
- confirm the device model and image version;
- use the prepared stock recovery procedure if the device no longer boots;
- include the Platform-Tools version, image name, and sanitized full log when reporting a problem.
