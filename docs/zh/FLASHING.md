# R0DUMP Fusion 刷机指南

> 中文 · [English](../en/FLASHING.md)

> [!WARNING]
> 本指南仅适用于 **OnePlus 9（lemonade / sm8350）**。请勿将这些镜像刷入其他设备。解锁 Bootloader 和执行 `fastboot -w update` 会清除用户数据；测试密钥构建也会降低设备安全性。请先备份，并准备可用的原厂包和回退方案。

## 准备

- 已解锁 Bootloader 的 OnePlus 9；
- 最新版 [Android SDK Platform-Tools](https://developer.android.com/tools/releases/platform-tools)；
- 数据线、电量充足的手机，以及完整的数据备份；
- 适用于当前设备的原厂恢复包。

## 下载

当前版本为 `r0dump-fusion-16`，基于 LineageOS 23.2 / Android 16，使用测试密钥签名。

| 版本 | 说明 | 下载 |
|------|------|------|
| No-GApps | 不包含 Google 服务 | [lineage_lemonade-r0dump-fusion-16-nogapps.zip](https://dl.r0dump.com/v2026-09-12/lineage_lemonade-r0dump-fusion-16-nogapps.zip) |
| GApps | `product` / `system_ext` 已离线注入 MindTheGapps | [lineage_lemonade-r0dump-fusion-16-gapps.zip](https://dl.r0dump.com/v2026-09-12/lineage_lemonade-r0dump-fusion-16-gapps.zip) |

下载后可先检查 ZIP 是否完整：

```shell
unzip -t "刷机包路径.zip"
```

## 刷写

1. 连接手机，并重启到 Fastboot 模式：

   ```shell
   adb reboot fastboot
   ```

2. 确认电脑能够识别设备：

   ```shell
   fastboot devices
   ```

3. 根据下载的版本执行对应命令。`-w` 会清除用户数据，ZIP 文件无需解压。

   No-GApps：

   ```shell
   fastboot -w update "lineage_lemonade-r0dump-fusion-16-nogapps.zip"
   ```

   GApps：

   ```shell
   fastboot --disable-verification -w update "lineage_lemonade-r0dump-fusion-16-gapps.zip"
   ```

   GApps 版修改了 `product` / `system_ext`。`--disable-verification` 会在刷写 `vbmeta` 时关闭验证；缺少该参数会导致 AVB 验证失败。

4. 保持设备连接，等待刷写和首次启动完成。首次启动可能需要更长时间。

## 失败处理

- 保存完整的 `fastboot` 输出，不要反复执行不明命令；
- 确认刷机包版本和设备型号；
- 设备无法启动时，按预先准备的原厂恢复流程回退；
- 问题反馈请附上 Platform-Tools 版本、所用刷机包和脱敏后的完整日志。
