import { decodeIdsToString, normalizeIdsInput } from "../utils/tokenizer.js";
import CopyButton from "./CopyButton.jsx";

export default function DecoderPanel({ idsQuery, setIdsQuery, onReset }) {
  const ids = normalizeIdsInput(idsQuery);
  const decoded = ids.length ? decodeIdsToString(ids) : "";

  return (
    <div className="border border-edge rounded-xl bg-panel">
      <div className="px-4 py-3 border-b border-edge flex items-center justify-between">
        <div className="font-semibold text-ink">Token Decoding</div>
        <div className="flex gap-2">
          <CopyButton payload={decoded} label="Copy Text" />
          <button
            className="text-sm px-3 py-1 rounded-lg border border-edge hover:bg-edge/40 cursor-pointer"
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="p-4 grid gap-3">
        <label className="text-sm text-zinc-600">Enter IDs (CSV, space-separated, or JSON array)</label>
        <textarea
          className="w-full h-28 bg-white border border-edge rounded-xl p-3 font-mono focus:outline-none focus:ring-2 focus:ring-accent"
          value={idsQuery}
          onChange={(e) => setIdsQuery(e.target.value)}
          placeholder='Example: 158, 5, 199, 83 or [158,5,199,83]'
        />
        <div>
          <div className="text-xs text-zinc-500 mb-1">Decoded Text</div>
          <div className="min-h-[2rem] font-mono bg-white border border-edge rounded-xl p-3">
            {decoded || <span className="text-zinc-400">—</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
