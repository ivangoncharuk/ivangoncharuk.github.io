---
title: "Intro to systemd"
date: 2025-06-29
draft: false
toc: true
tags: [linux, init, systemd]
description: "Why PID 1 matters, how SysV init worked, and what systemd brings to the party—minus the fluff."
---

# Outcome
- Grasp why PID 1 ("mommy process") owns every orphan on the box.
- Recall the SysV init flow and its pain points.
- Know what systemd bundles and why nerds argue about it.

---

## PID 1 — the mommy process

{{< bi "person-fill" >}} Starts first in the kernel’s user-space hand-off → gets PID 1.

Every other process is its child, grandchild, or further down the tree.

If a parent dies, PID 1 adopts the orphan so its exit status can be reaped (prevents zombies).

Zombie = process finished execution but still holds a slot in the process table; init’s job is to wait() and clean it up.

---

## SysV init 

(a.k.a. Sys5 or "classic init")

	•	Plain-text shell scripts in /etc/init.d/*.
	•	Scripts run sequentially through numbered run-levels (/etc/rc?.d).
	•	Drawbacks
	•	Serial startup = slow boot on modern machines.
	•	No built-in dependency handling; you hand-craft the order.
	•	Limited monitoring—if a service crashes, init often doesn’t notice.

---

## systemd (sysd)

(often nick-named sysd)

Think of it as "init ++": 
still PID 1, but also the conductor for system state and services.

## What’s inside
	•	systemctl – master CLI to start/stop/enable units.
	•	journalctl – unified log viewer.
	•	networkd, logind, timedated, etc. – micro-daemons for common subsystems.
	•	Units replace old SysV scripts, describe deps in simple INI syntax.

## Perks
	•	{{< bi "lightning-charge-fill" >}} Parallel boot with dependency graph → faster startup.
	•	{{< bi "heart-pulse-fill" >}} Built-in health monitoring & auto-restart.
	•	{{< bi "clipboard-check" >}} Unified CLI (systemctl status nginx.service).

## Controversies
	•	Bigger footprint than minimalist folks like.
	•	Binary journal files (/var/log/journal) instead of plain text.
	•	Pros: indexed, structured, tamper-resistant.
	•	Cons: need journalctl to read; harder with bare tools.
	•	Want old school? Set Storage=none in journald.conf and traditional /var/log/*.log returns.

---

## Quick commands

	•	Show PID 1: ps -p 1 -o comm= → systemd or init.
	•	List orphan adoptees: ps -o pid,ppid,comm | awk '$2==1 && $1!=1'.
	•	Tail last boot logs: journalctl -b -e.

---

## Memory prompts for exams

	•	"Mom adopts orphans" → PID 1 waits on zombies.
	•	SysV = scripts + run-levels; systemd = units + parallel boot.
	•	Remember SUID, SGID, and Sticky bits from the permissions cheat-sheet.

---

# Todos

- [ ] Mini post on writing a simple .service unit.
- [ ] Compare OpenRC vs systemd in Alpine/Gentoo land.