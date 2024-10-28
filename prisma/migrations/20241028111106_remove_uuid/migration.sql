/*
  Warnings:

  - The primary key for the `ClientAccountStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ClientAccountStatus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `clientId` on the `ClientAccountStatus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `accountId` on the `ClientAccountStatus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `PanelAccounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `PanelAccounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `PanelClient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `PanelClient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `A` on the `_PanelAccountsToPanelClient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `B` on the `_PanelAccountsToPanelClient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `ClientAccountStatus` DROP FOREIGN KEY `ClientAccountStatus_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `ClientAccountStatus` DROP FOREIGN KEY `ClientAccountStatus_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `_PanelAccountsToPanelClient` DROP FOREIGN KEY `_PanelAccountsToPanelClient_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PanelAccountsToPanelClient` DROP FOREIGN KEY `_PanelAccountsToPanelClient_B_fkey`;

-- AlterTable
ALTER TABLE `ClientAccountStatus` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `clientId` INTEGER NOT NULL,
    MODIFY `accountId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `PanelAccounts` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `PanelClient` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_PanelAccountsToPanelClient` MODIFY `A` INTEGER NOT NULL,
    MODIFY `B` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ClientAccountStatus` ADD CONSTRAINT `ClientAccountStatus_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `PanelClient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientAccountStatus` ADD CONSTRAINT `ClientAccountStatus_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `PanelAccounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PanelAccountsToPanelClient` ADD CONSTRAINT `_PanelAccountsToPanelClient_A_fkey` FOREIGN KEY (`A`) REFERENCES `PanelAccounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PanelAccountsToPanelClient` ADD CONSTRAINT `_PanelAccountsToPanelClient_B_fkey` FOREIGN KEY (`B`) REFERENCES `PanelClient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
