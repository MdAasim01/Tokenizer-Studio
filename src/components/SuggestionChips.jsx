const SAMPLES = [
  "Hello, world! 👋 Let's tokenize this.",
  "Custom tokenizer demo: numbers 1234, punctuation?! and emojis 😄🚀",
  "Whitespace   preserved   between   words.",
  "Special tokens like [BOS] [EOS] remain visible.",
];

export default function SuggestionChips({ onPick }) {
  return (
    <div className="flex flex-wrap gap-2">
      {SAMPLES.map((t, i) => (
        <button
          key={i}
          onClick={() => onPick(t)}
          className="px-3 py-1 rounded-full bg-edge/60 hover:bg-edge text-ink/80 text-sm cursor-pointer"
          title="Use sample text"
        >
          {t.slice(0, 42)}{t.length > 42 ? "…" : ""}
        </button>
      ))}
    </div>
  );
}
