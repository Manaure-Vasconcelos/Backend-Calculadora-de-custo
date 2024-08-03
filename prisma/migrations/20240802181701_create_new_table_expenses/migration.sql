-- CreateTable
CREATE TABLE "Expenses" (
    "id" SERIAL NOT NULL,
    "valuePartial" DOUBLE PRECISION NOT NULL,
    "serving" INTEGER NOT NULL,
    "pack" INTEGER NOT NULL,
    "profit" INTEGER NOT NULL,
    "valueTotal" DOUBLE PRECISION NOT NULL,
    "valueUnit" DOUBLE PRECISION NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Expenses_recipeId_key" ON "Expenses"("recipeId");

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
