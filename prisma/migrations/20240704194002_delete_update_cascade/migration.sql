-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Recipes" DROP CONSTRAINT "Recipes_userId_fkey";

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
