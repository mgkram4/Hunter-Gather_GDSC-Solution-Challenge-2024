-- supabase edge functions use public.table_name without quotes, so we need to rename the tables and constraints so they can be referenced without quotes
ALTER TABLE public."Users"
RENAME TO "users";

ALTER TABLE "users"
RENAME COLUMN "tasteProfileId" TO "taste_profile_id";

ALTER TABLE "users"
RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE "users"
RENAME COLUMN "updatedAt" TO "updated_at";

ALTER TABLE public."UserTasteProfiles"
RENAME TO "user_taste_profiles";

ALTER TABLE "user_taste_profiles"
RENAME COLUMN "userId" TO "user_id";

ALTER TABLE "user_taste_profiles"
RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE "user_taste_profiles"
RENAME COLUMN "updatedAt" TO "updated_at";

ALTER TABLE public."Bookmarks"
RENAME TO "bookmarks";

ALTER TABLE "bookmarks"
RENAME COLUMN "userId" TO "user_id";

ALTER TABLE "bookmarks"
RENAME COLUMN "recipeIds" TO "recipe_ids";

ALTER TABLE "bookmarks"
RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE "bookmarks"
RENAME COLUMN "updatedAt" TO "updated_at";

ALTER TABLE public."Recipes"
RENAME TO "recipes";

ALTER TABLE "recipes"
RENAME COLUMN "userId" TO "user_id";

ALTER TABLE "recipes"
RENAME COLUMN "shortDescription" TO "short_description";

ALTER TABLE "recipes"
RENAME COLUMN "headlinerImage" TO "headliner_image";

ALTER TABLE "recipes"
RENAME COLUMN "datePublished" TO "date_published";

ALTER TABLE "recipes"
RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE "recipes"
RENAME COLUMN "updatedAt" TO "updated_at";

ALTER TABLE "recipes"
RENAME COLUMN "tasteProfileId" TO "taste_profile_id";

ALTER TABLE public."RecipeTasteProfiles"
RENAME TO "recipe_taste_profiles";

ALTER TABLE "recipe_taste_profiles"
RENAME COLUMN "recipeId" TO "recipe_id";

ALTER TABLE "recipe_taste_profiles"
RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE "recipe_taste_profiles"
RENAME COLUMN "updatedAt" TO "updated_at";

ALTER TABLE public."Ingredients"
RENAME TO "ingredients";

ALTER TABLE "ingredients"
RENAME COLUMN "recipeId" TO "recipe_id";

ALTER TABLE "ingredients"
RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE "ingredients"
RENAME COLUMN "updatedAt" TO "updated_at";

ALTER TABLE public."Comments"
RENAME TO "comments";

ALTER TABLE "comments"
RENAME COLUMN "userId" TO "user_id";

ALTER TABLE "comments"
RENAME COLUMN "recipeId" TO "recipe_id";

ALTER TABLE "comments"
RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE "comments"
RENAME COLUMN "updatedAt" TO "updated_at";

ALTER TABLE public."Tags"
RENAME TO "tags";

ALTER TABLE "tags"
RENAME COLUMN "recipeId" TO "recipe_id";

ALTER TABLE "tags"
RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE public."Ratings"
RENAME TO "ratings";

ALTER TABLE "ratings"
RENAME COLUMN "userId" TO "user_id";

ALTER TABLE "ratings"
RENAME COLUMN "recipeId" TO "recipe_id";

ALTER TABLE "ratings"
RENAME COLUMN "createdAt" TO "created_at";

ALTER TABLE "ratings"
RENAME COLUMN "updatedAt" TO "updated_at";