---
title: "Building of Typonode"
description: "Development log for a terminal-based typing speed program built in Node/TS."
date: "Nov 25 2024"
---

[Typonode](/projects/typonode) is a terminal-based typing speed test application built in TypeScript/Node.js. The goal was to develop a terminal UI from scratch without any dependencies—purely using native Node.js capabilities and ANSI escape codes.

![Interface Overview](/assets/projects/typonode/main.png)

### Links
- [Download Page](https://typonodedownload.netlify.app/)
- [Source Code](https://github.com/ABA-aadarsh/typonode)

---

## Project Goal

The main challenge was:  
> **Can I build a fully functional terminal application from scratch using just Node.js and TypeScript—no libraries?**

It began as a toy project but evolved over three months into a feature-complete terminal app with real-time feedback, user settings persistence, and performance optimizations.

---

## Project Structure

![Folder Structure](/assets/logs/dev-process-behind-typonode/project-structure.png)

The application has three primary screens:
1. **Main** – Typing test interface
2. **Result** – Displays WPM and accuracy after completion
3. **Settings** – User-adjustable test parameters

Each screen is a class under `/src/view/screens/`, inheriting from a common `Base.ts` screen class that provides methods like `update`, `render`, `keyHandle`, and `resizeScreen`.

---

## Screen Manager

The `ScreenManager.ts` acts as the central controller. Its responsibilities include:
- Initializing and switching between screens
- Passing user input (keyboard, resize) to the active screen
- Providing FPS timing for smooth rendering
- Integrating with an internal EventBus for screen-to-screen communication

---

## Buffer Handler

Direct terminal output caused flickering. To resolve this, I implemented a virtual screen buffer that builds the next frame off-screen and then flushes it at once.

![Buffer Handler](/assets/logs/dev-process-behind-typonode/buffer-handler.png)
---

## Local Storage

User settings (FPS, test length, etc.) and WPM history are stored in a local JSON file (`typonode.json`) in the user’s home directory. This is handled by a small store utility in `/src/utils/store.ts`.

![Storage File Example](/assets/logs/dev-process-behind-typonode/store.png)

---

## Word Source & Generation

The word list for the test is stored directly in `/src/assets/commonwords.ts`, allowing the application to function without internet access or external files. The list is used to dynamically generate test lines during runtime.

---

## ANSI Rendering and `chalky.ts`

I avoided using libraries like `chalk.js` by implementing my own mini version, called [`chalky.ts`](https://github.com/ABA-aadarsh/typonode/blob/main/src/utils/Chalky.ts). It replicates color formatting using raw ANSI escape codes.

Here’s an example:
```js
console.log("\x1b[1mHello") // Bold
````

The `chalky` utility uses JavaScript `Proxy` to support chained styles like:

```js
chalky.red.bold("Hello")
```

This portion required in-depth understanding of JavaScript Proxies and type definitions, giving me huge respect for the actual `chalk.js` library.

---

## Final Thoughts

Building Typonode was a slow, iterative process filled with both fun and frustration. I initially underestimated the time and complexity, but the end result turned out to be something I’m proud of.

<video controls client:visible>
  <source src="https://misc-assets.easycsit.com/typonode-demo-video.mp4" type="video/mp4" />
</video>

If you're interested:

* [Download Typonode](https://typonodedownload.netlify.app/)
* [View Source on GitHub](https://github.com/ABA-aadarsh/typonode)