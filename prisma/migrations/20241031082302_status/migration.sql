/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `ClientAccountStatus` table. All the data in the column will be lost.
  - You are about to drop the column `lastPayAt` on the `ClientAccountStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ClientAccountStatus` DROP COLUMN `expiresAt`,
    DROP COLUMN `lastPayAt`,
    ADD COLUMN `billingCycle` VARCHAR(10) NOT NULL DEFAULT 'monthly',
    ADD COLUMN `status` VARCHAR(10) NOT NULL DEFAULT 'active';
