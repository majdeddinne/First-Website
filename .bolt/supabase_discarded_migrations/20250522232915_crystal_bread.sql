/*
  # Enable Google OAuth

  1. Changes
    - Add Google OAuth configuration
    - Update auth settings for Google provider
*/

-- Create auth settings for Google OAuth
DO $$
BEGIN
    -- Check if Google provider is already enabled
    IF NOT EXISTS (
        SELECT 1
        FROM auth.providers
        WHERE provider = 'google'
    ) THEN
        -- Enable Google OAuth through auth settings
        INSERT INTO auth.identities (id, provider, identity_data)
        VALUES ('google', 'google', '{}')
        ON CONFLICT (provider) DO NOTHING;
    END IF;
END $$;