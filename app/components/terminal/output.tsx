export default function Output({
  command,
  clearHistory,
}: {
  command: string;
  clearHistory: () => void;
}) {
  const files: Record<string, string> = {
    "README.md":
      "# You found a secret!\n\nThis is a hidden file that only programmers can see. 😉",
  };

  const commands: Record<string, (argv: string[]) => string> = {
    echo: (argv: string[]) =>
      argv
        .slice(1)
        .map((str) => str.replaceAll(/(^")|("$)/g, ""))
        .join(" "),

    whoami: () => "guest",

    clear: () => {
      clearHistory();
      return "";
    },

    ls: () => Object.keys(files).sort().join(" "),

    cat: (argv: string[]) => {
      if (argv.length < 2) return "usage: cat <file>";
      let stdout = "";
      for (let i = 1; i < argv.length; i++) {
        const file = argv[i];
        if (Object.keys(files).includes(file)) {
          stdout += files[file];
        } else {
          stdout += `cat: ${file}: No such file or directory\n`;
        }
      }
      return stdout;
    },
  };

  const run = (command: string) => {
    const argv = command.trim().split(" ");
    const program = argv[0];
    if (program === "") return "";
    if (program === "help")
      return `Available commands: ${Object.keys(commands).sort().join(", ")}`;
    if (Object.keys(commands).includes(argv[0])) return commands[program](argv);
    return `command not found: ${program}`;
  };

  return <div>{run(command)}</div>;
}
