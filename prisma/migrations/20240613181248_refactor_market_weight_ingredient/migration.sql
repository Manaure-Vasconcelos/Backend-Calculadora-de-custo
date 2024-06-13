/*
  Warnings:

  - You are about to drop the column `marketWeight` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `usedWeight` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingredient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "usedWeight" INTEGER NOT NULL,
    "marketPrice" INTEGER NOT NULL,
    "grossWeight" INTEGER NOT NULL,
    "realAmount" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ingredient" ("grossWeight", "id", "marketPrice", "name", "realAmount", "recipeId") SELECT "grossWeight", "id", "marketPrice", "name", "realAmount", "recipeId" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
