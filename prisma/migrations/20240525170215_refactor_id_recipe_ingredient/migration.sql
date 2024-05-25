/*
  Warnings:

  - The primary key for the `Ingredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `recipeId` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Recipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Recipes` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingredient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "marketWeight" INTEGER NOT NULL,
    "marketPrice" INTEGER NOT NULL,
    "grossWeight" INTEGER NOT NULL,
    "realAmount" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ingredient" ("grossWeight", "id", "marketPrice", "marketWeight", "name", "realAmount", "recipeId") SELECT "grossWeight", "id", "marketPrice", "marketWeight", "name", "realAmount", "recipeId" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
CREATE TABLE "new_Recipes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "describe" TEXT,
    "userId" TEXT NOT NULL,
    "valuePartial" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipes" ("createdAt", "describe", "id", "title", "updatedAt", "userId", "valuePartial") SELECT "createdAt", "describe", "id", "title", "updatedAt", "userId", "valuePartial" FROM "Recipes";
DROP TABLE "Recipes";
ALTER TABLE "new_Recipes" RENAME TO "Recipes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
