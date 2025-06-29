---
title: "Pocket-Docs Site: quick start"
date: 2025-06-29
draft: false
toc: true
tags: [homelab, hugo, bash]
description: "Step-by-step notes for my local Hugo vault, an on/off bash script, and uses Netlify push."
---

---

My private documentation site setup guide

# Outcome

- Local wiki/blog at `~/vault`, one command on or off.
- Edits show up live the second you hit save.
- Git keeps history & lets friends add stuff.
- Pushes auto-build to Netlify so you can read it anywhere without opening ports.


This one-time setup should take approx 3 min

# Install Hugo

If you haven't already installed **Hugo** on your system, 
use your own apropriate package manager.

In this guide, I'm using macOS with the **brew** package manager.

```bash  
brew install hugo
``` 

# Scaffold the site

Assuming you want to make this **project** called `vault`:

```bash  
hugo new site ~/vault && 
cd ~/vault
``` 

```bash
# Drop in a theme, TODO: find better theme
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke themes/ananke
echo 'theme = "ananke"' >> config.toml
git add . && git commit -m "fresh hugo vault"
```

1. Tiny on/off script

inside `~/vault/vaultctl`:

- First make the script file.
- Use any name you wish for this toggle script.
- In this case, I used `vaultctl.sh`

```bash 
touch vaultctl.sh
```

Next, copy this script and add it in your `vaultctl.sh`, or whatever you've named it.

```python
# TODO: test and update docs for linux and windows in the future
``` 

```bash
#!/usr/bin/env bash
PID="$HOME/vault/.hugo.pid"
PORT=1313
IP=$(ipconfig getifaddr en0) # Wi-Fi IP on macOS

case "$1" in
  start)
    [[ -f $PID ]] && echo "running already" && exit
    hugo server --bind 0.0.0.0 --baseURL "http://$IP:$PORT" \
                --source "$HOME/vault" --port "$PORT" >/dev/null 2>&1 &
    echo $! > "$PID"
    echo "live at http://$IP:$PORT"
  ;;
  stop)
    [[ -f $PID ]] && kill "$(cat $PID)" && rm "$PID" && echo "stopped"
  ;;
  *)
    echo "usage: vaultctl start|stop"
  ;;
esac
```

**⚠️Important⚠️**
To be able to execute the file like
`./vaultctl`,

You must give the file execute permissions with `chmod` command:

```bash
chmod +x vaultctl
```

2. How to use

To fire it, up run `./vaultctl`,
make sure you gave the file execute 
permissions with the `chmod` command.

```python 
# TODO: add post about chmod and file permissions in general, and how to read octals
``` 

```bash 
hugo new docs/new-note.md' 
# → edit → save
``` 

Save to git:

```bash
git add . &&
git commit -m "note" && 
git push
``` 

turn it off by executing the toggle script `./vaultctl` to stop

---

3. To let others post

```bash
# only need to do once
git remote add origin git@github.com:YOURUSERNAME/vault.git
git push -u origin main     # push site + script
# give friends write access on GitHub
``` 

Everyone edits markdown, pushes, done.

---

4. Ship a public clone (with **Netlify**, 60 sec)


Now you’ve got 

https://*whatever*.**netlify.app** 

as the “on-the-road” copy, and
the home server stays private.

---

# Other TODOs, remove me in the future please!

```python
# TODO: add screenshot when I decide to use this
# TODO: improve the netlify section for beginners
# TODO: set personal reminder for myself to make these tutorials more often for personal reference.
# TODO: add more personally useful bash scripts to this hugo site
# TODO: add a gists post, or just use github
# TODO: funny section of various scam texts I received over the years ane regularly update it.
```

---

I cannot believe I wrote all this on my phone! ill probably forget to delete this sentence, but the chances anyone actually reaches this far,
 