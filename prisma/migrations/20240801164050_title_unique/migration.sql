/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Issue_title_key` ON `Issue`(`title`);
