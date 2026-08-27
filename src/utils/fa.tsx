
// utils/fa.ts
const FA = '۰۱۳۴۵۶۷۸۹';
// export const toFa = (v: number | string) => String(v).replace(/\d/g, (d) => FA[+d]);
export const toFa = (v: number | string) =>v// String(v).replace(/\d/g, (d) => FA[+d]);
// export const range = (a: number, b: number) => {
//     const len = b - a
//     var list = []
//     for (let index = 0; index < len; index++) {
//         list.push(index + 1);

//     }
//     return list
// }
export const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];