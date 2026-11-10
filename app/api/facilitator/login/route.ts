import { NextResponse } from "next/server";
import { createSessionToken, FACILITATOR_COOKIE_NAME } from "@/lib/facilitatorAuth";

export async function POST(request: Request) {
  const expected = process.env.FACILITATOR_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "Facilitator access is not configured." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (password !== expected) {
    return NextResponse.json({ error: "Maling password." }, { status: 401 });
  }

  const token = createSessionToken()!;
  const res = NextResponse.json({ ok: true });
  res.cookies.set(FACILITATOR_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return res;
}
