import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

const NOT_CONFIGURED = NextResponse.json(
  { error: "Leaderboard is not configured." },
  { status: 503 }
);

export async function GET() {
  const supabase = getSupabaseServer();
  if (!supabase) return NOT_CONFIGURED;

  const { data, error } = await supabase
    .from("leaderboard")
    .select("name, score, created_at")
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ entries: data });
}

export async function POST(request: Request) {
  const supabase = getSupabaseServer();
  if (!supabase) return NOT_CONFIGURED;

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const score = body?.score;

  if (!name || name.length > 24) {
    return NextResponse.json({ error: "Invalid name." }, { status: 400 });
  }
  if (!Number.isInteger(score) || score < 0 || score > 10) {
    return NextResponse.json({ error: "Invalid score." }, { status: 400 });
  }

  const rawAnswers = body?.answers;
  const answers =
    Array.isArray(rawAnswers) &&
    rawAnswers.every(
      (a) =>
        a &&
        typeof a.scene === "number" &&
        typeof a.guess === "string" &&
        typeof a.correct === "boolean"
    )
      ? rawAnswers
      : null;

  const { error } = await supabase
    .from("leaderboard")
    .insert({ name, score, answers });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
