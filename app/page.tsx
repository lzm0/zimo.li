import { headers } from "next/headers";
import WavingHand from "./components/waving-hand/waving-hand";

export default function Home() {
  const lang =
    headers().get("accept-language")?.split(",")[0].split("-")[0] === "zh"
      ? "zh"
      : "en";

  return (
    <main className="flex flex-col min-h-screen">
      <section className="prose prose-neutral dark:prose-invert">
        {lang === "en" ? <English /> : <Chinese />}
      </section>
      <div className="w-full"></div>
    </main>
  );
}

function English() {
  return (
    <>
      <h1 className="font-semibold text-2xl tracking-tight">
        Hi there, I'm Zimo <WavingHand />
      </h1>
      <p>
        I'm a <a href="https://github.com/lzm0">software engineer</a> based in
        Toronto. I specialize in unraveling complex problems through simple,
        elegant solutions, all the while embracing continuous learning. Find me
        on <a href="https://www.linkedin.com/in/li-zimo/">LinkedIn</a> if you
        want to get in touch.
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
