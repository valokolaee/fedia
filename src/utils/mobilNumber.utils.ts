/**
 * اعتبارسنجی شماره موبایل ایرانی
 * فرمت‌های قابل قبول:
 *  09123456789
 *  9123456789
 *  +989123456789
 *  00989123456789
 *  با فاصله یا خط تیره هم کار می‌کند (0912-345-6789)
 */
export function isValidIranianMobile(phone: string): boolean {
    if (!phone) return false;

    // حذف فاصله‌ها، خط تیره‌ها و پرانتزها
    const cleaned = phone.replace(/[\s\-()]/g, '');

    // الگوی نهایی: با/بدون پیش‌شماره‌های 0098 یا +98 یا 0، و کد اپراتور 9xx
    const pattern = /^(?:0098|\+98|98|0)?9\d{9}$/;

    return pattern.test(cleaned);
}

// تابع کمکی برای تبدیل شماره به فرمت یکسان (مثلاً 09123456789)
export function normalizeIranianMobile(phone: string): string | '' {
    if (!isValidIranianMobile(phone)) return '';

    const cleaned = phone.replace(/[\s\-()]/g, '');
    // const digitsOnly = cleaned.replace(/^(0098|\+98|98|0)/, '');

    return '0' + cleaned;
}

// // مثال‌ها
// console.log(isValidIranianMobile('09123456789'));      // true
// console.log(isValidIranianMobile('9123456789'));       // true
// console.log(isValidIranianMobile('+989123456789'));    // true
// console.log(isValidIranianMobile('00989123456789'));   // true
// console.log(isValidIranianMobile('0912-345-6789'));    // true
// console.log(isValidIranianMobile('08123456789'));      // false (کد اپراتور با 9 شروع نمی‌شه)
// console.log(isValidIranianMobile('091234567'));        // false (تعداد رقم کمه)

// console.log(normalizeIranianMobile('+989123456789'));  // "09123456789"


/**
 * پاکسازی زنده‌ی شماره موبایل حین تایپ
 * - فقط رقم نگه می‌داره (به‌جز + در ابتدا)
 * - پیش‌شماره‌های 0098 / 98 / +98 رو به 0 تبدیل می‌کنه
 * - طول رو به ۱۱ رقم (با صفر ابتدایی) محدود می‌کنه
 */
export function sanitizeIranianMobileInput(value: string): string {
    if (!value) return '';
    let cleaned = ''
    // cleaned = convertPersianArabicDigitsToLatin(value);

    // اجازه فقط به رقم و + در ابتدا
    cleaned = value.replace(/[^\d+]/g, '');

    // cleaned = convertPersianArabicDigitsToLatin(cleaned);

    // اگر + وسط رشته باشه حذفش کن (فقط ابتدا مجازه)
    cleaned = cleaned.replace(/(?!^)\+/g, '');

    // تبدیل پیش‌شماره‌های بین‌المللی به 0
    if (cleaned.startsWith('+98')) {
        cleaned = '0' + cleaned.slice(3);
    } else if (cleaned.startsWith('0098')) {
        cleaned = '0' + cleaned.slice(4);
    } else if (cleaned.startsWith('98') && cleaned.length > 10) {
        cleaned = '0' + cleaned.slice(2);
    }

    // اگر با 9 شروع شده (بدون صفر)، صفر رو اضافه کن
    if (cleaned.startsWith('9')) {
        cleaned = '0' + cleaned;
    }

    // فقط باید با 0 شروع بشه، وگرنه پاک کن (جلوگیری از ورود اعداد نامعتبر مثل 1,2,...)
    if (cleaned.length > 0 && !cleaned.startsWith('0')) {
        cleaned = '';
    }

    // محدود کردن طول به ۱۱ رقم
    cleaned = cleaned.slice(0, 11);



    return cleaned;
}


/**
 * تبدیل اعداد فارسی و عربی به لاتین
 */
export function convertPersianArabicDigitsToLatin(value: string): string {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const arabicDigits = '٠١٢٣٤٥٦٧٨٩';

    return value.replace(/[۰-۹٠-٩]/g, (char) => {
        const persianIndex = persianDigits.indexOf(char);
        if (persianIndex !== -1) return String(persianIndex);

        const arabicIndex = arabicDigits.indexOf(char);
        if (arabicIndex !== -1) return String(arabicIndex);

        return char;
    });
}