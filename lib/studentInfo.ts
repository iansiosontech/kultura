export type StudentInfo = { name: string; section: string };

export const STUDENT_INFO_KEY = "kultura-kwento-student-v1";

export function readStudentInfo(): StudentInfo | null {
  try {
    const raw = window.localStorage.getItem(STUDENT_INFO_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.name === "string" && typeof parsed?.section === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function writeStudentInfo(info: StudentInfo) {
  try {
    window.localStorage.setItem(STUDENT_INFO_KEY, JSON.stringify(info));
  } catch {
    /* ignore */
  }
}

// "Juan Dela Cruz (7-Mapagmahal)" for prefilling the leaderboard name —
// falls back gracefully if either part is missing.
export function studentDisplayName(info: StudentInfo | null): string {
  if (!info) return "";
  if (info.name && info.section) return `${info.name} (${info.section})`;
  return info.name || info.section || "";
}
