import { useTheme } from "../hooks/useTheme.js";

const labels = { light: "Light", dark: "Dark", system: "System" };
const next = { light: "dark", dark: "system", system: "light" };

export default function ThemeToggle() {
  const { mode, setMode } = useTheme();
  return (
    <button
      className="text-sm px-3 py-1 rounded-lg border border-edge hover:bg-edge/40
                 dark:hover:bg-slate-700 dark:border-slate-700 cursor-pointer"
      onClick={() => setMode(next[mode] || "system")}
      title="Toggle theme"
    >
      {labels[mode]} ▸ {labels[next[mode]]}
    </button>
  );
}
