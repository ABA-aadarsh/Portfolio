import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Aadarsh Techlog",
  EMAIL: "aadarshbandhuaryal@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Logs, projects and portfolio of Aadarsh.",
};

export const Logs: Metadata = {
  TITLE: "Logs",
  DESCRIPTION: "A collection of logs on topics I am interested about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects",
};

export const SOCIALS: Socials = [
  { 
    NAME: "github",
    HREF: "https://github.com/ABA-aadarsh"
  },
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/aadarsh-bandhu-aryal-1141882a0/",
  }
];
