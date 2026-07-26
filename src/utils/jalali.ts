/**
 * Persian Jalali date utilities & digit converters
 */

// Convert English numbers to Persian digits
export function toPersianDigits(str: string | number): string {
  if (str === null || str === undefined) return '';
  const numStr = String(str);
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return numStr.replace(/[0-9]/g, (w) => persianDigits[parseInt(w, 10)]);
}

// Convert Persian numbers to English digits
export function toEnglishDigits(str: string): string {
  if (!str) return '';
  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const arabicNumbers = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];
  
  let result = str;
  for (let i = 0; i < 10; i++) {
    result = result.replace(persianNumbers[i], String(i)).replace(arabicNumbers[i], String(i));
  }
  return result;
}

// Simple standalone Gregorian to Jalali converter
export function getTodayJalali(): string {
  const now = new Date();
  const gYear = now.getFullYear();
  const gMonth = now.getMonth() + 1;
  const gDay = now.getDate();

  const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  // Leap year check
  if ((gYear % 4 === 0 && gYear % 100 !== 0) || gYear % 400 === 0) {
    gDaysInMonth[1] = 29;
  }

  let gy = gYear - 1600;
  let gm = gMonth - 1;
  let gd = gDay - 1;

  let gDayNo = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);

  for (let i = 0; i < gm; ++i) {
    gDayNo += gDaysInMonth[i];
  }
  gDayNo += gd;

  let jDayNo = gDayNo - 79;

  let jNp = Math.floor(jDayNo / 12053);
  jDayNo %= 12053;

  let jy = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461);
  jDayNo %= 1461;

  if (jDayNo >= 366) {
    jy += Math.floor((jDayNo - 1) / 365);
    jDayNo = (jDayNo - 1) % 365;
  }

  let jm = 0;
  for (let i = 0; i < 12; i++) {
    const days = jDaysInMonth[i];
    if (jDayNo < days) {
      jm = i + 1;
      break;
    }
    jDayNo -= days;
  }
  let jd = jDayNo + 1;

  const monthStr = jm < 10 ? `0${jm}` : `${jm}`;
  const dayStr = jd < 10 ? `0${jd}` : `${jd}`;

  return `${jy}/${monthStr}/${dayStr}`;
}

export function generateLetterNumber(
  type: 'ص' | 'و' | 'د' = 'ص',
  year?: string,
  serial: number | string = 1,
  projectCode: string = '653'
): string {
  const today = getTodayJalali();
  const currentYear = year || today.split('/')[0] || '1405';
  const serialStr = String(serial).padStart(4, '0');
  return `${currentYear}-${serialStr}-${projectCode}${type}`;
}

export function parseLetterNumber(numStr: string) {
  if (!numStr) {
    return {
      type: 'ص' as const,
      year: getTodayJalali().split('/')[0] || '1405',
      serial: '0001',
      projectCode: '653',
    };
  }

  // Current Requested format: 1405-0002-653ص
  const matchMain = numStr.match(/^(\d{4})-(\d{4})-(.+)([صود])$/);
  if (matchMain) {
    return {
      year: matchMain[1],
      serial: matchMain[2],
      projectCode: matchMain[3],
      type: matchMain[4] as 'ص' | 'و' | 'د',
    };
  }

  // Format 2: 1405-0002-ص653
  const matchMain2 = numStr.match(/^(\d{4})-(\d{4})-([صود])(.+)$/);
  if (matchMain2) {
    return {
      year: matchMain2[1],
      serial: matchMain2[2],
      type: matchMain2[3] as 'ص' | 'و' | 'د',
      projectCode: matchMain2[4],
    };
  }

  // Format 3: 653-0001-1405ص
  const matchRev1 = numStr.match(/^(.+)-(\d{4})-(\d{4})([صود])$/);
  if (matchRev1) {
    return {
      projectCode: matchRev1[1],
      serial: matchRev1[2],
      year: matchRev1[3],
      type: matchRev1[4] as 'ص' | 'و' | 'د',
    };
  }

  // Format 4: ص1405-0001-653
  const matchOld = numStr.match(/^([صود])(\d{4})-(\d{4})-(.+)$/);
  if (matchOld) {
    return {
      type: matchOld[1] as 'ص' | 'و' | 'د',
      year: matchOld[2],
      serial: matchOld[3],
      projectCode: matchOld[4],
    };
  }

  return {
    type: 'ص' as const,
    year: getTodayJalali().split('/')[0] || '1405',
    serial: '0001',
    projectCode: '653',
  };
}

