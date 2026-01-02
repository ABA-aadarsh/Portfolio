---
title: "Guessle"
description: "A programmatic Wordle guesser built with Bun + TypeScript."
date: "Sep 21 2025"
repoURL: "https://github.com/ABA-aadarsh/Guessle-Wordle-Guesser"
stack:
   - "Bun"
featuredNumber: 3
---

```txt
  /$$$$$$                                         /$$
 /$$__  $$                                       | $$
| $$  \__/ /$$   /$$  /$$$$$$   /$$$$$$$ /$$$$$$$| $$  /$$$$$$
| $$ /$$$$| $$  | $$ /$$__  $$ /$$_____//$$_____/| $$ /$$__  $$
| $$|_  $$| $$  | $$| $$$$$$$$|  $$$$$$|  $$$$$$ | $$| $$$$$$$$
| $$  \ $$| $$  | $$| $$_____/ \____  $$\____  $$| $$| $$_____/
|  $$$$$$/|  $$$$$$/|  $$$$$$$ /$$$$$$$//$$$$$$$/| $$|  $$$$$$$
 \______/  \______/  \_______/|_______/|_______/ |__/ \_______/
```

**Guessle** is a **programmatic Wordle solver** built in **Bun + TypeScript**.
Instead of being a Wordle clone, it acts as a helper tool: suggesting the **best next guess** based on feedback until the solution is found.

---

### How It Works
- Starts with a **word set of 14,000+ entries**
- Uses **programmatic filtering** to eliminate invalid words after each guess
- Implements a **best-pick algorithm** that prefers words with varied letters
- Heuristics assign higher scores to words with **more unique characters**, drastically reducing possibilities
  _(sometimes from 14,000 → 200 in a single guess!)_

This makes Guessle both a problem-solving tool and a fun experiment in algorithmic word filtering.

---

### Key Features
- Suggests optimal guesses for Wordle
- Efficient word set reduction
- **Zero external dependencies** (only `typescript` for dev)
- Built in just **1–2 hours** as a hobby project
- Includes a **word serializer script** for:
  - Deduplication
  - Filtering to only 5-letter words

---

### Tech Stack
- Bun
- TypeScript

Developer: [Aadarsh](https://github.com/ABA-aadarsh)

---

### Demo Video

<video controls>
  <source src="https://misc-assets.easycsit.com/guessle-demo-video.mp4" type="video/mp4" />
</video>
<p class="text-center">Demo Video</p>

---

