import { NextResponse } from "next/server";
import { FACILITATOR_COOKIE_NAME } from "@/lib/facilitatorAuth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(FACILITATOR_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}
