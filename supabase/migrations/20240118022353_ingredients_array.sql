ALTER TABLE ingredients
DROP COLUMN quantity;

ALTER TABLE ingredients
DROP COLUMN name;

ALTER TABLE ingredients
ADD COLUMN items jsonb not null default '{}'::jsonb;