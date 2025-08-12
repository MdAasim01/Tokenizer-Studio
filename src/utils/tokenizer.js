

function pad3(n) {
  return n.toString(8).padStart(3, "0");
}
function isDigit(ch) { return ch >= "0" && ch <= "9"; }
function isWhitespace(ch) { return /\s/.test(ch); }
function isLetter(ch) { return /[A-Za-z]/.test(ch); }
function kindOfToken(raw) {
  if (raw === " ") return "space";
  if (/^\s+$/.test(raw)) return "space";
  if (/^[0-9]+$/.test(raw)) return "num";
  if (/^[\p{P}\p{S}]+$/u.test(raw)) return "punct";
  if (/^\[[A-Z]+\]$/.test(raw)) return "special";
  if (/^[A-Za-z]+$/.test(raw)) return "word";
  return "word";
}

export function stringToToken(input) {
  if (!input || !input.length) return "";
  const words = input.split(" ");
  const out = [];
  for (const w of words) {
    let acc = "";
    for (let i = 0; i < w.length; i++) {
      const id = w.charCodeAt(i) + 64;
      acc += pad3(id);
    }
    out.push(acc);
  }
  return out.join(" ");
}

export function tokenToString(token) {
  if (!token || !token.length) return "";
  const words = token.trim().split(/\s+/);
  const out = [];
  for (const w of words) {
    let acc = "";
    for (let i = 0; i < w.length; i += 3) {
      const oct3 = w.slice(i, i + 3);
      if (!oct3) continue;
      const v = parseInt(oct3, 8);
      if (Number.isNaN(v)) continue;
      acc += String.fromCharCode(v - 64);
    }
    out.push(acc);
  }
  return out.join(" ");
}

export function encodeDetailed(text) {
  const words = [];
  const sequence = [];

  const rawTokens = text.split(/(\s+)/);
  let cursor = 0;

  rawTokens.forEach((raw, wi) => {
		const start = cursor;
		const end = cursor + raw.length;
		const kind = kindOfToken(raw);

		const chars = raw.split("");
		const ids = [];
		const octTriplets = [];

		for (let i = 0; i < chars.length; i++) {
			const id = chars[i].charCodeAt(0) + 64;
			ids.push(id);
			sequence.push(id);
			octTriplets.push(pad3(id));
		}

		words.push({
			index: wi,
			raw,
			chars,
			ids,
			octTriplets,
			octWord: octTriplets.join(""),
			start,
			end,
			kind,
		});

		cursor = end;
  });

  const octalString = words.map((w) => w.octWord).join("");
  const stats = {
		chars: text.length,
		words: rawTokens.length,
		ids: sequence.length,
  };

  return { words, sequence, octalString, stats };
}


export function normalizeIdsInput(s) {
  if (!s) return [];
  try {
    const maybe = JSON.parse(s);
    if (Array.isArray(maybe)) {
      return maybe.map(n => parseInt(n, 10)).filter(n => Number.isFinite(n));
    }
  } catch (_) {}
  return s
    .replace(/[\[\]]/g, " ")
    .split(/[\s,]+/)
    .map(x => parseInt(x, 10))
    .filter(n => Number.isFinite(n));
}

export function decodeIdsToString(ids) {
  let out = "";
  for (const n of ids) out += String.fromCharCode(n - 64);
  return out;
}
