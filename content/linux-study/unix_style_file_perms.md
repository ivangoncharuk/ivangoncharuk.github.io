---
title: "Unix Permissions Cheat-Sheet"
date: 2025-06-29
draft: false
toc: true
tags: [cheatsheet, linux, bash]
description: "Cheatsheet reference for Unix Permissions, with explanations"
---


# Outcome

- Understand how rwx maps to octal digits.
- Set, fix, and audit permissions quickly using:
    - chmod
    - chown
    - setfacl
- Remember what SUID / SGID / sticky and ACL do without Googling.

---

# Permissions Basics

| Octal | Symbolic | Meaning               |
| :---: | :------: | --------------------- |
|   0   |   `---`  | No rights             |
|   1   |  `--x`   | Execute only          |
|   2   |  `-w-`   | Write only            |
|   3   |  `-wx`   | Write + Execute       |
|   4   |  `r--`   | Read only             |
|   5   |  `r-x`   | Read + Execute        |
|   6   |  `rw-`   | Read + Write          |
|   7   |  `rwx`   | Read + Write + Execute|

**Mnemonic:** 
`421` $\rightarrow$ `rwx`

Just add them to get each digit.

**Example:** 

`chmod 640 file` $\rightarrow$ `rw-` `r--` `---` 

(owner can read/write, group can read, others have no permissions).

---

## Cheat-sheet for common tasks

```
Task	 Command
Give owner execute	chmod u+x script.sh
Remove “others” write	chmod o-w *.md
Exact mode (octal)	chmod 755 /usr/local/bin/tool
Change owner & group	sudo chown ivan:devs project
Recursive group write	chmod -R g+w shared/
Default mask for new files	umask 002
``` 

- UID / GID – User / Group ID numbers.
- ACL – Access Control List, extra per-user rules beyond rwx.

---

## Special bits

```
Bit	Octal flag	What it does
SUID	4	Run program as file owner (often root)
SGID	2	Run as file’s group or make new files inherit the dir’s group
Sticky	1	On dirs: only owner may delete own files (e.g. /tmp)
``` 

- Combine by prepending the flag digit: chmod 4755 /bin/foo sets SUID + 755.

---

## ACLs in one breath

- Why? rwx covers only owner / group / others; ACL adds per-user or per-group rules.
- Add rule: setfacl -m u:alice:rw file
- View rules: getfacl file
- Works on ext4, XFS, APFS
- Windows NTFS uses ACLs by default (icacls).

---

## Handy commands to remember

- cat /etc/os-release – check distro info
- ls -l – view permissions (symbolic)
- stat -c %a file – view octal mode
- find . -type f ! -perm 644 – spot odd perms
- systemctl list-units --type=service – list active services

---

## Octal memory drill

Write this on scratch paper, then quiz yourself:

```
r (4)   w (2)   x (1)

7 = rwx   6 = rw-   5 = r-x   4 = r--
3 = -wx   2 = -w-   1 = --x   0 = ---
```

- Pick random numbers; translate to symbols & back.
- Aim for < 5 s per conversion.
- Practice: chmod --verbose 640 dummyfile and read the output.

---

# Todos

- [ ] Add /proc & /sys permission quirks.
- [ ] One-pager on symbolic vs octal chmod.
- [ ] Compare Linux ACL vs Windows NTFS ACL.

