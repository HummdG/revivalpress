import { Fragment, type ReactNode } from "react";

// Order matters: compounds before bare terms so the regex alternation
// prefers the longer match at the same position.
const ARABIC_TERMS = [
  "madrasas al-tayyibah",
  "fiqh al-madhdhab",
  "usul al-fiqh",
  "al-tayyibah",
  "Qur'an",
  "Shari'a",
  "Shariah",
  "Sunnah",
  "madrasas",
  "madrasa",
  "ijtihad",
  "maslaha",
  "qadayya",
  "tamudan",
  "siyasa",
  "siyar",
  "hisba",
  "shura",
  "qiyas",
  "ijma",
  "fiqh",
];

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const ARABIC_PATTERN = new RegExp(
  `\\b(${ARABIC_TERMS.map(escapeRegex).join("|")})\\b`,
  "gi",
);

export function italicizeArabic(input: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(ARABIC_PATTERN.source, ARABIC_PATTERN.flags);

  while ((match = re.exec(input)) !== null) {
    if (match.index > lastIndex) {
      parts.push(input.slice(lastIndex, match.index));
    }
    parts.push(
      <em
        key={`${match.index}-${match[0]}`}
        className="italic"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {match[0]}
      </em>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < input.length) {
    parts.push(input.slice(lastIndex));
  }

  if (parts.length === 0) return input;
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </>
  );
}
