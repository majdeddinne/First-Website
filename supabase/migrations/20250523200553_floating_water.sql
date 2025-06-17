/*
  # Add countries table and update profiles

  1. New Tables
    - `countries`
      - `id` (integer, primary key)
      - `name` (text, unique)
      - `code` (text, unique)
      
  2. Changes to Profiles
    - Add foreign key reference to countries table
    - Update RLS policies
*/

CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE
);

-- Add initial countries data
INSERT INTO countries (name, code) VALUES
  ('Afghanistan', 'AF'),
  ('Albania', 'AL'),
  ('Algeria', 'DZ'),
  -- Add more countries here...
  ('Zimbabwe', 'ZW')
ON CONFLICT (code) DO NOTHING;

-- Add country_id to profiles if it doesn't exist
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS country_id INTEGER REFERENCES countries(id);

-- Update RLS policies for countries table
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to countries"
  ON countries
  FOR SELECT
  TO authenticated
  USING (true);