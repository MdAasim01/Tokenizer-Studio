import CopyButton from "./CopyButton.jsx";

export default function SequencePanel({ sequence, onCopied }) {
  const asArray = `[${sequence.join(", ")}]`;
  const asCsv = sequence.join(",");

  return (
    <div className="border border-edge rounded-xl bg-panel dark:bg-slate-800 dark:border-slate-700">
      <div className="px-4 py-3 border-b border-edge flex items-center justify-between">
        <div className="font-semibold text-ink">Encoded Sequence</div>
        <div className="flex gap-2">
          <CopyButton payload={asArray} label="Copy Array" onCopied={onCopied} />
          <CopyButton payload={asCsv} label="Copy CSV" onCopied={onCopied} />
        </div>
      </div>
      <div className="p-4">
        <pre className="text-sm font-mono whitespace-pre-wrap">{asArray}</pre>
      </div>
    </div>
  );
}
