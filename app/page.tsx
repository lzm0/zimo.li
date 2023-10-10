import { cookies, headers } from "next/headers";
import WavingHand from "./components/waving-hand/waving-hand";
import LanguageToggle from "./components/language-toggle/language-toggle";
import Terminal from "./components/terminal/Terminal";

export default function Home() {
  const lang = getLanguage();

  return (
    <main className="flex flex-col min-h-screen antialiased max-w-2xl my-20 mx-6 md:mx-auto">
      <LanguageToggle lang={lang} />
      <section className="prose prose-neutral dark:prose-invert my-20">
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
      <h1 className="font-semibold text-2xl tracking-tight">
        Hi there, I'm Zimo <WavingHand />
      </h1>
      <p>
        I'm a <a href="https://github.com/lzm0">software engineer</a> based in
        Toronto. I enjoy solving complex problems through simple, elegant
        solutions while learning new things along the way. Find me on{" "}
        <a href="https://www.linkedin.com/in/li-zimo/">LinkedIn</a> if you want
        to get in touch.
      </p>
      <p>If you would like know more about me, 👇</p>
    </>
  );
}

function Chinese() {
  return (
    <>
      <h1 className="font-semibold text-2xl tracking-tight">
        你好，我是子沫 <WavingHand />
      </h1>
      <p>
        我是一名在多伦多的<a href="https://github.com/lzm0">软件工程师</a>
        。欢迎通过
        <a href="https://www.linkedin.com/in/li-zimo/">领英</a>
        联系我。
      </p>
      <p>如果您想了解更多关于我，👇</p>
    </>
  );
}
