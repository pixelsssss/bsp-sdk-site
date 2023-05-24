---
# 这是文章的标题
title: SDK 使用
# 这是页面的图标
icon: discover
# 这是侧边栏的顺序
order: 3
# 一个页面可以有多个分类
category:
  - 上手教程
# 一个页面可以有多个标签
tag:
  - 使用
---
## 1. SDK 内容

| 目录/内容           | 简介                                                 | 备注 |
| ------------------- | ---------------------------------------------------- | ---- |
| docs/处理器数据手册 | 处理器软件编程手册                                   | 可选 |
| docs/标准硬件资料   | 硬件板卡的介绍资料等                                 | 可选 |
| docs/测试报告       | 标准 bsp 各外设模块功能、性能及整板稳定性测试报告    | 必选 |
| docs/others         | 其他必要文档材料                                     | 可选 |
| images/             | 基于标准硬件的试用镜像，包括 bsp、测试工具等         | 必选 |
| driver_library/     | 通用外设库，如兼容层、网卡库等                       | 可选 |
| bsp/                | bsp 工程代码                                         | 必选 |
| base/               | 当前发布的 bsp 版本对应的 SylixOS 内核源码及版本信息 | 必选 |
| tools/              | bsp 调试及使用过程中可能用到的工具集                 | 可选 |
| test_suite/         | bsp 测试集及相关文档                                 | 可选 |

## 2 SDK 使用

### 2.1 SylixOS 开发基础

