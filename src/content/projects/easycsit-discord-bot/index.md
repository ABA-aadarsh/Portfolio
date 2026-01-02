---
title: "EasyCSIT Bot"
description: "Discord utility bot for automated TU (IOST) CSIT notice delivery."
date: "Oct 12 2025"
demoURL: "https://discord.com/oauth2/authorize?client_id=1426811008160104450&permissions=2048&integration_type=0&scope=bot+applications.commands"
stack:
  - Discord
  - Express
  - MongoDB
  - Gemini API
featuredNumber: 2
---

**EasyCSIT Bot** is a Discord utility bot built for the [EasyCSIT community](https://discord.gg/dAJUW73GCG) to automate TU (IOST) CSIT notice delivery.

Instead of relying on manual forwarding or scattered sources, the bot monitors official notice endpoints and posts updates directly to Discord in near-real time. The scraping logic is intentionally conservative—rate-limited, source-aware, and designed to avoid breaking or abusing upstream sites.

Notices are automatically categorized using the Gemini API, keeping the feed readable and searchable without human intervention. MongoDB is used to track notice state and prevent duplicates, while Express handles internal APIs and scheduling.

The bot is deliberately simple in scope: get notices to students on time, without noise or spam.

If you’re a CSIT student, this runs live in the EasyCSIT Discord server—where most students now check notices first.

Relevant Links:
1. [easycsit.com](https://www.easycsit.com)
2. [EasyCSIT Community Discord](https://discord.gg/dAJUW73GCG)
