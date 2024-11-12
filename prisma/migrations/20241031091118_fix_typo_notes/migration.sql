/*
  Warnings:

  - You are about to drop the column `note` on the `ClientAccountStatus` table. All the data in the column will be lost.
  - Added the required column `notes` to the `ClientAccountStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ClientAccountStatus` DROP COLUMN `note`,
    ADD COLUMN `notes` VARCHAR(191) NOT NULL;
