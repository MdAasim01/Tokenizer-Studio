export default function CopyButton({ payload, label = "Copy", onCopied }) {
  const disabled = !payload || (typeof payload === "string" && payload.length === 0);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        typeof payload === "string" ? payload : JSON.stringify(payload)
      );
      onCopied?.();
    } catch {
      alert("Copy failed.");
    }
  };

  return (
    <button
      className="text-sm px-3 py-1 rounded-lg border border-edge hover:bg-edge/40 disabled:opacity-40 cursor-pointer"
      onClick={doCopy}
      disabled={disabled}
      aria-label={label}
      title={label}
    >
      {label}
    </button>
  );
}
