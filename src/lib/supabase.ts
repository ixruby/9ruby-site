import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function supabaseAdmin() {
  if (!url || !serviceKey) throw new Error("Supabase admin not configured")
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
    db: { schema: "domains" },
  })
}

export function supabasePublic() {
  if (!url || !anonKey) throw new Error("Supabase public not configured")
  return createClient(url, anonKey, {
    auth: { persistSession: false },
    db: { schema: "domains" },
  })
}
