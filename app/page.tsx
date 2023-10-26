import { cookies, headers } from "next/headers";
import WavingHand from "./components/waving-hand/waving-hand";
import LanguageToggle from "./components/language-toggle/language-toggle";
import Terminal from "./components/terminal/terminal";

export default function Home() {
  const lang = getLanguage();

  return (
    <main className="flex flex-col min-h-screen antialiased max-w-2xl mt-20 mx-6 md:mx-auto">
      <LanguageToggle lang={lang} />
      <section className="prose prose-neutral dark:prose-invert my-16">
        {lang === "en" ? <English /> : <Chinese />}
      </section>
      <Terminal />
    </main>
  );
}

function getLanguage() {
  const cookieStore = cookies();
  const cookieLang = cookieStore.get("lang");
  if (cookieLang === undefined) {
    return headers().get("accept-language")?.split(",")[0].split("-")[0] ===
      "zh"
      ? "zh"
      : "en";
  } else {
    return cookieLang.value;
  }
}

function English() {
  return (
    <>
      <h1 className="font-semibold text-2xl tracking-tight mb-16">
        Hi there, I&apos;m Zimo <WavingHand />
      </h1>
      <p>
        I&apos;m a <a href="https://github.com/lzm0">software engineer</a> based
        in Toronto. I enjoy solving complex problems with simple solutions while
        learning new things along the way. I also{" "}
        <a href="https://blog.zimo.li">blog</a> about technical stuff that I
        find interesting. Find me on{" "}
        <a href="https://www.linkedin.com/in/li-zimo/">LinkedIn</a> if you want
        to get in touch.
      </p>
    </>
  );
}

function Chinese() {
  return (
    <>
      <h1 className="font-semibold text-2xl tracking-tight mb-16">
        你好，我是子沫 <WavingHand />
      </h1>
      <p>
        我是一名在多伦多的<a href="https://github.com/lzm0">软件工程师</a>。
        我喜欢通过简洁的方案来解决复杂的问题，并在此过程中学习新的东西。
        我也会在我的<a href="https://blog.zimo.li">博客</a>
        上写一些我觉得有趣的话题。 欢迎通过
        <a href="https://www.linkedin.com/in/li-zimo/">领英</a>
        联系我。
      </p>
    </>
  );
}
