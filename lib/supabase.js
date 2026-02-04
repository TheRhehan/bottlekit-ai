import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Throw a clear error instead of the generic "supabaseUrl is required."
  // (This file is imported by client components like `app/kit/page.js`.)
  const missing = [
    !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : null,
    !supabaseAnonKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : null,
  ].filter(Boolean);

  throw new Error(
    `Missing required env var(s): ${missing.join(
      ", "
    )}. Add them to .env.local (see .env.example) and restart the dev server.`
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
export { supabase };