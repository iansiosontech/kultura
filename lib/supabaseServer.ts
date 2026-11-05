import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only: uses the service_role key, which bypasses row-level
// security, so this must never be imported from client code.
let client: SupabaseClient | null | undefined;

export function getSupabaseServer(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  client = url && key ? createClient(url, key) : null;
  return client;
}
