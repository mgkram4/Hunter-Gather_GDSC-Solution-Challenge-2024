ALTER TABLE recipes
DROP COLUMN instructions;

ALTER TABLE recipes
ADD COLUMN instructions jsonb not null default '{}'::jsonb;