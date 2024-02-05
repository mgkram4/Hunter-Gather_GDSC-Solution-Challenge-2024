ALTER TABLE "bookmarks"
ADD CONSTRAINT "fk_bookmarks_recipes"
FOREIGN KEY ("recipe_ids") REFERENCES "recipes"("id")