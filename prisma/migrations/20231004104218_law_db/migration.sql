/*
  Warnings:

  - You are about to drop the column `storeID` on the `commentModel` table. All the data in the column will be lost.
  - You are about to drop the `storeModel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lawID` to the `commentModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "commentModel" DROP CONSTRAINT "commentModel_storeID_fkey";

-- DropForeignKey
ALTER TABLE "storeModel" DROP CONSTRAINT "storeModel_userID_fkey";

-- AlterTable
ALTER TABLE "commentModel" DROP COLUMN "storeID",
ADD COLUMN     "lawID" TEXT NOT NULL;

-- DropTable
DROP TABLE "storeModel";

-- CreateTable
CREATE TABLE "lawModel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "imageID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "lawModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lawModel" ADD CONSTRAINT "lawModel_userID_fkey" FOREIGN KEY ("userID") REFERENCES "authModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentModel" ADD CONSTRAINT "commentModel_lawID_fkey" FOREIGN KEY ("lawID") REFERENCES "lawModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
