
⸻

title: “Unix Permissions Cheat-Sheet: rwx, octals & ACL”
date: 2025-06-29
draft: false
toc: true
tags: [linux, permissions, chmod]
description: “Ultra-compact reference for rwx bits, octal modes, special bits, ACLs, and quick memory tricks.”

Outcome
- Know at a glance what rwx bits mean and how octals map to them.
- Set, fix, and audit permissions quickly (chmod, chown, setfacl).
- Understand special bits (SUID, SGID, sticky) and Access Control Lists (ACLs).

---

Permissions basics

Octal	Symbolic	Meaning
0	—	no rights
1	–x	execute only
2	-w-	write only
3	-wx	write + execute
4	r–	read only
5	r-x	read + execute
6	rw-	read + write
7	rwx	read + write + execute

- Mnemonic: 4 2 1 → r w x. Add them to get the digit.
- Example: chmod 640 file → rw- r-- --- (owner read/write, group read, world none).

---

Cheat-sheet: common tasks

Task	Command
Give owner execute	chmod u+x script.sh
Remove others’ write	chmod o-w *.md
Exact mode (octal)	chmod 755 /usr/local/bin/tool
Change owner/group	sudo chown ivan:devs project
Recursive group write	chmod -R g+w shared/
Default mask for new files	umask 002

Key acronyms:
	•	UID / GID – User / Group ID numbers.
	•	ACL – Access Control List, extra per-user rules beyond rwx.

⸻

Special bits

	Bit	Octal flag	What it does
{{< bi “person-fill-lock” >}}	SUID (Set User ID)	4	Run program as the file owner (often root)
{{< bi “people-fill” >}}	SGID (Set Group ID)	2	Run as file’s group or force new files inherit the dir’s group
{{< bi “pin-angle” >}}	Sticky	1	On dirs: only owner can delete own files (e.g. /tmp)

	•	Combine by prepending the flag digit: chmod 4755 /bin/foo sets SUID + 755.

⸻

ACLs in one breath
	•	Why: rwx applies only to owner/group/others; ACL (Access Control List) lets you add precise rules.
	•	Quick syntax:
	•	Add: setfacl -m u:alice:rw file
	•	View: getfacl file
	•	Stored as extended attributes; works on ext4, XFS, APFS.
	•	Windows NTFS uses ACLs by default – same concept, different tool (icacls).

---

Here’s a cleaner version of your list using Bootstrap icons (via Hugo shortcodes if applicable) and Bash script formatting:

⸻

Handy Commands to Remember

# 🔍 Check your distribution info
cat /etc/os-release

# 📁 View permissions in symbolic format
ls -l

# 🔢 View permissions in octal format
stat -c %a <file>

# 🕵️ Find files with non-standard permissions (not 644)
find . -type f ! -perm 644

# ⚙️ List currently running services (needs execute permissions)
systemctl list-units --type=service


⸻

TODO: remove this after fixing
If you’re using Hugo shortcodes for icons, replace the emoji with:

{{< icon name="search" >}}  
{{< icon name="folder" >}}  
{{< icon name="123" >}}  
{{< icon name="shield-exclamation" >}}  
{{< icon name="gear" >}}



---

Octal memory drill

1.	Write the grid 
(do this on scrap paper at the exam)

```plaintext
bash r(4) w(2) x(1)

7 = rwx
6 = rw-
5 = r-x
4 = r--
3 = -wx
2 = -w-
1 = --x
0 = ---
``` 


	2.	Pick random numbers; translate to symbols & back.
	3.	Time yourself until you hit < 5 seconds per conversion.

Tip: practice with 
```bash 
chmod --verbose NUMBER dummyfile
``` 


 and watch the output.

⸻

Todos
- [ ] Add /proc & /sys permission quirks.
- [ ] One-pager on chmod symbolic vs octal.
- [ ] Quick comparison: Linux ACL vs Windows NTFS ACL.


