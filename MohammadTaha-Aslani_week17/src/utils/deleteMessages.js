import { toPersianNumber } from './persianNumbers';

export function deleteManyMessage(count) {
  return count === 1
    ? '۱ مخاطب حذف شد'
    : `${toPersianNumber(count)} مخاطب حذف شدند`;
}

export const deleteOneMessage = '۱ مخاطب حذف شد';
