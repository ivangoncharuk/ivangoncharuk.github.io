---
title: "Intro to systemd"
date: 2025-06-29
draft: false
toc: true
tags: [linux, init, systemd]
description: "Why PID 1 matters, how SysV init worked, and what systemd brings to the party—minus the fluff."
---

Outcome
- {{< bi "eye-fill" >}} Understand why PID 1 ("mommy process") owns every orphan on the box
- {{< bi "clock-history" >}} Recall the SysV init flow & its pain points
- {{< bi "diagram-3-fill" >}} Know what systemd bundles and why nerds argue about it

---

## PID 1 — the mommy process

- {{< bi "person-fill" >}} Starts first in the kernel’s user-space hand-off → gets PID 1
- {{< bi "diagram-3" >}} Every other process is its child, grandchild, or further down the tree
- {{< bi "emoji-smile-upside-down" >}} If a parent dies, PID 1 adopts the orphan so its exit status can be reaped (prevents zombies)
- {{< bi "bug-fill" >}} Zombie = process finished execution but still holds a slot in the table; init uses wait() to clean it up

---

## SysV init {{< bi "archive-fill" >}}

(a.k.a. Sys5 or "classic init")
- {{< bi "file-earmark-text" >}} Plain-text shell scripts in /etc/init.d/*
- {{< bi "list-ol" >}} Scripts run sequentially via run-levels (/etc/rc*.d)

Drawbacks {{< bi "slash-circle-fill" >}}
- Serial startup ⇒ slow boot
- No dependency handling — you hand-craft order
- Limited monitoring — service crash may go unnoticed

---

## systemd {{< bi "cpu-fill" >}}

Think of it as "init ++": still PID 1, but also conductor for system state and services.

What’s inside
- {{< bi "wrench-adjustable-circle" >}} systemctl — master CLI to start/stop/enable units
- {{< bi "chat-dots-fill" >}} journalctl — unified log viewer
- {{< bi "diagram-3-fill" >}} networkd, logind, timedated, etc. — micro-daemons
- {{< bi "file-code-fill" >}} Units replace old scripts; simple INI syntax

Perks
- {{< bi "lightning-charge-fill" >}} Parallel boot with dependency graph → faster startup
- {{< bi "heart-pulse-fill" >}} Built-in health monitoring & auto-restart
- {{< bi "clipboard-check" >}} One CLI for everything (systemctl status nginx.service)

Controversies {{< bi "question-diamond-fill" >}}
- Bigger footprint than minimalist folks like
- Binary journal files in /var/log/journal
- Pros: indexed, structured, tamper-resistant
- Cons: need journalctl; harder with plain tools
- Want old school? set Storage=none in journald.conf

---

Quick commands {{< bi "terminal-fill" >}}
- {{< bi "person-lines-fill" >}} Show PID 1: ps -p 1 -o comm=
- {{< bi "people-fill" >}} List orphans adopted by PID 1:
ps -o pid,ppid,comm | awk '$2==1 && $1!=1'
- {{< bi "journal-bookmark-fill" >}} Tail last boot logs: journalctl -b -e

---

Memory prompts for exams {{< bi "brain" >}}
- "Mom adopts orphans" → PID 1 waits on zombies
- SysV = scripts + run-levels; systemd = units + parallel boot
- Recall SUID, SGID, Sticky bits from the permissions cheat-sheet

---

Todos {{< bi "check2-square" >}}
- Mini post on writing a simple .service unit
- Compare OpenRC vs systemd on Alpine/Gentoo