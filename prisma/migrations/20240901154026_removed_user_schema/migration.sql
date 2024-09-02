/*
  Warnings:

  - You are about to drop the column `userId` on the `BetGame` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `betterAddress` to the `BetGame` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BetGame" DROP CONSTRAINT "BetGame_userId_fkey";

-- AlterTable
ALTER TABLE "BetGame" DROP COLUMN "userId",
ADD COLUMN     "betterAddress" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";
