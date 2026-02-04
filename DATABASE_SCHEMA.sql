-- ============================================================================
-- BottleKit Kit Access — Database Schema
-- ============================================================================
-- This file documents the required database tables and constraints for the
-- kit access feature. Execute these statements in Supabase SQL editor.
--
-- Tables required:
-- 1. profiles (may already exist from Supabase Auth)
-- 2. entitlements (new table for paid access tracking)
--
-- ============================================================================

-- ============================================================================
-- 1. PROFILES TABLE (likely already exists)
-- ============================================================================
-- If this table doesn't exist, create it. This should be linked to auth.users.
--
-- CREATE TABLE public.profiles (
--   id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
--   email text,
--   paid boolean DEFAULT false,
--   created_at timestamp with time zone DEFAULT now(),
--   updated_at timestamp with time zone DEFAULT now()
-- );
--
-- ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
--
-- CREATE POLICY "Users can view own profile"
--   ON public.profiles FOR SELECT
--   USING (auth.uid() = id);
--
-- CREATE POLICY "Users can update own profile"
--   ON public.profiles FOR UPDATE
--   USING (auth.uid() = id);
--
-- ============================================================================
-- CRITICAL: Add the 'paid' column to profiles if it doesn't exist
-- ============================================================================
-- ALTER TABLE public.profiles
--   ADD COLUMN IF NOT EXISTS paid boolean DEFAULT false;
--
-- ============================================================================

-- ============================================================================
-- 2. ENTITLEMENTS TABLE (NEW — for email-based paid tracking)
-- ============================================================================
-- This table tracks paid access by email. Webhook updates this table
-- when Stripe events occur (checkout, cancellation, refund).
--
CREATE TABLE IF NOT EXISTS public.entitlements (
  id bigserial PRIMARY KEY,
  email text UNIQUE NOT NULL,
  is_paid boolean DEFAULT false,
  purchased_at timestamp with time zone,
  revoked_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_entitlements_email ON public.entitlements(email);

-- Enable RLS (optional — webhook uses service role, so it bypasses RLS)
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

-- Public read access (safe since is_paid is only checked by webhook)
CREATE POLICY "Public read entitlements"
  ON public.entitlements FOR SELECT
  USING (true);

-- ============================================================================
-- 3. OPTIONAL: Sync entitlements → profiles on insert/update
-- ============================================================================
-- This trigger ensures that when entitlements is updated, the corresponding
-- profiles.paid is also updated. This keeps both tables in sync.
--
-- CREATE OR REPLACE FUNCTION public.sync_entitlement_to_profile()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   -- Update profiles.paid for the user with matching email
--   UPDATE public.profiles
--   SET paid = NEW.is_paid, updated_at = NOW()
--   WHERE LOWER(email) = LOWER(NEW.email);
--   
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;
--
-- DROP TRIGGER IF NOT EXISTS trg_sync_entitlement ON public.entitlements;
-- CREATE TRIGGER trg_sync_entitlement
--   AFTER INSERT OR UPDATE ON public.entitlements
--   FOR EACH ROW
--   EXECUTE FUNCTION public.sync_entitlement_to_profile();
--
-- ============================================================================

-- ============================================================================
-- 4. VERIFICATION QUERIES
-- ============================================================================
-- Use these to verify the schema is correct:

-- Check profiles table structure:
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'profiles';

-- Check entitlements table structure:
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'entitlements';

-- Check for unique constraint on entitlements.email:
-- SELECT constraint_name FROM information_schema.table_constraints
-- WHERE table_name = 'entitlements' AND constraint_type = 'UNIQUE';

-- List all indexes on entitlements:
-- SELECT indexname FROM pg_indexes WHERE tablename = 'entitlements';

-- ============================================================================
