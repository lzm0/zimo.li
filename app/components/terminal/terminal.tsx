"use client";

import { useState, useRef } from "react";
import Output from "./output";

function Prompt() {
  return (
    <span className="break-keep">
      <label htmlFor="command">
        <span className="text-green-500 font-bold">guest@zimo.li</span>
        <span className="font-bold">:</span>
        <span className="text-violet-500 font-bold">~</span>
        <span>$</span>
      </label>
      <span>&nbsp;</span>
    </span>
  );
}

export default function Terminal() {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState("");
  const [pointer, setPointer] = useState(0);

  const clearHistory = () => {
    setHistory([]);
    setPointer(0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHistory([...history, command]);
    setCommand("");
    setPointer(history.length + 1);
    inputRef.current?.scrollIntoView();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // SIGINT
    if (e.key === "c" && e.ctrlKey) {
      setHistory([...history, "^C"]);
      setCommand("");
      setPointer(history.length + 1);
      return;
    }

    // Clear command history
    if (e.key === "k" && e.metaKey) {
      clearHistory();
      return;
    }

    // Navigate command history
    if (e.key === "ArrowUp") {
      if (pointer === 0) return;
      setPointer(pointer - 1);
      setCommand(history[pointer - 1]);
    }
    if (e.key === "ArrowDown") {
      if (pointer === history.length) return;
      if (pointer === history.length - 1) {
        setPointer(history.length);
        setCommand("");
        return;
      }
      setPointer(pointer + 1);
      setCommand(history[pointer + 1]);
    }
  };

  return (
    <pre
      className="flex-1 w-full font-mono pb-[50vh] whitespace-pre-wrap overflow-clip"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((command, index) => (
        <div key={index}>
          <Prompt />
          <span>{command}</span>
          <br />
          <Output command={command} clearHistory={clearHistory} />
        </div>
      ))}
      <form onSubmit={handleSubmit} ref={formRef} className="flex">
        <Prompt />
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={command}
          ref={inputRef}
          id="command"
          type="text"
          className="flex-1 caret-neutral-500 bg-transparent outline-none"
          autoFocus
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="off"
        />
      </form>
    </pre>
  );
}
