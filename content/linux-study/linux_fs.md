---
title: "Linux FS-101: /etc, directory cheat-sheet & who’s related to who"
date: 2025-06-29
draft: false
toc: true
tags: [linux, filesystems, distro-tree, windows, macos]
description: "Quick brain dump on the Linux directory layout, a no-frills distro family tree, and the Windows/macOS edition cliff notes."
---

## Outcome
- ✅ I know exactly **what lives in /etc** (and its cousins) and why it matters.  
- ✅ I can glance at a **distro family tree** and remember who’s based on whom.  
- ✅ Same post reminds me of **Windows 11/HOME/PRO/Enterprise** differences and the macOS business quirks.

---

Filesystem cheatsheet

Dir	What’s in there	Quick vibe
/etc	System-wide config (fstab, ssh/, apt/, …)	Brain – poke here, bend the OS
/bin	Core binaries (ls, cp, bash)	“Grab-this-first” toolkit; lives on the root FS so rescue shells work
/sbin	Sysadmin binaries (mount, ip, systemctl)	Same deal as /bin but root-only toys
/usr/bin	Full app set (gcc, python)	Userland galaxy – 90 % of commands
/usr/sbin	Advanced admin apps (sshd, cron)	Heavy sys daemons, still userland
/usr/local	Locally compiled stuff	Keeps your custom builds safe from the distro’s package manager
/var	Logs, spool, caches, DB files	Growing stomach – watch disk usage
/run (aka /var/run)	Volatile runtime state (PIDs, sockets)	Created early at boot; tmpfs in RAM
/home	Users’ dirs	You, your dotfiles, your mess
/opt	3rd-party bundles (Chrome, VMware)	Vendor playground; easy to wipe
/dev	Device nodes (/dev/sda, /dev/null)	“Everything’s a file” made real
/proc	Kernel + process pseudo-FS	cat /proc/cpuinfo = free hardware probe
/sys	Kernel objects, drivers	Modern cousin of /proc; tweak power/LEDs
/tmp	Scratch space	Auto-purged; don’t store secrets
/boot	Kernel & bootloader bits (vmlinuz, grub/)	Must fit in BIOS/EFI; often its own small partition

Why the weird names?
- usr ≠ “user” originally: it meant Unix System Resources (hence /usr/bin).
- sbin = system binaries (super-user land).
- opt adopted from optional software add-ons in SVR4 days.
- run split out because /var might live on a slower disk; early-boot services need writable RAM right away.

Quick cross-OS compare

OS	Root	Apps live in	User homes	Note on mounts
Linux/*BSD	/	/usr/bin, /opt	/home/ivan	Any device mounts anywhere (/mnt/usb), fstab drives it
macOS	/	/Applications (GUI), /usr/bin (CLI)	/Users/ivan	Internally APFS; external drives auto-mount under /Volumes
Windows	C:\	C:\Program Files / Program Files (x86)	C:\Users\Ivan	Drive letters (D:\, E:\) instead of mounting into the tree

Handy aliases & shortcuts
- ~ → your home dir (/home/ivan or /Users/ivan).
- . (dot) = current dir, .. = parent.
- /var/run → symlink to /run on modern distros.
- /bin & /sbin often point to /usr/bin & /usr/sbin on bleeding-edge systems (the usr-merge movement).

Mounting in one breath

Linux glues extra filesystems into 
the single tree with mount 
/dev/sdb1 /media/usb. 

Windows splits trees per drive 
letter. macOS auto-mounts to 
/Volumes/DriveName. 
Same idea, different front doors.

---

## /etc in a bit more detail

- **What**: Plain-text config the whole OS reads at boot or on service start.  
- **Why**: One grep away from knowing how a box is wired.
- **Common hitters**  
  * `/etc/passwd`, `/etc/shadow` – local users & hashes  
  * `/etc/fstab` – disks & mount points  
  * `/etc/hosts`, `/etc/resolv.conf` – name resolution  
  * `/etc/ssh/sshd_config` – OpenSSH daemon rules  
  * `/etc/systemd` – service unit overrides  
- **Distro spice**  
  * Debian/Ubuntu → `apt` stuff in `/etc/apt`  
  * RHEL/Fedora → `dnf` & SELinux bits (`/etc/dnf`, `/etc/selinux`)  
  * Arch → single `pacman.conf` in `/etc` and tiny network scripts  
- **macOS angle**  
  * Still has `/etc`, but Apple favors **plist** files in `/Library/Preferences`  
  * Launch daemons live in `/System/Library/LaunchDaemons`

---

## “Who’s your parent?” - Linux distro tree

Linux
├─ Debian
│  ├─ Ubuntu
│  │  ├─ Linux Mint
│  │  └─ Pop!_OS
│  └─ Kali
├─ Red Hat
│  ├─ Fedora
│  ├─ CentOS Stream
│  ├─ Rocky Linux
│  └─ AlmaLinux
├─ Arch
│  ├─ Manjaro
│  └─ EndeavourOS
├─ SUSE
│  ├─ openSUSE Leap
│  └─ openSUSE Tumbleweed
├─ Gentoo
└─ Slackware

Keep that handy when someone asks “is this RPM or DEB land?”

---

## 3 Windows quick-fire editions (Win 11 era)

| Edition | Stuff you DON’T get in the tier below |
|---------|---------------------------------------|
|**Home** | baseline – no BitLocker, no AD join |
|**Pro**  | BitLocker, Hyper-V, Remote Desktop host, domain/AAD join |
|**Pro for Workstations** | ReFS, ≥4 CPUs, 6 TB RAM, SMB Direct |
|**Enterprise** | all Pro perks + AppGuard, LTSC option, Windows To Go, advanced virtualization licensing |
|**Education** | Enterprise features, academic license pricing |
|**Server 2022** | AD DS, Hyper-V for data-center roles – a different animal |

*(If I just need BitLocker on a laptop → Pro. If I’m imaging 1 000 PCs in a corp → Enterprise.)*

---

## macOS flavors (post-Catalina world)

- **Consumer Macs** all run the same macOS (Sonoma, Ventura, Monterey, etc.).  
- **Business twist** happens via **Apple Business Manager + MDM** → zero-touch enrollment, FileVault key escrow, config profiles, etc.  
- **“macOS Server”** GUI died in 2022; only remnants (like Caching Server) are baked into standard macOS.

---

## Handy commands I always forget

```bash
# what distro am I on?
cat /etc/os-release

# list running services (systemd boxes)
systemctl list-units --type=service

# who owns a file (SELinux)
ls -Z /etc/ssh/sshd_config
```

---

TODOs for future-me
- [ ] break out /proc and /sys deep dive.
- [ ] do a separate note on file permissions & chmod octals (link back here).
- [ ] draft a Mac vs Linux path mash-up table.

---

(Yep, typed this whole thing on my phone again. If anything’s off, future-me can PR-fix it.)