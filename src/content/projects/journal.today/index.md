---
title: "Journal.Today"
description: "Minimal, self-hosted personal journaling app."
date: "Dec 28 2025"
repoURL: "https://github.com/ABA-aadarsh/journal.today"
stack:
  - Next.js
  - MongoDB
  - TinyMCE
featuredNumber: 5
---

**Journal.Today** is a small personal journaling app built for one user: yourself.

I originally explored TinyMCE for another project and decided to use it to build something deliberately simple—a place to write daily thoughts without distractions. The app is self-hostable by design and does not try to be a full-fledged journaling platform.

You write entries for the day. That’s it.
There’s no history view yet, intentionally. The only feedback loop is a writing streak.

Authentication is intentionally minimal: a single username and password stored via environment variables. This is not meant for multiple users or public hosting.

## Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:ABA-aadarsh/journal.today.git
   ```

2. Get a free TinyMCE API key<br/>
   Follow this guide: [Set up TinyMCE API in 2 Minutes](https://www.tiny.cloud/blog/set-up-tinymce-api-key-in-two-minutes/)

3. Create a free MongoDB cluster<br/>
   Follow this Guide: [Create Mongodb Database](https://www.mongodb.com/resources/products/fundamentals/create-database)

4. Create a `.env` file:
   ```env
   NEXT_PUBLIC_TINY_MCE_API_KEY=""
   JWT_SECRET=""
   USER=""
   PASSWORD=""
   DATABASE_URI=""
   ```

5. Deploy<br/>
  Vercel is the simplest option for this project.
