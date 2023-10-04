import WavingHand from "./components/waving-hand/waving-hand";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="prose prose-neutral dark:prose-invert">
        <h1 className="font-semibold text-2xl tracking-tight">
          Hi there, I'm Zimo <WavingHand />
        </h1>
        <p>
          I'm a <a href="https://github.com/lzm0">software engineer</a> in
          Toronto. I enjoy bringing simple solution to complex problems while
          learning new things along the way. You can connect with me on{" "}
          <a href="https://www.linkedin.com/in/li-zimo/">LinkedIn</a> if you
          want to get in touch.
        </p>
        <p></p>
        <p>Wanna know more about me? 👇</p>
      </section>
      <div className="w-full"></div>
    </main>
  );
}
