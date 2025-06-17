/*
  # Add additional profile fields

  1. Changes
    - Add location and website columns to profiles table
    - Update existing RLS policies
*/

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS website text,
ADD COLUMN IF NOT EXISTS Bio text;