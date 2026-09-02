import { getRelativeLocaleUrl } from "astro:i18n";

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const langParam = (locale: Locale) => (locale === defaultLocale ? undefined : locale);

export const localeUrl = (locale: Locale, path: string) =>
  getRelativeLocaleUrl(locale, path.replace(new RegExp(`^/(${locales.join("|")})(?=/|$)`), ""));

export const formatDate = (
  date: Date,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
) => date.toLocaleDateString(locale, { timeZone: "UTC", ...options });

export const githubUrl = "https://github.com/lzm0";
export const utorontoUrl = "https://www.utoronto.ca/";
export const linkedinUrl = "https://www.linkedin.com/in/li-zimo/";

const en = {
  name: "zimo.li",
  description: "software engineer in toronto.",
  posts: "posts",
  github: "github",
  linkedin: "linkedin",
  postsTagline: "notes on the things i build and break",
  allPosts: "all posts",
  otherPosts: (count: number) => `${count} more posts in chinese →`,
  greeting: "hi there, i’m zimo",
  greetings: {
    morning: "good morning, i’m zimo",
    afternoon: "good afternoon, i’m zimo",
    evening: "good evening, i’m zimo",
  },
  bio: [`software engineer in toronto`, `cs @ <a href="${utorontoUrl}">utoronto</a>`],
};

export const ui: Record<Locale, typeof en> = {
  en,
  zh: {
    name: "zimo.li",
    description: "多伦多程序员",
    posts: "笔记",
    github: "GitHub",
    linkedin: "领英",
    postsTagline: "记录一些技术上踩过的坑",
    allPosts: "全部文章",
    otherPosts: (count) => `另有 ${count} 篇英文笔记 →`,
    greeting: "你好，我是 zimo",
    greetings: {
      morning: "早上好，我是 zimo",
      afternoon: "下午好，我是 zimo",
      evening: "晚上好，我是 zimo",
    },
    bio: [`多伦多程序员`, `计算机科学 @ <a href="${utorontoUrl}">多伦多大学</a>`],
  },
};
