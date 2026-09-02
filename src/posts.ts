import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "./i18n";

export const localeOf = (post: CollectionEntry<"posts">): Locale =>
  /[㐀-鿿]/.test(post.data.title) ? "zh" : "en";

export const getPosts = async (locale?: Locale) =>
  (await getCollection("posts"))
    .filter((post) => locale === undefined || localeOf(post) === locale)
    .sort((a, b) => +b.data.date - +a.data.date);

export const excerpt = (body = "", max = 160) => {
  const text =
    body
      .replace(/```[\s\S]*?```/g, "")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[#>*_`]/g, "")
      .split("\n")
      .map((line) => line.trim())
      .find(Boolean) ?? "";
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
};
