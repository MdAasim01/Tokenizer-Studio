import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(
		() => localStorage.getItem("theme") === "dark"
	);

	useEffect(() => {
		const root = document.documentElement;
		if (isDark) {
			root.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			root.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDark]);

	return (
		<button
			className="text-sm px-3 py-1 rounded-lg border border-edge hover:bg-edge/40 dark:hover:bg-slate-700 dark:border-slate-700 cursor-pointer"
			onClick={() => setIsDark((v) => !v)}
			title="Toggle dark mode"
		>
			{isDark ? "Light" : "Dark"}
		</button>
	);
}
