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
      <ul>
        <li>
          I&apos;m a <a href="https://github.com/lzm0">software engineer</a>{" "}
          based in Toronto.
        </li>
        <li>
          I <a href="https://blog.zimo.li">blog</a> about technical stuff that I
          find interesting.
        </li>
        <li>
          Find me on <a href="https://www.linkedin.com/in/li-zimo/">LinkedIn</a>{" "}
          if you want to get in touch!
        </li>
      </ul>
    </>
  );
}

function Chinese() {
  return (
    <>
      <h1 className="font-semibold text-2xl tracking-tight mb-16">
        你好，我是子沫 <WavingHand />
      </h1>
      <ul>
        <li>
          加拿大多伦多<a href="https://github.com/lzm0">程序员</a>一枚
        </li>
        <li>
          有一个
          <a href="https://blog.zimo.li">博客</a>
        </li>
        <li>
          欢迎在
          <a href="https://www.linkedin.com/in/li-zimo/">领英</a>
          上和我打招呼！
        </li>
      </ul>
    </>
  );
}
