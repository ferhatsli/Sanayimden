/*
  # Add package information to mechanic signups

  1. Changes
    - Add `package_duration` column to store selected package duration (1 Aylık, 3 Aylık, 6 Aylık)
    - Add `package_price` column to store package price
    - Add `payment_status` column to track payment (pending, paid, expired)
    - Add `payment_received_at` timestamp for when payment is confirmed

  2. Notes
    - Default payment_status is 'pending'
    - Records with 'pending' payment older than 48 hours will be considered expired
*/

-- Add package_duration column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'mechanic_signups' AND column_name = 'package_duration'
  ) THEN
    ALTER TABLE mechanic_signups ADD COLUMN package_duration text;
  END IF;
END $$;

-- Add package_price column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'mechanic_signups' AND column_name = 'package_price'
  ) THEN
    ALTER TABLE mechanic_signups ADD COLUMN package_price text;
  END IF;
END $$;

-- Add payment_status column with check constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'mechanic_signups' AND column_name = 'payment_status'
  ) THEN
    ALTER TABLE mechanic_signups ADD COLUMN payment_status text DEFAULT 'pending';
  END IF;
END $$;

-- Add check constraint for payment_status if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'mechanic_signups_payment_status_check'
  ) THEN
    ALTER TABLE mechanic_signups
      ADD CONSTRAINT mechanic_signups_payment_status_check
      CHECK (payment_status IN ('pending', 'paid', 'expired'));
  END IF;
END $$;

-- Add payment_received_at column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'mechanic_signups' AND column_name = 'payment_received_at'
  ) THEN
    ALTER TABLE mechanic_signups ADD COLUMN payment_received_at timestamptz;
  END IF;
END $$;
