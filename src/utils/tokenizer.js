function pad3(n) {
	return n.toString(8).padStart(3, "0");
}

const RE_LETTER = /\p{L}/u;
const RE_MARK = /\p{M}/u;
const RE_DIGIT = /\p{N}/u;
const RE_WS = /\s/u;
const RE_PUNCS = /[\p{P}\p{S}]/u;
const RE_SPECIAL = /^\[[A-Z]+\]/;

function tokenize(text) {
	const toks = [];
	let i = 0;
	while (i < text.length) {
		if (text[i] === "[") {
			const m = text.slice(i).match(RE_SPECIAL);
			if (m) {
				toks.push({ raw: m[0], kind: "special" });
				i += m[0].length;
				continue;
			}
		}
		const cp = text.codePointAt(i);
		const ch = String.fromCodePoint(cp);
		if (RE_WS.test(ch)) {
			const start = i;
			i += ch.length;
			while (i < text.length) {
				const cp2 = text.codePointAt(i);
				const ch2 = String.fromCodePoint(cp2);
				if (!RE_WS.test(ch2)) break;
				i += ch2.length;
			}
			toks.push({ raw: text.slice(start, i), kind: "space" });
			continue;
		}
		if (RE_LETTER.test(ch)) {
			const start = i;
			i += ch.length;
			while (i < text.length) {
				const cp2 = text.codePointAt(i);
				const ch2 = String.fromCodePoint(cp2);
				if (
					RE_LETTER.test(ch2) ||
					RE_MARK.test(ch2) ||
					ch2 === "'" ||
					ch2 === "’"
				) {
					i += ch2.length;
				} else break;
			}
			toks.push({ raw: text.slice(start, i), kind: "word" });
			continue;
		}
		if (RE_DIGIT.test(ch)) {
			const start = i;
			i += ch.length;
			while (i < text.length) {
				const cp2 = text.codePointAt(i);
				const ch2 = String.fromCodePoint(cp2);
				if (RE_DIGIT.test(ch2)) i += ch2.length;
				else break;
			}
			toks.push({ raw: text.slice(start, i), kind: "num" });
			continue;
		}
		if (RE_PUNCS.test(ch)) {
			toks.push({ raw: ch, kind: "punct" });
			i += ch.length;
			continue;
		}
		toks.push({ raw: ch, kind: "word" });
		i += ch.length;
	}
	return toks;
}

export function stringToToken(input) {
	if (!input || !input.length) return "";
	const toks = tokenize(input);
	const out = [];
	for (const t of toks) {
		let acc = "";
		for (const ch of Array.from(t.raw)) {
			const id = ch.codePointAt(0) + 64;
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
	const tokens = tokenize(text);
	const words = [];
	const sequence = [];
	let cursor = 0;
	for (let wi = 0; wi < tokens.length; wi++) {
		const tok = tokens[wi];
		const start = text.indexOf(tok.raw, cursor);
		const end = start + tok.raw.length;
		cursor = end;
		const chars = Array.from(tok.raw);
		const ids = [];
		const octTriplets = [];
		for (const ch of chars) {
			const id = ch.codePointAt(0) + 64;
			ids.push(id);
			sequence.push(id);
			octTriplets.push(pad3(id));
		}
		words.push({
			index: wi,
			raw: tok.raw,
			chars,
			ids,
			octTriplets,
			octWord: octTriplets.join(""),
			start,
			end,
			kind: tok.kind,
		});
	}
	const octalString = words.map((w) => w.octWord).join(" ");
	const stats = {
		chars: text.length,
		words: tokens.length,
		ids: sequence.length,
	};
	return { words, sequence, octalString, stats };
}

export function normalizeIdsInput(s) {
	if (!s) return [];
	try {
		const maybe = JSON.parse(s);
		if (Array.isArray(maybe)) {
			return maybe
				.map((n) => parseInt(n, 10))
				.filter((n) => Number.isFinite(n));
		}
	} catch (_) {}
	return s
		.replace(/[\[\]]/g, " ")
		.split(/[\s,]+/)
		.map((x) => parseInt(x, 10))
		.filter((n) => Number.isFinite(n));
}

export function decodeIdsToString(ids) {
	let out = "";
	for (const n of ids) {
		const cp = n - 64;
		if (Number.isFinite(cp) && cp >= 0) {
			out += String.fromCodePoint(cp);
		}
	}
	return out;
}
