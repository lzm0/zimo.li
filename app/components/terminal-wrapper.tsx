"use client";

import { Terminal } from "@xterm/xterm";
import { AttachAddon } from "@xterm/addon-attach";
import { FitAddon } from "@xterm/addon-fit";
import { IBM_Plex_Mono } from "next/font/google";
import { useRef, useEffect, useState } from "react";
import TrafficLight from "./traffic-light";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import "../../node_modules/@xterm/xterm/css/xterm.css";

const mono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export default function TerminalWrapper() {
  const socketRef = useRef<WebSocket | null>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<Terminal>(
    new Terminal({
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
    }),
  );

  const [isOpen, setIsOpen] = useState(true);

  const close = () => {
    terminalRef.current.dispose();
    socketRef.current?.close();
    setIsOpen(false);
  };

  const controls = useDragControls();

  useEffect(() => {
    const socket = new WebSocket("wss://ca.zimo.li/ws");
    socketRef.current = socket;
    const websocketAddon = new AttachAddon(socket);
    const resizeAddon = new FitAddon();

    const terminal = terminalRef.current;
    terminal.loadAddon(websocketAddon);
    terminal.loadAddon(resizeAddon);
    terminal.open(terminalContainerRef.current!);
    terminal.focus();

    resizeAddon.fit();
    window.addEventListener("resize", () => resizeAddon.fit());

    return () => {
      terminal.dispose();
      socket.close();
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          drag
          dragControls={controls}
          dragMomentum={false}
          animate={{
            scale: 1,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { delay: 1, duration: 0.5, ease: "easeOut" },
          }}
          exit={{
            y: -20,
            filter: "blur(10px)",
            opacity: 0,
            transition: { ease: "easeIn", duration: 0.2 },
          }}
          initial={{
            scale: 0.8,
            y: 20,
            opacity: 0,
            filter: "blur(10px)",
          }}
          className="w-full h-96 p-5 pt-12 relative bg-[#282a36] border border-gray-700 shadow-lg rounded-xl subpixel-antialiased"
        >
          <TrafficLight onClose={close} />
          <div className="w-full h-full" ref={terminalContainerRef}></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
