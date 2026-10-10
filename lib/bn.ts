const BN = "০১২৩৪৫৬৭৮৯";

export const toBn = (input: string | number): string =>
  String(input).replace(/\d/g, (d) => BN[+d]);

export const fromBn = (input: string): string =>
  input.replace(/[০-৯]/g, (d) => String(BN.indexOf(d)));

export const formatBn = (n: number): string =>
  toBn(n.toLocaleString("en-IN"));

export const formatChangeBn = (n: number): string =>
  toBn(Math.abs(n).toFixed(1));

/** 62 -> "৬২", 62.5 -> "৬২.৫০", 62.25 -> "৬২.২৫" */
export const formatBnDecimal = (n: number): string => {
  if (Number.isInteger(n)) return formatBn(n);
  const fixed = n.toFixed(2);
  const [whole, dec] = fixed.split(".");
  return `${toBn(Number(whole).toLocaleString("en-IN"))}.${toBn(dec)}`;
};

/** 2 -> "২", 2.5 -> "২.৫" */
export const formatBnDiff = (n: number): string =>
  toBn(Number.isInteger(n) ? n : n.toFixed(1));

const BN_MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

// বাংলা বার-এর নাম
const BN_DAYS = [
  "রবিবার",      // Sunday (0)
  "সোমবার",      // Monday (1)
  "মঙ্গলবার",    // Tuesday (2)
  "বুধবার",      // Wednesday (3)
  "বৃহস্পতিবার",  // Thursday (4)
  "শুক্রবার",     // Friday (5)
  "শনিবার",      // Saturday (6)
];

/** আজকের তারিখ -> "মঙ্গলবার, ৭ অক্টোবর, ২০২৬" */
export const bnDate = (d: Date = new Date()): string =>
  `${BN_DAYS[d.getDay()]}, ${toBn(d.getDate())} ${BN_MONTHS[d.getMonth()]}, ${toBn(d.getFullYear())}`;

/** "kg" -> "প্রতি কেজি" */
export const unitLabel = (unit: string): string => {
  const map: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    liter: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    gram: "প্রতি গ্রাম",
  };
  return map[unit.toLowerCase()] ?? "প্রতি কেজি";
};

/** "প্রতি কেজি" -> "কেজি" (ticker-এ ছোট রাখতে) */
export const unitShort = (unit: string): string =>
  unitLabel(unit).replace("প্রতি ", "");