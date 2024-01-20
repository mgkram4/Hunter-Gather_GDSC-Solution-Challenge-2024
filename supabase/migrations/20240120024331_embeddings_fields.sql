-- supabase gte-small has a vector size of 384
ALTER TABLE recipes ADD COLUMN embeddings vector(384);
ALTER TABLE user_taste_profiles ADD COLUMN embeddings vector(384);
ALTER TABLE recipe_taste_profiles ADD COLUMN embeddings vector(384);