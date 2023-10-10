"use client";

export default function LanguageToggle({ lang }: { lang: string }) {
  return (
    <button
      className="self-end flex flex-row gap-1"
      onClick={() => toggleLanguage(lang)}
    >
      <span
        className={
          lang === "zh" ? "text-black dark:text-white" : "text-gray-500"
        }
      >
        文
      </span>
      <span>/</span>
      <span
        className={
          lang === "en" ? "text-black dark:text-white" : "text-gray-500"
        }
      >
        A
      </span>
    </button>
  );
}

function toggleLanguage(lang: string) {
  document.cookie = `lang=${lang === "en" ? "zh" : "en"}; path=/`;
  window.location.reload();
}
