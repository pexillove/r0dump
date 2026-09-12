# R0DUMP patch export summary

Exported: 2026-07-21T22:58:58+08:00
Source: /home/ivory/lineageOS-23.2
Base: original LineageOS 23.2 manifest checkout / upstream project HEADs

## Apply
```bash
./apply-patches.sh /path/to/lineageOS-23.2
```

## Series
- patches/0001-art.patch
- patches/0002-build_soong.patch
- patches/0003-frameworks_base.patch
- patches/0004-libcore.patch
- patches/0005-packages_apps_Settings.patch
- patches/0006-vendor_lineage.patch
- new-projects/0007-packages_apps_R0DUMPManager-full-add.patch

## Patch stats

### patches/0001-art.patch
    93	0	art/libdexfile/dex/dex_file.cc
    10	0	art/libdexfile/dex/dex_file_loader.cc
    5288	693	art/runtime/art_method.cc
    82	60	art/runtime/class_linker.cc
    5	0	art/runtime/instrumentation.cc
    8	2	art/runtime/instrumentation.h
    3	0	art/runtime/interpreter/interpreter.cc
    7	0	art/runtime/jit/jit.cc
    362	33	art/runtime/native/dalvik_system_DexFile.cc
    4	0	art/runtime/native/java_lang_reflect_Constructor.cc
    5	0	art/runtime/native/java_lang_reflect_Method.cc
    16	6	art/runtime/oat/oat_file.cc
    11	0	art/runtime/oat/oat_file_assistant.cc
    45	0	art/runtime/oat/oat_file_manager.cc

### patches/0002-build_soong.patch
    15	2	build/soong/scripts/gen_build_prop.py

### patches/0003-frameworks_base.patch
    1334	241	frameworks/base/core/java/android/app/ActivityThread.java
    68	2	frameworks/base/core/java/android/os/Process.java
    2	2	frameworks/base/core/jni/android_util_Process.cpp
    42	0	frameworks/base/services/core/java/com/android/server/am/ProcessErrorStateRecord.java
    19	0	frameworks/base/services/core/java/com/android/server/logcat/LogcatManagerService.java

### patches/0004-libcore.patch
    5	0	libcore/dalvik/src/main/java/dalvik/system/BaseDexClassLoader.java
    33	4	libcore/dalvik/src/main/java/dalvik/system/DexFile.java
    11	0	libcore/dalvik/src/main/java/dalvik/system/DexPathList.java
    63	0	libcore/ojluni/src/main/java/java/lang/Runtime.java

### patches/0005-packages_apps_Settings.patch
    1	1	packages/apps/Settings/src/com/android/settings/deviceinfo/firmwareversion/LineageVersionDetailPreference.kt
    2	2	packages/apps/Settings/src/com/android/settings/deviceinfo/firmwareversion/LineageVersionDetailPreferenceController.java
    2	2	packages/apps/Settings/tests/robotests/src/com/android/settings/deviceinfo/firmwareversion/LineageVersionDetailPreferenceControllerTest.java
    2	2	packages/apps/Settings/tests/robotests/src/com/android/settings/deviceinfo/firmwareversion/LineageVersionDetailPreferenceTest.kt

### patches/0006-vendor_lineage.patch
    2	2	vendor/lineage/config/common.mk
    2	2	vendor/lineage/config/version.mk

### new-projects/0007-packages_apps_R0DUMPManager-full-add.patch
    40	0	packages/apps/R0DUMPManager/Android.bp
    31	0	packages/apps/R0DUMPManager/AndroidManifest.xml
    103	0	packages/apps/R0DUMPManager/DESIGN.md
    117	0	packages/apps/R0DUMPManager/PRODUCT.md
    11	0	packages/apps/R0DUMPManager/privapp-permissions-com.android.r0dumpmanager.xml
    1301	0	packages/apps/R0DUMPManager/res/drawable/ic_r0dump.xml
    216	0	packages/apps/R0DUMPManager/res/values-zh-rCN/strings.xml
    216	0	packages/apps/R0DUMPManager/res/values/strings.xml
    39	0	packages/apps/R0DUMPManager/res/values/styles.xml
    4	0	packages/apps/R0DUMPManager/res/xml/locales_config.xml
    2981	0	packages/apps/R0DUMPManager/src/com/android/r0dumpmanager/MainActivity.java
    2626	0	packages/apps/R0DUMPManager/src/com/android/r0dumpmanager/R0DumpComposeUi.kt
