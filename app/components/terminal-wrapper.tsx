"use client";

import { Terminal } from "@xterm/xterm";
import { AttachAddon } from "@xterm/addon-attach";
import { FitAddon } from "@xterm/addon-fit";
import { IBM_Plex_Mono } from "next/font/google";
import { useRef, useEffect, useState } from "react";
import TrafficLight from "./traffic-light";
import { motion, useDragControls } from "framer-motion";
import "../../node_modules/@xterm/xterm/css/xterm.css";

const mono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export default function TerminalWrapper() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

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

  let socket: WebSocket | null = null;

  const close = () => {
    terminal.dispose();
    socket?.close();
    setIsOpen(false);
  };

  const controls = useDragControls();

  useEffect(() => {
    socket = new WebSocket("wss://ca.zimo.li/ws");
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

  return isOpen ? (
    <motion.div
      drag
      dragControls={controls}
      dragMomentum={false}
      transition={{ delay: 0.5 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      initial={{ scale: 0, y: 100, opacity: 0 }}
      className="w-full h-96 p-5 pt-12 relative bg-[#282a36] border border-gray-700 shadow-lg rounded-xl subpixel-antialiased"
    >
      <TrafficLight onClose={close} />
      <div className="w-full h-full" ref={terminalRef}></div>
    </motion.div>
  ) : (
    <></>
  );
}
