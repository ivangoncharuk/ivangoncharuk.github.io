---
title: "Introduction to Linux Filesystem"
date: 2025-06-29
draft: false
toc: true
tags: [linux, bash]
description: "A brief into to the Linux Filesystem. more notes will link back to here a lot."
---

## Linux Filesystem cheatsheet

| Dir | What’s in there | Quick vibe |
|-----|-----------------|------------|
|<i class="bi bi-gear-fill"></i> `/etc` | System-wide config (`fstab`, `ssh/`, `apt/`…) | Brain – tweak here, bend the OS |
|<i class="bi bi-wrench-adjustable"></i> `/bin` | Core binaries (`ls`, `cp`, `bash`) | First-aid toolkit; always present, even in rescue mode |
|<i class="bi bi-shield-lock"></i> `/sbin` | Sysadmin binaries (`mount`, `ip`, `systemctl`) | Same as `/bin` but root-only toys |
|<i class="bi bi-box-seam"></i> `/usr/bin` | Full app set (gcc, python) | Userland galaxy – 90 % of commands |
|<i class="bi bi-server"></i> `/usr/sbin` | Heavier daemons (`sshd`, `cron`) | Admin apps still in userland |
|<i class="bi bi-hammer"></i> `/usr/local` | Locally compiled stuff | Keeps your builds safe from the distro’s package manager |
|<i class="bi bi-graph-up"></i> `/var` | Logs, spool, caches, DB files | Growing stomach – watch disk usage |
|<i class="bi bi-lightning"></i> `/run` (`/var/run`) | Volatile runtime state (PIDs, sockets) | tmpfs in RAM, born early at boot |
|<i class="bi bi-house-door"></i> `/home` | Users’ dirs | You, your dotfiles, your mess |
|<i class="bi bi-layers"></i> `/opt` | 3rd-party bundles (Chrome, VMware) | Vendor playground; easy to nuke |
|<i class="bi bi-hdd"></i> `/dev` | Device nodes (`/dev/sda`, `/dev/null`) | “Everything’s a file” made real |
|<i class="bi bi-cpu"></i> `/proc` | Kernel + process pseudo-FS | `cat /proc/cpuinfo` = free hardware probe |
|<i class="bi bi-motherboard"></i> `/sys` | Kernel objects, drivers | Modern cousin of `/proc`; tweak power/LEDs |
|<i class="bi bi-trash"></i> `/tmp` | Scratch space | Auto-purged; don’t stash secrets |
|<i class="bi bi-power"></i> `/boot` | Kernel & bootloader bits (`vmlinuz`, `grub/`) | Small, often its own partition |

### Why the weird names?
- `usr` ≠ “user” originally—*Unix System Resources* (`/usr/bin`).
- `sbin` = *system binaries* (super-user land).
- `opt` from *optional* add-ons in SVR4 days.
- `run` split from `/var` so early-boot services get instant writable RAM.

### Quick cross-OS compare

| OS | Root | Apps live in | User homes | Mount style |
|----|------|--------------|------------|-------------|
| 🐧 Linux/*BSD | `/` | `/usr/bin`, `/opt` | `/home/ivan` | Any device mounts anywhere (`/mnt/usb`) via `fstab` |
| <i class="bi bi-apple"></i> macOS | `/` | `/Applications` (GUI), `/usr/bin` (CLI) | `/Users/ivan` | External drives auto-mount under `/Volumes` |
| <i class="bi bi-microsoft"></i> Windows | `C:\` | `C:\Program Files` / `Program Files (x86)` | `C:\Users\Ivan` | Letters (`D:\`, `E:\`) instead of grafting into a single tree |

### Handy aliases & shortcuts
- `~` → home dir (`/home/ivan`, `/Users/ivan`).
- `.` = current dir, `..` = parent.
- `/var/run` → symlink to `/run` on modern distros.
- `/bin` & `/sbin` often symlink to `/usr/bin` & `/usr/sbin` (the *usr-merge* trend).

### Mounting in one breath
> Linux glues extra filesystems **into** the tree:  
> `mount /dev/sdb1 /media/usb`  
> macOS auto-mounts to `/Volumes/DriveName`,  
> Windows splits the forests into drive letters.

---

### TODOs
- Break out `/proc` & `/sys` deep dive
- Write a note on permissions & `chmod` octals
- Draft a Mac vs Linux path mash-up table