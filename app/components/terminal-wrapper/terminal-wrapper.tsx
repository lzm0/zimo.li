"use client";

import { Terminal } from "@xterm/xterm";
import { useRef, useEffect } from "react";
import { AttachAddon } from "@xterm/addon-attach";
import { FitAddon } from "@xterm/addon-fit";
import "../../../node_modules/@xterm/xterm/css/xterm.css";
import { JetBrains_Mono } from "next/font/google";
import React from "react";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "block",
});

export default class TerminalWrapper extends React.Component {
  terminalRef: React.RefObject<HTMLDivElement>;

  terminal: Terminal;

  constructor(props: {}) {
    super(props);
    this.terminalRef = React.createRef();
    this.terminal = new Terminal({
      cursorBlink: true,
      fontSize: 16,
      fontFamily: jetbrainsMono.style.fontFamily,
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
  }

  componentDidMount() {
    const socket = new WebSocket("wss://ca.zimo.li/ws");
    const websocketAddon = new AttachAddon(socket);
    const resizeAddon = new FitAddon();

    this.terminal.loadAddon(websocketAddon);
    this.terminal.loadAddon(resizeAddon);

    this.terminal.open(this.terminalRef.current!);
    this.terminal.focus();

    resizeAddon.fit();
    window.addEventListener("resize", () => resizeAddon.fit());
  }

  componentWillUnmount() {
    this.terminal.dispose();
  }

  render() {
    return (
      <div className="w-full h-96 p-8 bg-[#282a36] border border-gray-700 shadow-lg rounded-xl subpixel-antialiased">
        <div className="w-full h-full" ref={this.terminalRef}></div>
      </div>
    );
  }
}
