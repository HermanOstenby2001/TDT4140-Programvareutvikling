/*
  Warnings:

  - You are about to drop the column `icebreaker` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `IcebreakerScore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `navme` on the `Queue` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `icebreaker` on the `User` table. All the data in the column will be lost.
  - The `admin` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[Name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Queue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropIndex
DROP INDEX "Queue_navme_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "icebreaker";

-- AlterTable
ALTER TABLE "Icebreaker" ALTER COLUMN "publishdate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "IcebreakerScore" DROP CONSTRAINT "IcebreakerScore_pkey",
ADD COLUMN     "icebreakerScoreID" SERIAL NOT NULL,
ADD CONSTRAINT "IcebreakerScore_pkey" PRIMARY KEY ("icebreakerScoreID");

-- AlterTable
ALTER TABLE "Queue" DROP COLUMN "navme",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "icebreaker",
DROP COLUMN "admin",
ADD COLUMN     "admin" "Role" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Category_Name_key" ON "Category"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Queue_name_key" ON "Queue"("name");
