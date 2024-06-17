"use client";

import { Terminal } from "@xterm/xterm";
import { AttachAddon } from "@xterm/addon-attach";
import { FitAddon } from "@xterm/addon-fit";
import "../../node_modules/@xterm/xterm/css/xterm.css";
import { IBM_Plex_Mono } from "next/font/google";
import { useRef, useEffect, RefObject, useState } from "react";
import TrafficLight from "./traffic-light";
import { motion, useDragControls } from "framer-motion";

const mono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export default function TerminalWrapper() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const terminal = new Terminal({
    cursorBlink: true,
    fontSize: 14,
    fontFamily: mono.style.fontFamily,
    theme: {
      background: "#282a36",
      black: "#21222c",
      blue: "#bd93f9",
      brightBlack: "#6272a4",
      brightBlue: "#d6acff",
      brightCyan: "#a4ffff",
      brightGreen: "#69ff94",
      brightMagenta: "#ff92df",
      brightRed: "#ff6e6e",
      brightWhite: "#ffffff",
      brightYellow: "#ffffa5",
      cursor: "#ff79c6",
      cyan: "#8be9fd",
      foreground: "#f8f8f2",
      green: "#50fa7b",
      magenta: "#ff79c6",
      red: "#ff5555",
      white: "#f8f8f2",
      yellow: "#f1fa8c",
    },
  });

  const controls = useDragControls();

  useEffect(() => {
    const socket = new WebSocket("wss://ca.zimo.li/ws");
    const websocketAddon = new AttachAddon(socket);
    const resizeAddon = new FitAddon();

    terminal.loadAddon(websocketAddon);
    terminal.loadAddon(resizeAddon);

    terminal.open(terminalRef.current!);
    terminal.focus();

    resizeAddon.fit();
    window.addEventListener("resize", () => resizeAddon.fit());

    return () => {
      terminal.dispose();
    };
  }, []);

  return (
    <>
      <div ref={constraintsRef} className="invisible absolute inset-1" />
      <motion.div
        drag
        dragControls={controls}
        dragConstraints={constraintsRef}
        transition={{ stiffness: 100, delay: 0.5 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        initial={{ scale: 0, y: 100, opacity: 0 }}
        className="w-full h-96 p-5 pt-12 relative bg-[#282a36] border border-gray-700 shadow-lg rounded-xl subpixel-antialiased"
      >
        <TrafficLight />
        <div className="w-full h-full" ref={terminalRef}></div>
      </motion.div>
    </>
  );
}
