---
title: "easyCSIT"
description: "A growing learning platform for B.Sc. CSIT students with structured notes, videos, AI-generated Q&As, and past exam collections."
date: "Jun 1 2025"
demoURL: "https://www.easycsit.com"
stack: 
   - "Nextjs"
   - "MongoDB"
highlights:
   - 16K+ views/month
   - 100+ users/day
---

![Hero Image](/assets/projects/easycsit/easycsit-hero.png)

### Overview

**easyCSIT** is a modern, minimalistic learning platform tailored specifically for **B.Sc. CSIT students in Nepal**. It offers a curated collection of chapter-wise video lectures, study notes, important questions, and past exam papers — all organized for efficient, distraction-free preparation.

Originally conceived during the first semester as “CSIT Portal,” the project was abandoned early due to a lack of experience and clarity. In the third semester, the project was rebooted from scratch with a clearer focus: **video-based learning**, a medium more engaging for users and more scalable for content curation.

The first MVP was built in two weeks, launched on Reddit, and received encouraging feedback from the CSIT community. While the early version was buggy and rough around the edges, it steadily grew to 100–200 daily users during exam periods.

---

### V2 Rebuild

During the third semester break, a major revamp (V2) was initiated in collaboration with [Amezan](#), focusing on performance, UI/UX, and backend architecture. Key changes included:
- Complete redesign of the UI
- New database schemas
- Admin panel for content management
- Migration to more scalable backend routing

The result was a significantly more stable, flexible, and user-friendly platform.

---

### Key Features

1. **Chapter-Wise Video Learning**  
   Structured subject → chapter → video navigation with embedded YouTube playback.

2. **Multi-Level Study Guides**  
   Content organized at the subject, chapter, and individual video level for quick revision and deeper study.

3. **Interactive Video Panel (USP)**  
   A custom-built video interface that allows:
   - Maximizing/minimizing/fullscreen toggle
   - Side-by-side note viewing while watching
   - Persistent panel across same-subject routes
   - Seamless transitions without interrupting the video

4. **Chapter-Wise Notes**  
   Clean, readable notes with support for future enhancements like downloadable PDFs.

5. **AI-Assisted Q&A Generation**  
   Automatically generated important questions and their answers for each chapter.

6. **Past Year Question Papers**  
   Archived and organized by semester and subject for offline-style exam prep.

---

### Tech Stack
- **Frontend**: Next.js, TailwindCSS
- **Backend**: Node.js, Prisma, PostgreSQL
- **Hosting**: Vercel
- **AI Integration**: Gemini API for semi-automated content

---

### Impact

easyCSIT has steadily gained traction in the CSIT student community. It aims to become the default preparation tool for CSIT exams, with plans for more automation, smarter recommendations, and performance analytics in future iterations.
