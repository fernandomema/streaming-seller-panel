/*
  Warnings:

  - You are about to drop the column `userId` on the `PanelUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `PanelUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `PanelUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `PanelUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `PanelUser_userId_key` ON `PanelUser`;

-- AlterTable
ALTER TABLE `PanelUser` DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `PanelUser_email_key` ON `PanelUser`(`email`);
