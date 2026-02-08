import { toEnglishNumber } from './persianNumbers';

export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
export const IRAN_MOBILE_REGEX = /^(\+?98|0)9\d{9}$/;

export function validateEmail(value) {
  if (!value || !value.trim()) return null;
  return EMAIL_REGEX.test(value.trim()) ? null : 'ایمیل معتبر نیست';
}

export function validatePhone(value) {
  if (!value || !value.trim()) return null;
  const normalized = value.trim().replace(/\s/g, '');
  return IRAN_MOBILE_REGEX.test(normalized)
    ? null
    : 'شماره موبایل معتبر نیست (مثال: ۰۹۱۲۱۲۳۴۵۶۷)';
}

export function validateName(value) {
  const trimmed = (value || '').trim();
  if (!trimmed) return 'نام الزامی است';
  return null;
}
