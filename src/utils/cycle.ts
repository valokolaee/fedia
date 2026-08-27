// import { j2g, g2j } from 'jalaali-js';
import { toGregorian ,toJalaali} from 'jalaali-js';

import { MONTHS, toFa } from './fa';

export const jalaliToJs = (jy: number, jm: number, jd: number) => {
  const g = toGregorian(jy, jm, jd);
  // const { gy, gm, gd } = toGregorian(1402, 2, 6);

  return new Date(g.gy, g.gm - 1, g.gd);
};
export const jsToJalali = (d: Date) => toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
export const daysBetween = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / 86400000);
export const addDays = (d: Date, n: number) => { const c = new Date(d); c.setDate(c.getDate() + n); return c; };

export const WEEKDAYS = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
export const faDate = (d: Date) => { const j = jsToJalali(d); return `${WEEKDAYS[d.getDay()]} ${toFa(j.jd)} ${MONTHS[j.jm - 1]}`; };
export const faDateShort = (d: Date) => { const j = jsToJalali(d); return `${toFa(j.jd)} ${MONTHS[j.jm - 1]}`; };

// phase of day-index i inside a cycle
export const phaseOf = (i: number, cycleLength: number, periodLength: number) => {
  const ov = cycleLength - 14;
  if (i < periodLength) return 'period';
  if (i >= ov - 1 && i <= ov + 2) return 'ovulation';
  if (i >= cycleLength - 5) return 'pms';
  return 'normal';
};