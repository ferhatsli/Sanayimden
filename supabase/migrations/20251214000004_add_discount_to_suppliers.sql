-- Add discount information to suppliers

ALTER TABLE suppliers
ADD COLUMN IF NOT EXISTS discount TEXT;

-- Populate discount data captured in suppliersList.md
UPDATE suppliers SET discount = 'Minimum %10' WHERE company_name ILIKE 'Besa Otomotiv';
UPDATE suppliers SET discount = 'Minimum %10' WHERE company_name ILIKE 'Biz Oto';
UPDATE suppliers SET discount = 'Minimum %10' WHERE company_name ILIKE 'Sancak 1453 Oto';
UPDATE suppliers SET discount = 'Minimum %10' WHERE company_name ILIKE 'Türk Öz Oto';
UPDATE suppliers SET discount = 'Minimum %10' WHERE company_name ILIKE 'Öz Metinler Otomotiv';
UPDATE suppliers SET discount = 'Minimum %10-15' WHERE company_name ILIKE 'Oto 24';
UPDATE suppliers SET discount = 'Minimum %15' WHERE company_name ILIKE 'YS Otomotiv';
UPDATE suppliers SET discount = '%5-%25 arası özel indirim' WHERE company_name ILIKE 'HİSAR Oto Yedek Parça';
UPDATE suppliers SET discount = 'Minimum %10' WHERE company_name ILIKE 'Anadolu Makina%';
UPDATE suppliers SET discount = '%15' WHERE company_name ILIKE 'Ares Oto%';
UPDATE suppliers SET discount = 'Minimum %5-%25' WHERE company_name ILIKE 'Mixpart%';
UPDATE suppliers SET discount = '%15 indirim' WHERE company_name ILIKE 'Oto Halil';
UPDATE suppliers SET discount = 'Minimum %10' WHERE company_name ILIKE 'Recep Tanıtmış Oto%';
UPDATE suppliers SET discount = '%10-%25 arası indirim' WHERE company_name ILIKE 'MR Leopart%';
UPDATE suppliers SET discount = '%15' WHERE company_name ILIKE 'Şahin Oto%';
UPDATE suppliers SET discount = 'Minimum %15' WHERE company_name ILIKE 'AslanPeugeot';
UPDATE suppliers SET discount = 'Minimum %15' WHERE company_name ILIKE 'Büyükdağ Otomotiv';
UPDATE suppliers SET discount = '%5-%25' WHERE company_name ILIKE 'FSB Otomotiv%';
UPDATE suppliers SET discount = 'Özel fiyat / anlaşmalı indirim' WHERE company_name ILIKE 'Merve Otomotiv%';
UPDATE suppliers SET discount = '%5-%20 arası' WHERE company_name ILIKE 'Diriliş Oto%';
UPDATE suppliers SET discount = '%15' WHERE company_name ILIKE 'Beyaz Tuning%';
UPDATE suppliers SET discount = '%5-%20 arası' WHERE company_name ILIKE 'Meydan Otomotiv';
UPDATE suppliers SET discount = '%15' WHERE company_name ILIKE 'Mesut Otomotiv';
UPDATE suppliers SET discount = 'Minimum %15' WHERE company_name ILIKE 'Başak Otomotiv';
UPDATE suppliers SET discount = 'Minimum %15' WHERE company_name ILIKE 'CNL';
UPDATE suppliers SET discount = 'Minimum %15' WHERE company_name ILIKE 'UNC Aksesuar';
UPDATE suppliers SET discount = 'Minimum %15' WHERE company_name ILIKE 'Asden Otomotiv';
UPDATE suppliers SET discount = 'Minimum %10' WHERE company_name ILIKE 'Biza Otomotiv';

-- Ensure updated_at is bumped for rows we touched
UPDATE suppliers SET updated_at = now() WHERE discount IS NOT NULL;
