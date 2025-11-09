-- Extend user_profiles table with additional fields for Starseed Oracle Temple
-- This migration is safe and non-breaking - all new fields are optional with defaults

-- Add new profile fields
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS bio TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS avatar_url TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS starseed_origin TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{"email": true, "push": false}'::jsonb;

-- Add index for avatar_url for faster lookups (sparse index - only where not null)
CREATE INDEX IF NOT EXISTS idx_user_profiles_avatar_url
ON public.user_profiles(avatar_url)
WHERE avatar_url IS NOT NULL;

-- Add comment documentation
COMMENT ON COLUMN public.user_profiles.bio IS 'User biography or about me text';
COMMENT ON COLUMN public.user_profiles.avatar_url IS 'URL to user profile picture';
COMMENT ON COLUMN public.user_profiles.starseed_origin IS 'User spiritual origin or star system connection';
COMMENT ON COLUMN public.user_profiles.notification_preferences IS 'JSON object storing user notification preferences';

-- Create or replace function to sync display_name between user_profiles and auth.users
CREATE OR REPLACE FUNCTION sync_display_name_to_auth()
RETURNS TRIGGER AS $$
BEGIN
  -- When display_name is updated in user_profiles, also update it in auth.users metadata
  IF NEW.display_name IS DISTINCT FROM OLD.display_name THEN
    UPDATE auth.users
    SET raw_user_meta_data =
      COALESCE(raw_user_meta_data, '{}'::jsonb) ||
      jsonb_build_object('display_name', NEW.display_name)
    WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to sync display_name updates
DROP TRIGGER IF EXISTS sync_display_name_trigger ON public.user_profiles;
CREATE TRIGGER sync_display_name_trigger
AFTER UPDATE OF display_name ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION sync_display_name_to_auth();

-- Grant necessary permissions (these should already exist but adding for completeness)
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.user_profiles TO authenticated;

-- Ensure RLS is enabled (should already be enabled)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Note: Existing RLS policies already cover the new fields:
-- "Users can view own profile" - covers SELECT on new fields
-- "Users can update own profile" - covers UPDATE on new fields
-- No new policies needed!