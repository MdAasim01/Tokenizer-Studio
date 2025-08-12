import CopyButton from "./CopyButton.jsx";

const KIND_BADGE = {
  word: "bg-teal-100 text-teal-700",
  num: "bg-blue-100 text-blue-700",
  punct: "bg-purple-100 text-purple-700",
  space: "bg-zinc-100 text-zinc-600",
  special: "bg-amber-100 text-amber-700",
};

export default function MappingTable({
  words,
  onHoverIndex,
  pinnedIndex,
  setPinnedIndex,
}) {
  return (
    <div className="border border-edge rounded-xl bg-panel">
      <div className="px-4 py-3 border-b border-edge flex items-center justify-between">
        <div className="font-semibold text-ink">Token ↦ ID Mapping</div>
        <button
          className="text-xs px-2 py-1 border rounded-md hover:bg-edge cursor-pointer"
          onClick={() => setPinnedIndex(null)}
          disabled={pinnedIndex == null}
        >
          Unpin
        </button>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-edge/50">
            <tr>
              <th className="text-left p-3 w-10">#</th>
              <th className="text-left p-3">Token</th>
              <th className="text-left p-3">Kind</th>
              <th className="text-left p-3">Octal Triplets</th>
              <th className="text-left p-3">Word Octal</th>
              <th className="text-left p-3">IDs</th>
              <th className="text-left p-3">Copy</th>
            </tr>
          </thead>
          <tbody>
            {words.map((w) => {
              const isPinned = pinnedIndex === w.index;
              return (
                <tr
                  key={w.index}
                  className={`border-t border-edge hover:bg-edge/30 ${isPinned ? "bg-amber-50" : ""}`}
                  onMouseEnter={() => onHoverIndex?.(w.index)}
                  onMouseLeave={() => onHoverIndex?.(null)}
                  onClick={() => setPinnedIndex(isPinned ? null : w.index)}
                >
                  <td className="p-3 text-zinc-500">{w.index + 1}</td>
                  <td className="p-3 font-mono">{w.raw === "" ? "␠(space)" : w.raw}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-md text-xs ${KIND_BADGE[w.kind] || "bg-zinc-100"}`}>
                      {w.kind}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-xs break-words">
                    {w.octTriplets.join(" ")}
                  </td>
                  <td className="p-3 font-mono text-xs">{w.octWord || "—"}</td>
                  <td className="p-3 font-mono">{w.ids.join(", ") || "—"}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <CopyButton payload={w.octWord} label="Octal" />
                      <CopyButton payload={w.ids.join(", ")} label="IDs" />
                    </div>
                  </td>
                </tr>
              );
            })}
            {words.length === 0 && (
              <tr><td className="p-6 text-center text-zinc-500" colSpan={7}>No tokens yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
