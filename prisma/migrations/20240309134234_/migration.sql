/*
  Warnings:

  - You are about to drop the column `Name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `Queue` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Queue" DROP CONSTRAINT "Queue_user_fkey";

-- DropForeignKey
ALTER TABLE "_consistsOf" DROP CONSTRAINT "_consistsOf_B_fkey";

-- DropIndex
DROP INDEX "Category_Name_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "Name",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Queue";

-- CreateTable
CREATE TABLE "Playlist" (
    "playlistID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("playlistID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_title_key" ON "Playlist"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_consistsOf" ADD CONSTRAINT "_consistsOf_B_fkey" FOREIGN KEY ("B") REFERENCES "Playlist"("playlistID") ON DELETE CASCADE ON UPDATE CASCADE;
