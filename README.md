# Tokenizer Studio

Tokenizer Studio is an interactive web application that converts text into token sequences and decodes tokens back into text.  
It’s designed for exploration, learning, and debugging tokenization logic, with real-time visualizations, mapping tables, and decoding tools.

---

## 🚀 Tech Stack

- **React** — UI development
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first styling
- **JavaScript (ESNext)** — Pure JS implementation (no external tokenization libs)
- **Deployed on** Vercel

---

## ✨ Features

### 🔄 Encoding
- Convert plain text into tokenized output in real time.
- Preserve whitespace and special characters.
- Supports ASCII → `(charCode + 64)` → **octal triplets** conversion.
- Encoded **ID sequence** view (array or CSV) with one-click copy.

### 🗺 Token Mapping
- Detailed per-token mapping table:
  - Original token text
  - Token kind (word, punctuation, number, space, special)
  - Per-character octal triplets
  - Full token octal string
  - Numeric IDs (base 10)
- Per-row copy buttons for **octal** and **IDs**.

### 🎨 Token Visualization
- Color-coded token chips by type.
- Hover to highlight mapping table rows.
- Click to pin specific tokens for closer inspection.
- Legend for token type colors.

### 📥 Decoding
- Input token IDs in CSV, space-separated, or JSON array formats.
- Live decoded text preview.
- One-click copy of decoded text.
- Preserves spaces and special characters in output.

### 💡 UI/UX Enhancements
- Dark/Light/System theme toggle with persistence.
- Suggestion chips for quick sample inputs.
- Copy-to-clipboard buttons with pointer cursor and feedback.
- Responsive two-pane layout for desktop and mobile.

---

## 🧭 Navigation

**Left Panel – Composer**
- **Suggestions** — Click a chip to load sample text.
- **Text Input** — Type or paste your own text.
- **Copy Original** — Copies current text.
- **Clear** — Resets all inputs.
- **Encoded Sequence** — View full token ID array or CSV.

**Right Panel – Inspector**
1. **Token Mapping** — See how each token maps to IDs & octals.
2. **Token Visualization** — Interactive chip view of tokens.
3. **Token Decoding** — Paste IDs to decode back to text.

---

## 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/MdAasim01/Tokenizer-Studio.git
cd tokenizer-studio

# Install dependencies
npm install

# Start development server
npm run dev