首先，开发者需要通过 [在线学习](https://docs.acoinfo.com/sylixos/about.html) 具备 SylixOS 开发基础。

### 2.2 固件烧录

参考 [固件升级](../固件升级/update.md) 烧录 SylixOS 镜像。

### 2.3 SylixOS 启动

烧录完成后，上电启动信息如下：

```
sysname  : sylixos
nodename : sylixos
release  : Enterprise
version  : 3.0.1
machine  : RK3568(ARMv8-A, 4 Core, Up to 2.0GHz, Current 1.8GHz)

                          [[                          (R)
 [[[[           [[[[      [[             [[[[    [[[[ 
[[  [[            [[                    [[  [[  [[  [[
[[      [[  [[    [[    [[[[    [[  [[  [[  [[  [[  
 [[     [[  [[    [[      [[    [[  [[  [[  [[   [[   
  [[    [[  [[    [[      [[     [[[[   [[  [[    [[  
   [[   [[  [[    [[      [[      [[    [[  [[     [[ 
    [[  [[  [[    [[      [[     [[[[   [[  [[      [[
[[  [[  [[  [[    [[      [[    [[  [[  [[  [[  [[  [[
 [[[[    [[[[   [[[[[[  [[[[[[  [[  [[   [[[[    [[[[ 
           [[                           
          [[    KERNEL: LongWing(C) 3.0.1
       [[[[   COPYRIGHT ACOINFO Co. Ltd. 2006 - 2023

SylixOS license: Commercial & GPL.
SylixOS kernel version: 3.0.1 Code name: Enterprise

CPU     : RK3568(ARMv8-A, 4 Core, Up to 2.0GHz, Current 1.8GHz)
CACHE   : 64KBytes L1-Cache(D-32K/I-32K), 0 Bytes L2-Cache, 512KBytes L3-Cache
PACKET  : AIO-3568J Packet
ROM SIZE: 0x00200000 Bytes (0x00000000 - 0x001fffff)
RAM SIZE: 0xe6bf0000 Bytes (0x09400000 - 0xeffeffff)
BSP     : BSP Version 2.2.1 (Release) for Enterprise (Build May 23 2023 15:48:25)
[root@sylixos:/root]#
```

此时，开发者可以参考 [SylixOS 用户手册](https://docs.acoinfo.com/sylixos/reference/) 基于该板卡进行应用开发工作。

## 3 更新系统镜像

### 3.1 工程导入及替换

① 新建 SylixOS Base 工程，工程属性配置如下：

| 操作系统位数 | base 选项                                                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| 64 位        | ***Toolchain** : aarch64-sylixos-toolchain* <br />**CPU** **Type** : generic<br />**FPU Type** : default |
| 32 位        | ***Toolchain** : arm-sylixos-toolchain* **CPU** **Type** : cortex-a57<br />**FPU Type** : disable        |

注：将新建工程中的 libsylixos 文件夹替换为 SDK 中 base 目录下的 libsylixos。

② SDK 中需要导入 IDE 工作区的工程列表如下：

| 工程名              | 目录            |
| ------------------- | --------------- |
| bsprk3568           | bsp/            |
| libdrv_linux_compat | driver_library/ |

bsprk3568 和 libdrv_linux_compat 的工程属性中选择依赖的 Base 为新建的 SylixOS Base 工程。

### 3.2 编译

按顺序编译新建的 SylixOS Base 工程、libdrv_linux_compat 和 bsprk3568。

以 64 位操作系统为例，编译完成后，bsprk3568 中会生成相应的目标文件，如 bsprk3568_aio_x64.bin。

### 3.3 网络启动

设置 tftp server 路径，参考启动命令如下：

```
setenv ipaddr 202.197.66.223;setenv serverip 202.197.66.156;tftp 0x9400000 bsprk3568_aio_x64.bin;go 0x9400000
```

其中 ipaddr 是指板卡的 ip 地址，serverip 是指主机的 ip 地址，根据实际情况修改设置。

启动过程示例如下：

```
=> setenv ipaddr 202.197.66.223;setenv serverip 202.197.66.156;tftp 0x9400000 bsprk3568_aio_x64.bin;go 0x9400000
ethernet@fe010000 Waiting for PHY auto negotiation to complete. done
Using ethernet@fe010000 device
TFTP from server 202.197.66.156; our IP address is 202.197.66.223
Filename 'bsprk3568_aio_x64.bin'.
Load address: 0x9400000
Loading: #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         #################################################################
         ###################################################
         589.8 KiB/s
done
Bytes transferred = 4586432 (45fbc0 hex)
## Starting application at 0x09400000 ...
Linux compatibility layer version: 1.0.9-beta.
Linux compatibility layer top half init finished.
Block device /dev/blk/sdcard-0 part 0 mount to /media/sdcard0 use vfat file system.
Block device /dev/blk/sdcard-0 part 1 mount to /media/sdcard1 use vfat file system.
Block device /dev/blk/sdcard-0 part 2 mount to /media/sdcard2 use vfat file system.
Block device /dev/blk/sdcard-0 part 3 mount to /media/sdcard3 use vfat file system.
Block device /dev/blk/sdcard-0 part 4 mount to /media/sdcard4 use vfat file system.
Block device /dev/blk/sdcard-0 part 5 mount to /media/sdcard5 use vfat file system.
Block device /dev/blk/sdcard-0 part 6 mount to /media/sdcard6 use vfat file system.
Block device /dev/blk/sdcard-0 part 7 mount to /media/sdcard7 use vfat file system.
Block device /dev/blk/sdcard-0 part 8 mount to /media/sdcard8 use vfat file system.
Block device /dev/blk/sdcard-0 part 9 mount to /media/sdcard9 use vfat file system.
Block device /dev/blk/sdcard-0 part 10 mount to /media/sdcard10 use tpsfs file system.
Block device /dev/blk/nvme-0 part 0 mount to /media/nvme0 use vfat file system.
Block device /dev/blk/nvme-0 part 1 mount to /media/nvme1 use tpsfs file system.
rockchip_clk_register_branches: unknown clock type 11

mount sd memory card successfully.
environment variables load from /etc/profile fail, error: No such file or directory
[ifparam]No network parameter for [dw_1] from /etc/ifparam.ini, default parameters will be used.
I/TC: Secondary CPU 1 initializing
I/TC: Secondary CPU 1 switching to normal world boot
I/TC: Secondary CPU 2 initializing
I/TC: Secondary CPU 2 switching to normal world boot
I/TC: Secondary CPU 3 initializing
I/TC: Secondary CPU 3 switching to normal world boot
: Failed to reset the dma
stmmac_hw_setup: DMA engine initialization failed
stmmac_init: Hw setup failed
dwProbe: netdev_add error!
Linux compatibility layer bottom half init finished.
cpu current freq 1800000000 Hz, voltage 1125000 uV.
Press <n> to NOT execute /etc/startup.sh (timeout: 1 sec(s))
default shell stack: 1200000
sysname  : sylixos
nodename : sylixos
release  : Enterprise
version  : 2.3.8
machine  : RK3568(ARMv8-A, 4 Core, Up to 2.0GHz, Current 1.8GHz)


                          [[                          (R)
 [[[[           [[[[      [[             [[[[    [[[[ 
[[  [[            [[                    [[  [[  [[  [[
[[      [[  [[    [[    [[[[    [[  [[  [[  [[  [[  
 [[     [[  [[    [[      [[    [[  [[  [[  [[   [[   
  [[    [[  [[    [[      [[     [[[[   [[  [[    [[  
   [[   [[  [[    [[      [[      [[    [[  [[     [[ 
    [[  [[  [[    [[      [[     [[[[   [[  [[      [[
[[  [[  [[  [[    [[      [[    [[  [[  [[  [[  [[  [[
 [[[[    [[[[   [[[[[[  [[[[[[  [[  [[   [[[[    [[[[ 
           [[                                 
          [[    KERNEL: LongWing(C) 2.3.8
       [[[[   COPYRIGHT ACOINFO Co. Ltd. 2006 - 2022

SylixOS license: Commercial & GPL.
SylixOS kernel version: 2.3.8 Code name: Enterprise

CPU     : RK3568(ARMv8-A, 4 Core, Up to 2.0GHz, Current 1.8GHz)
CACHE   : 64KBytes L1-Cache(D-32K/I-32K), 0 Bytes L2-Cache, 512KBytes L3-Cache
PACKET  : AIO-3568J Packet
ROM SIZE: 0x00100000 Bytes (0x00000000 - 0x000fffff)
RAM SIZE: 0x72c00000 Bytes (0x09400000 - 0x7bffffff)
BSP     : BSP Version 2.1.0 (Release) for Enterprise (Build Nov 16 2022 17:29:50)
[root@sylixos:/root]# dw: en2 NIC Link is Up 1000 Mbps Full Duplex
```

### 3.4 更新及重启

通过 FTP 工具连接板卡，将 /boot 目录下的 bsprk3568_aio_x64.bin 替换为新编译的系统镜像，执行 sync 后，重启板卡即完成系统更新。

## 4 SDK 开发

### 4.1 bsp 目录结构

```
bsprk3568
|  bsprk3568.mk
│  CHANGELOG
│  config.mk
│  Makefile
│  
└─SylixOS
    │  bspbuild.mk
    │  config.ld
    │  driver-library.mk
    │  libdrv.mk
    │  Makefile
    │  srcs.mk
    │  SylixOSBSP32.ld
    │  SylixOSBSP64.ld
    │  
    ├─bsp
    │  │  board.h
    │  │  bspInit.c
    │  │  bspLib.c
    │  │  bspMap.h
    │  │  libstartup.mk
    │  │  startup.S
    │  │  
    │  └─ aio
    │         aio.c
    │         aio.h
    │         aio.mk
    │         README.md
    │  
    ├─driver
    │  ├─ahci  
    │  ├─audio  
    │  ├─can
    │  ├─clk  
    │  ├─component
    │  ├─display 
    │  ├─dma 
    │  ├─emmc
    │  ├─fan
    │  ├─gpio
    │  ├─i2c 
    │  ├─include  
    │  ├─irq  
    │  ├─lamp  
    │  ├─net   
    │  ├─norflash  
    │  ├─nvme  
    │  ├─pci  
    │  ├─phy   
    │  ├─pmic 
    │  ├─psci
    │  ├─pwm 
    │  ├─regulator   
    │  ├─rkflash   
    │  ├─sdmmc 
    │  ├─spi
    │  ├─switchchip
    │  ├─thermal
    │  ├─timer 
    │  ├─uart
    │  ├─usb  
    │  ├─video   
    │  └─wdt   
    │ 
    ├─lib
    │  ├─arm 
    │  ├─arm64
    │  └─include
    │  
    ├─res 
    │  ├─dts
    │  │  └─aio
    │  │  
    │  └─tools
    │  
    ├─test
    │  
    └─user
```

### 4.2 详细介绍

| 目录/文件                 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| bsprk3568.mk              | IDE 配置文件                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| CHANGELOG                 | bsp 更新记录，包括新功能支持、bug 修复等，同时记录当前 bsp 版本号。                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| config.mk                 | 最外层配置文件，用于配置 Makefile 功能：① SYLIXOS_BASE_PATH 为 bsp 依赖的 base 工程路径，根据工程属性配置自动生成，无需手动更改；② LINUX_COMPAT_LAYER_PATH 为 bsp 依赖的 Linux 兼容层工程路径，一般自动索引当前工作空间下的兼容层工程，无需手动更改，bsp 工程和兼容层工程需要处于同一工作空间中；③ DEBUG_LEVEL 为当前编译等级，可选 debug 或 release，根据工程属性配置自动生成，无需手动更改；④ FPU_TYPE 为浮点类型配置，根据工程属性配置自动生成，无需手动更改；其他编译配置可手动添加。                                  |
| Makefile                  | 最外层 Makefile，用于配置需要编译的板级包，导出 config.mk 中定义的配置，同时调用 SylixOS 目录下的 Makefile 执行最终的编译操作。为了节约编译时间，可以在 BOARD_LIST 中只选择需要编译的板级，其他的通过 # 注释。                                                                                                                                                                                                                                                                                                                 |
| SylixOS/bspbuild.mk       | 被当前目录下的 Makefile 包含，主要定义如下内容：① BSP_BASE_NAME 和 BSP_POST_NAME 表示目标文件名前后缀；② LOCAL_DSYMBOL 表示 bsp 中宏定义配置；③ LOCAL_INC_PATH 表示 bsp 源文件中头文件路径定义；④ LOCAL_DEPEND_LIB 和 LOCAL_DEPEND_LIB_PATH 表示 bsp 依赖的静态库名称及所在路径；⑤ LOCAL_DEPEND_TARGET 表示编译依赖的目标文件，这些目标文件发生改变时，会重新链接生成最终的 bsp 镜像文件，无需 rebuild 整个 bsp 工程；⑥ LOCAL_LD_SCRIPT 表示编译链接脚本文件，根据编译选项选择 32 位或者 64 位。其他暂未用到，不做介绍。 |
| SylixOS/config.ld         | 定义 bsp 的代码段和数据段地址信息、启动栈大小和堆内存结束地址，用于配置链接脚本。                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| SylixOS/driver-library.mk | 内核静态库类目标 Makefile 模板，从 libsylixos 中的 kernel-library.mk 修改而来，被当前目录下 libdrv.mk 包含，用于将 bsp 中的外设驱动单独预编译生成静态库文件，再次编译时可删除对应外设驱动源文件，适用于不方便提供源码的场景。部分外设驱动静态库编译时需要包含 symbol.h，所以该文件在 kernel-library.mk 基础上新增 `$(target)_DSYMBOL   += $(TOOLCHAIN_DEF_SYMBOL)SYLIXOS_EXPORT_KSYMBOL`，用于生成 symbol.h。                                                                                                                |
| SylixOS/libdrv.mk         | 被当前目录下 Makefile 包含，定义了需要编译的外设驱动静态库。                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| SylixOS/Makefile          | 当前目录的 Makefile 文件，定义了最终生成的 bsp 镜像名，包含了静态库编译 Makefile、源文件编译 Makefile 等，同时还可以选择是否编译设备树。                                                                                                                                                                                                                                                                                                                                                                                       |
| SylixOS/srcs.mk           | 该文件定义需要编译的源文件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| SylixOS/SylixOSBSP32.ld   | 32 位链接脚本文件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| SylixOS/SylixOSBSP64.ld   | 64 位链接脚本文件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| SylixOS/bsp               | 该目录下包含板级目录和 bspInit.c、bspLib.c、startup.S 等启动文件。其中启动文件由 libstartup.mk 编译生成 libstartup.a，板级目录下包含板级源文件和头文件、板级 Makefile、README.md。                                                                                                                                                                                                                                                                                                                                             |
| SylixOS/driver            | 该目录下为所有外设驱动目录，每个驱动目录下都有对应的 Makefile 用于生成独立的静态库。                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| SylixOS/lib               | 该目录为 bsp 依赖的静态库存放目录：① 按架构分为 SylixOS/lib/arm 和 SylixOS/lib/arm64；② bsp 外设驱动静态库存放在 SylixOS/lib/(ARCH)/libdrv 目录下，其他的外部静态库，如网卡、rtc 等存放在 SylixOS/lib/(ARCH) 下；③ 外部静态库的头文件统一存放在 SylixOS/lib/include 目录下，如网卡、rtc 等。                                                                                                                                                                                                                                |
| SylixOS/res               | 该目录存放设备树、设备树编译工具等资源文件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| SylixOS/test              | 该目录存放测试程序。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| SylixOS/user              | 用户目录。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

### 4.3 适配新板卡步骤

* 新建板卡对应的板级目录，快捷方法是拷贝已有的板级目录如 aio 到同一目录下，重命名为 demo，将 demo 目录下的文件分别重命名为 demo.c、demo.h、demo.mk；
* 修改 demo.c、demo.h、demo.mk 文件中的文件信息、头文件包含宏定义等；
* 板卡上电，按 ctrl+c 进入 uboot 命令行（不同板卡进入 uboot 命令行方式可能有区别，根据实际情况操作），执行如下命令：

```
=> bdinfo
arch_number = 0x00000000
boot_params = 0x00000000
DRAM bank   = 0x00000000
-> start    = 0x00200000
-> size     = 0x08200000
DRAM bank   = 0x00000001
-> start    = 0x09400000
-> size     = 0x76C00000
baudrate    = 1500000 bps
TLB addr    = 0x7FFF0000
relocaddr   = 0x7DD55000
reloc off   = 0x7D355000
irq_sp      = 0x7B9F9140
sp start    = 0x7B9F9140
FB base     = 0x00000000
Early malloc usage: 32a0 / 80000
fdt_blob = 000000000a100000
```

以 Core-3568J 板卡为例，可以看到 DRAM BANK 分为两部分，当前系统内存布局如下：

```
  DDR 内存空间分布: 2G
  |  ATF  |  Bank0  |  OP-TEE  |                Bank1                 |
  ---------------------------------------------------------------------
  |       |  APP0   |          |  Kernel (TEXT + DATA + DMA) |  APP1  |
  0       2M      132M       148M                            ?     2048M
```

实测 Core-3568J 板卡内存末端还需预留 64KB 空间，否则内存测试时会出现系统卡死现象，在 u-boot 下也是同样的现象。

需要注意的是，每个硬件板卡的 DRAM BANK 可能不同，对应的板级头文件中需要根据实际情况调整内存划分。

* 板级头文件内容介绍如下，根据实际需要修改：

| 文件内容                       | 含义                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| BSP_CFG_SWITCH_CODE            | 是否需要 AARCH64 切换 AARCH32 的机器码，运行 32 位系统使用，无需修改。                                |
| BSP_CFG_BOOT_MODE              | 启动模式选择，当前一般均使用 bin 文件启动，无需修改                                                   |
| BSP_CFG_PLATFORM_PACKET        | 板级名称，根据需要修改                                                                                |
| BSP_CFG_STD_FILE               | 标准输入输出使用的串口设备名，根据需要修改                                                            |
| BSP_CFG_TTY_BAUD               | 标准输入输出使用的串口波特率，根据需要修改                                                            |
| BSP_CFG_CACHE_BARRIER_EN       | 是否使能 cache 同步，多核启动时使用，一般无需修改                                                     |
| BSP_CFG_LICENSE_EN             | 是否使能限时控制，默认开启，用于试用镜像，若已有 bsp 源码并需要进行长期稳定性测试，需要注意关闭该选项 |
| BSP_CFG_EXPIRE_HOUR            | 试用镜像限时重启倒计时，默认设置为 24h                                                                |
| BSP_CFG_ROM_BASE               | 无需修改                                                                                              |
| BSP_CFG_ROM_SIZE               | 无需修改                                                                                              |
| BSP_CFG_RAM_BANK0_START        | BANK0 起始地址，根据实际情况修改                                                                      |
| BSP_CFG_RAM_BANK0_SIZE         | BANK0 大小，根据实际情况修改                                                                          |
| BSP_CFG_TAIL_RESERVED_SIZE     | 内存空间末尾保留空间，根据实际情况修改                                                                |
| BSP_CFG_RAM_BANK1_START        | BANK1 起始地址，根据实际情况修改                                                                      |
| BSP_CFG_RAM_BANK1_SIZE         | BANK1 大小，根据实际情况修改                                                                          |
| BSP_CFG_APP0_START             | APP0 起始地址，根据实际情况修改                                                                       |
| BSP_CFG_APP0_SIZE              | APP0 内存大小，根据实际情况修改                                                                       |
| BSP_CFG_RAM_BASE               | 内存基址，根据编程手册，为 0 + BSP_CFG_HEAD_RESERVED_SIZE                                             |
| BSP_CFG_RAM_SIZE               | 可用内存大小，总内存大小减去 BSP_CFG_HEAD_RESERVED_SIZE 和 BSP_CFG_TAIL_RESERVED_SIZE                 |
| BSP_CFG_TEXT_SIZE              | 代码段大小，根据实际情况修改                                                                          |
| BSP_CFG_DATA_SIZE              | 数据段大小，根据实际情况修改                                                                          |
| BSP_CFG_DMA_SIZE               | DMA 内存大小，根据实际情况修改                                                                        |
| BSP_CFG_APP_SIZE               | APP 内存大小，根据实际情况修改                                                                        |
| BSP_CFG_BOOT_STACK_SIZE        | 启动栈大小，链接脚本中使用，根据实际情况修改。当前每个核启动栈设置为 64KB，四核共计 256KB             |
| BSP_CFG_VAPP_START_ARM32       | 32 位系统 APP 虚拟空间基址，根据实际情况修改                                                          |
| BSP_CFG_VAPP_SIZE_ARM32        | 32 位系统 APP 虚拟空间大小，根据实际情况修改                                                          |
| BSP_CFG_VIO_START_ARM32        | 32 位系统 IOREMAP 虚拟空间基址，根据实际情况修改                                                      |
| BSP_CFG_VIO_SIZE_ARM32         | 32 位系统 IOREMAP 虚拟空间大小，根据实际情况修改                                                      |
| BSP_CFG_VAPP_START_ARM64       | 64 位系统 APP 虚拟空间基址，根据实际情况修改                                                          |
| BSP_CFG_VAPP_SIZE_ARM64        | 64 位系统 APP 虚拟空间大小，根据实际情况修改                                                          |
| BSP_CFG_VIO_START_ARM64        | 64 位系统 IOREMAP 虚拟空间基址，根据实际情况修改                                                      |
| BSP_CFG_VIO_SIZE_ARM64         | 64 位系统 IOREMAP 虚拟空间大小，根据实际情况修改                                                      |
| BSP_CFG_ROOTFS_TYPE            | 根文件系统挂载设备配置，根据实际情况修改                                                              |
| BSP_CFG_BOOT_PARAM             | 启动参数，根据实际情况修改                                                                            |
| BSP_CFG_TICK_CHAN              | tick 使用的外部定时器对应的控制器通道号，默认为 0，根据实际情况修改                                   |
| BSP_CFG_TICK_INT_VECTOR        | tick 使用的外部定时器对应的控制器中断号                                                               |
| BSP_CFG_TICK_USE_PRIV_TIMER    | tick 是否使用私有定时器，默认开启                                                                     |
| BSP_CFG_TICK_PRIV_TIMER_VECTOR | tick 是否使用私有定时器的中断号                                                                       |
| BSP_CFG_GIC_ITS_EN             | 是否使能对 ITS 支持，用于 PCIe 驱动中 msi 中断支持                                                    |
| BSP_CFG_GIC_ITS_MAP_BASE       | ITS 中断映射基地址                                                                                    |

* 板级源文件中，根据实际需要，结合《驱动开发》介绍的驱动接口及特性，调用对应的驱动初始化接口，可参考已有的 aio 板级文件内容，此处不做详细介绍。
* 最外层 Makefile 中添加 BOARD_LIST += demo。
* 编译后会生成对应的板级二进制文件，根据板卡实际情况，通过 u-boot 引导启动即可。
