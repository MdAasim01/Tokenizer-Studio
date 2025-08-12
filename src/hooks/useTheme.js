import { useEffect, useState } from "react";

const THEME_KEY = "theme"; // 'light' | 'dark' | 'system'

export function useTheme() {
  const [mode, setMode] = useState(() => localStorage.getItem(THEME_KEY) || "system");

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = (m) => {
      const effectiveDark = m === "dark" || (m === "system" && mq.matches);
      root.classList.toggle("dark", effectiveDark);
    };

    apply(mode);
    localStorage.setItem(THEME_KEY, mode);

    const onChange = () => mode === "system" && apply("system");
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [mode]);

  return { mode, setMode };
}
