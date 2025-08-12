const KIND_STYLE = {
	word: "bg-teal-100 text-teal-800 border-teal-300",
	num: "bg-blue-100 text-blue-800 border-blue-300",
	punct: "bg-purple-100 text-purple-800 border-purple-300",
	space: "bg-white text-zinc-600 border-zinc-300",
	special: "bg-amber-100 text-amber-800 border-amber-300",
};

export default function VizPanel({
	words,
	hoverIndex,
	setHoverIndex,
	pinnedIndex,
	setPinnedIndex,
}) {
	return (
		<div className="border border-edge rounded-xl bg-panel dark:bg-slate-800 dark:border-slate-700">
			<div className="px-4 py-3 border-b border-edge flex items-center justify-between">
				<div className="font-semibold text-ink">
					Token Visualization
				</div>
				<div className="text-xs text-zinc-600 dark:text-slate-300">
					Hover to preview • Click to pin
				</div>
			</div>
			<div className="p-4 flex flex-wrap gap-2">
				{words.map((w) => {
					const isHover = hoverIndex === w.index;
					const isPinned = pinnedIndex === w.index;
					const cl =
						`px-2 py-1 border rounded-full text-sm font-medium cursor-pointer ` +
						`${
							KIND_STYLE[w.kind] || "bg-zinc-100 border-zinc-300"
						} ` +
						`${
							isPinned
								? "ring-2 ring-warn"
								: isHover
								? "ring-2 ring-accent2"
								: ""
						}`;

					const label = w.raw === "" ? "␠" : w.raw;
					return (
						<button
							key={w.index}
							className={cl}
							onMouseEnter={() => setHoverIndex(w.index)}
							onMouseLeave={() => setHoverIndex(null)}
							onClick={() =>
								setPinnedIndex(isPinned ? null : w.index)
							}
							title={`${w.kind} • IDs: ${w.ids.join(", ")}`}
						>
							{label}
						</button>
					);
				})}
				{words.length === 0 && (
					<div className="text-zinc-600 dark:text-slate-300 text-sm">
						Nothing to visualize.
					</div>
				)}
			</div>

			<div className="px-4 pb-4">
				<div className="flex items-center gap-3 text-xs">
					<Legend color="bg-teal-400" label="Words" />
					<Legend color="bg-blue-400" label="Numbers" />
					<Legend color="bg-purple-400" label="Punctuation" />
					<Legend color="bg-amber-400" label="Special" />
					<Legend color="bg-white" label="Whitespace" />
				</div>
			</div>
		</div>
	);
}

function Legend({ color, label }) {
	return (
		<span className="inline-flex items-center gap-1 text-zinc-600 dark:text-slate-300">
			<span className={`w-2.5 h-2.5 rounded-full ${color}`} />
			{label}
		</span>
	);
}
