---
title: "envy - Underdevelopment"
description: "Variables and Secret Manager For Smoother Collaboration. Instead of sharing variables and secrets for projects through messenger, use your terminal with git like commands to track, version and share with collaborators."
date: "Sep 30 2025"
repoURL: "https://github.com/ABA-aadarsh/envy"
stack: 
   - "Go"
   - "Hono"
   - "React"
---

<img src="/assets/projects/envy/envy-logo.svg" alt="Logo" style="width:80%;height:200px;object-fit:cover;">

`envy` solves a very particular problem I face while making projects with friends, sharing the environment variables and secrets. Sharing these project crucial variables through messaging platforms seems a bit counter productive. And I also try to make sure that I remove (for everybody) that message once everybody has copied it down (which could also take some time).

> Honestly though it is not that much of a problem to solve, you should use preproduction variables separate from production. But here we are doing something called "recreational programming". So it is just for the sake of doing.

## But why will you trust envy?

If you cannot trust messaging platforms like "messengers", you should in good conscious not trust envy as well. And I am not trying to make you trust it as well. Code is open sourced and you can easily self host and use it without any issue of privacy.

I want to use it, hence I made it.

## Tech Stack

1. Backend Server - Hono on Cloudflare workers.
2. CLI - Go with Cobra.
