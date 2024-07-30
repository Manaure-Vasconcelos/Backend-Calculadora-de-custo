-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "fixedCosts" INTEGER NOT NULL DEFAULT 0,
    "daysOfWorking" INTEGER NOT NULL DEFAULT 0,
    "salesPerDay" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
