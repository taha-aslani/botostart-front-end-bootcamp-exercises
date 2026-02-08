const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const PERSIAN_TO_ENGLISH = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
};

export function toPersianNumber(num) {
  if (num == null || num === '') return '';
  const str = String(num);
  return str.replace(/\d/g, (d) => PERSIAN_DIGITS[parseInt(d, 10)]);
}

export function toEnglishNumber(str) {
  if (str == null || str === '') return '';
  const s = String(str);
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
  return s
    .replace(/[۰-۹]/g, (c) => PERSIAN_TO_ENGLISH[c] ?? c)
    .replace(/[٠-٩]/g, (c) => String(arabicDigits.indexOf(c)));
}
