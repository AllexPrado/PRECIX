-- Run this as a superuser (postgres) or the owner of the objects
-- Replace precix_user if your app user has a different name

BEGIN;

-- 1) Ensure role exists (optional, safe if exists)
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'precix_user') THEN
      CREATE ROLE precix_user LOGIN PASSWORD 'changeme';
   END IF;
END$$;

-- 2) Grant schema usage (required to access objects in public)
GRANT USAGE ON SCHEMA public TO precix_user;
-- Optional: allow app user to create tables in public schema (needed if app creates tables like integration_configs)
-- Consider managing DDL via migrations instead of app code in production.
-- GRANT CREATE ON SCHEMA public TO precix_user;

-- 3) Grant data privileges on existing tables and sequences
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO precix_user;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO precix_user;

-- 4) Default privileges for future tables/sequences created by current owner
-- Run this as the owner of the schema objects (often postgres or your DB owner)
ALTER DEFAULT PRIVILEGES IN SCHEMA public
   GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO precix_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
   GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO precix_user;

-- 5) Optionally change ownership of specific app tables to your DB owner
-- (Uncomment and adjust if you want to transfer ownership)
-- ALTER TABLE public.products OWNER TO postgres;
-- ALTER TABLE public.admin_users OWNER TO postgres;
-- ALTER TABLE public.agents_status OWNER TO postgres;
-- ALTER TABLE public.agent_devices OWNER TO postgres;
-- ALTER TABLE public.agent_stores OWNER TO postgres;
-- ALTER TABLE public.audit_log OWNER TO postgres;
-- ALTER TABLE public.stores OWNER TO postgres;

COMMIT;
