/*
  # Create suppliers table for spare parts companies

  1. New Tables
    - suppliers: Stores information about spare parts companies

  2. Columns
    - id: UUID primary key
    - company_name: Name of the company
    - contact_person: Authorized contact person
    - phone: Contact phone number
    - brands: Comma-separated list of car brands they sell
    - email: Company email (optional)
    - address: Company address (optional)
    - created_at: Timestamp
    - updated_at: Timestamp
*/

CREATE TABLE IF NOT EXISTS suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  phone TEXT NOT NULL,
  brands TEXT NOT NULL,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_suppliers_company_name ON suppliers(company_name);
CREATE INDEX IF NOT EXISTS idx_suppliers_phone ON suppliers(phone);

-- Add RLS policies
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON suppliers FOR SELECT USING (true);

-- Allow authenticated users to insert/update
CREATE POLICY "Allow authenticated insert" ON suppliers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON suppliers FOR UPDATE USING (true);
