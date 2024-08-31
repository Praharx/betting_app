/*
  Warnings:

  - Added the required column `availableAmount` to the `BetGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BetGame" ADD COLUMN     "availableAmount" INTEGER NOT NULL;
