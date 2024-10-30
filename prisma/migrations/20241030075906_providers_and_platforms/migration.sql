-- AlterTable
ALTER TABLE `PanelAccounts` ADD COLUMN `buyCost` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `maxClients` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `notes` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `platformId` INTEGER NULL,
    ADD COLUMN `providerId` INTEGER NULL,
    ADD COLUMN `sellPrice` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `PanelClient` ADD COLUMN `notes` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `PanelProvider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `panelId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PanelPlatform` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `panelId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PanelAccounts` ADD CONSTRAINT `PanelAccounts_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `PanelProvider`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PanelAccounts` ADD CONSTRAINT `PanelAccounts_platformId_fkey` FOREIGN KEY (`platformId`) REFERENCES `PanelPlatform`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PanelProvider` ADD CONSTRAINT `PanelProvider_panelId_fkey` FOREIGN KEY (`panelId`) REFERENCES `Panel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PanelPlatform` ADD CONSTRAINT `PanelPlatform_panelId_fkey` FOREIGN KEY (`panelId`) REFERENCES `Panel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
