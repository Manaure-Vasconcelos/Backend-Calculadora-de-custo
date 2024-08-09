-- CreateTable
CREATE TABLE "Additional" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "usedWeight" INTEGER NOT NULL,
    "marketPrice" INTEGER NOT NULL,
    "grossWeight" INTEGER NOT NULL,
    "realAmount" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "Additional_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Additional" ADD CONSTRAINT "Additional_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
