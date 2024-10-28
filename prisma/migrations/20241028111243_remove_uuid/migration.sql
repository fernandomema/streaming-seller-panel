/*
  Warnings:

  - The primary key for the `Panel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Panel` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `panelId` on the `PanelAccounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `panelId` on the `PanelClient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `B` on the `_AppUserToPanel` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `PanelAccounts` DROP FOREIGN KEY `PanelAccounts_panelId_fkey`;

-- DropForeignKey
ALTER TABLE `PanelClient` DROP FOREIGN KEY `PanelClient_panelId_fkey`;

-- DropForeignKey
ALTER TABLE `_AppUserToPanel` DROP FOREIGN KEY `_AppUserToPanel_B_fkey`;

-- AlterTable
ALTER TABLE `Panel` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `PanelAccounts` MODIFY `panelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PanelClient` MODIFY `panelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `_AppUserToPanel` MODIFY `B` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PanelClient` ADD CONSTRAINT `PanelClient_panelId_fkey` FOREIGN KEY (`panelId`) REFERENCES `Panel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PanelAccounts` ADD CONSTRAINT `PanelAccounts_panelId_fkey` FOREIGN KEY (`panelId`) REFERENCES `Panel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AppUserToPanel` ADD CONSTRAINT `_AppUserToPanel_B_fkey` FOREIGN KEY (`B`) REFERENCES `Panel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
