-- Add user ownership to categories
ALTER TABLE "categories" ADD COLUMN "user_id" TEXT;
UPDATE "categories"
SET "user_id" = (
  SELECT "id" FROM "users" ORDER BY "createdAt" ASC LIMIT 1
)
WHERE "user_id" IS NULL;
ALTER TABLE "categories" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "categories"
ADD CONSTRAINT "categories_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add user ownership to products
ALTER TABLE "products" ADD COLUMN "user_id" TEXT;
UPDATE "products" p
SET "user_id" = c."user_id"
FROM "categories" c
WHERE p."category_id" = c."id" AND p."user_id" IS NULL;
UPDATE "products"
SET "user_id" = (
  SELECT "id" FROM "users" ORDER BY "createdAt" ASC LIMIT 1
)
WHERE "user_id" IS NULL;
ALTER TABLE "products" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "products"
ADD CONSTRAINT "products_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add user ownership to orders (tables/mesas)
ALTER TABLE "orders" ADD COLUMN "user_id" TEXT;
UPDATE "orders"
SET "user_id" = (
  SELECT "id" FROM "users" ORDER BY "createdAt" ASC LIMIT 1
)
WHERE "user_id" IS NULL;
ALTER TABLE "orders" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "orders"
ADD CONSTRAINT "orders_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
