import { useEffect, useMemo, useState } from "react";
import SuggestionChips from "./components/SuggestionChips.jsx";
import CopyButton from "./components/CopyButton.jsx";
import MappingTable from "./components/MappingTable.jsx";
import SequencePanel from "./components/SequencePanel.jsx";
import VizPanel from "./components/VizPanel.jsx";
import DecoderPanel from "./components/DecoderPanel.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { encodeDetailed, stringToToken } from "./utils/tokenizer.js";
import GithubButton from "./components/GithubButton.jsx";

function useDebounced(value, ms = 200) {
	const [v, setV] = useState(value);
	useEffect(() => {
		const t = setTimeout(() => setV(value), ms);
		return () => clearTimeout(t);
	}, [value, ms]);
	return v;
}

export default function App() {
	const [text, setText] = useState(() => {
		const url = new URL(location.href);
		return url.searchParams.get("q") || "";
	});
	const [copiedBanner, setCopiedBanner] = useState("");

	const debText = useDebounced(text, 120);
	const encoded = useMemo(() => encodeDetailed(debText), [debText]);

	const [hoverIndex, setHoverIndex] = useState(null);
	const [pinnedIndex, setPinnedIndex] = useState(null);

	const [idsQuery, setIdsQuery] = useState(() => {
		const url = new URL(location.href);
		return url.searchParams.get("ids") || "";
	});

	useEffect(() => {
		const url = new URL(location.href);
		if (text) url.searchParams.set("q", text);
		else url.searchParams.delete("q");
		if (idsQuery) url.searchParams.set("ids", idsQuery);
		else url.searchParams.delete("ids");
		history.replaceState(null, "", url.toString());
	}, [text, idsQuery]);

	useEffect(() => {
		if (!copiedBanner) return;
		const t = setTimeout(() => setCopiedBanner(""), 1200);
		return () => clearTimeout(t);
	}, [copiedBanner]);

	const octalString = encoded.octalString;
	const idsArrayString = `[${encoded.sequence.join(", ")}]`;

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-white text-ink dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
			<header className="border-b border-edge bg-white dark:bg-slate-900 dark:border-slate-700 sticky top-0 z-10">
				<div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
					<h1 className="text-xl font-extrabold tracking-tight dark:text-slate-100">
						Tokenizer <span className="text-accent">Studio</span>
					</h1>
					<div className="flex items-center gap-3">
						<div className="text-xs text-zinc-500 dark:text-slate-300">
							{encoded.stats.ids} IDs • {encoded.stats.words}{" "}
							tokens • {encoded.stats.chars} chars
						</div>
						{/* <ThemeToggle /> */}
						<GithubButton url="https://github.com/MdAasim01/Tokenizer-Studio.git" />
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-5 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
				<section className="space-y-4">
					<div className="border border-edge rounded-xl bg-panel">
						<div className="p-4 border-b border-edge">
							<div className="text-sm text-zinc-600 dark:text-slate-300 mb-2">
								Suggestions
							</div>
							<SuggestionChips onPick={(t) => setText(t)} />
						</div>

						<div className="p-4">
							<label
								htmlFor="text"
								className="text-zinc-600 dark:text-slate-300"
							>
								Text Input
							</label>
							<textarea
								id="text"
								className="mt-2 w-full h-40 rounded-xl p-3 font-mono bg-white border border-edge dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent"
								value={text}
								onChange={(e) => setText(e.target.value)}
								placeholder="Type or paste text…"
							/>
							<div className="mt-3 flex items-center gap-2">
								<CopyButton
									payload={text}
									label="Copy Original"
									onCopied={() =>
										setCopiedBanner("Original copied")
									}
								/>
								<button
									className="text-sm px-3 py-1 rounded-lg border border-edge hover:bg-edge/40 cursor-pointer"
									onClick={() => {
										setText("");
										setPinnedIndex(null);
										setHoverIndex(null);
									}}
								>
									Clear
								</button>
							</div>
						</div>
					</div>

					<SequencePanel
						sequence={encoded.sequence}
						onCopied={() => setCopiedBanner("IDs copied")}
					/>
				</section>

				<section className="space-y-4">
					<VizPanel
						words={encoded.words}
						hoverIndex={hoverIndex}
						setHoverIndex={setHoverIndex}
						pinnedIndex={pinnedIndex}
						setPinnedIndex={setPinnedIndex}
					/>

					<DecoderPanel
						idsQuery={idsQuery}
						setIdsQuery={setIdsQuery}
						onReset={() => setIdsQuery("")}
					/>
				</section>
			</div>
			<div className="max-w-7xl mx-auto px-5 py-6">
				<section className="space-y-3">
					<MappingTable
						words={encoded.words}
						onHoverIndex={setHoverIndex}
						pinnedIndex={pinnedIndex}
						setPinnedIndex={setPinnedIndex}
					/>
				</section>
			</div>

			{copiedBanner && (
				<div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-ink bg-slate-600 text-white text-sm px-4 py-2 rounded-full shadow-lg">
					{copiedBanner}
				</div>
			)}
		</div>
	);
}
