import WavingHand from "./components/waving-hand/waving-hand";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="prose prose-neutral dark:prose-invert">
        <h1 className="font-semibold text-2xl tracking-tighter">
          Hi there, I'm Zimo <WavingHand />
        </h1>
        <p>I'm a software engineer in Toronto. Wanna know more about me? 👇</p>
      </section>
    </main>
  );
}
