import { getRelativeLocaleUrl } from "astro:i18n";

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const langParam = (locale: Locale) =>
  locale === defaultLocale ? undefined : locale;

export const localeUrl = (locale: Locale, path: string) =>
  getRelativeLocaleUrl(
    locale,
    path.replace(new RegExp(`^/(${locales.join("|")})(?=/|$)`), ""),
  );

export const formatDate = (
  date: Date,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
) => date.toLocaleDateString(locale, { timeZone: "UTC", ...options });

const en = {
  name: "zimo.li",
  description: "Software engineer in Toronto.",
  posts: "Posts",
  postsTagline: "Notes on the things I build and break.",
  allPosts: "All posts",
  otherPosts: (count: number) => `${count} more posts in Chinese →`,
  greeting: "Hi there, I’m Zimo",
  bio: (posts: string) => [
    `I’m a <a href="https://github.com/lzm0">software engineer</a> based in Toronto 🇨🇦`,
    `I <a href="${posts}">write</a> about stuff`,
    `Find me on <a href="https://www.linkedin.com/in/li-zimo/">LinkedIn</a> if you want to get in touch`,
  ],
};

export const ui: Record<Locale, typeof en> = {
  en,
  zh: {
    name: "zimo.li",
    description: "多伦多程序员",
    posts: "文章",
    postsTagline: "记录一些技术上踩过的坑",
    allPosts: "全部文章",
    otherPosts: (count) => `另有 ${count} 篇英文文章 →`,
    greeting: "你好，我是 Zimo",
    bio: (posts) => [
      `多伦多<a href="https://github.com/lzm0">程序员</a>一枚 🇨🇦`,
      `写一些<a href="${posts}">东西</a>`,
      `欢迎在<a href="https://www.linkedin.com/in/li-zimo/">领英</a>上和我打招呼！`,
    ],
  },
};
