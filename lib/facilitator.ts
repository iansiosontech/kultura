export type FacilitatorAnswer = { scene: number; guess: string; correct: boolean };

export type FacilitatorEntry = {
  name: string;
  score: number;
  answers: FacilitatorAnswer[] | null;
  created_at: string;
};

export type FacilitatorDataResult =
  | { ok: true; entries: FacilitatorEntry[] }
  | { ok: false; status: number };

export async function fetchFacilitatorData(): Promise<FacilitatorDataResult> {
  const res = await fetch("/api/facilitator/data", { cache: "no-store" });
  if (!res.ok) return { ok: false, status: res.status };
  const data = await res.json();
  return { ok: true, entries: data.entries ?? [] };
}

export async function facilitatorLogin(password: string): Promise<boolean> {
  const res = await fetch("/api/facilitator/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  return res.ok;
}

export async function facilitatorLogout(): Promise<void> {
  await fetch("/api/facilitator/logout", { method: "POST" });
}
