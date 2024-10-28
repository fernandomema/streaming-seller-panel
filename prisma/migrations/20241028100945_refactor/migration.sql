/*
  Warnings:

  - You are about to drop the `PanelUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `PanelUser`;

-- CreateTable
CREATE TABLE `AppUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AppUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AppUserToPanel` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AppUserToPanel_AB_unique`(`A`, `B`),
    INDEX `_AppUserToPanel_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AppUserToPanel` ADD CONSTRAINT `_AppUserToPanel_A_fkey` FOREIGN KEY (`A`) REFERENCES `AppUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AppUserToPanel` ADD CONSTRAINT `_AppUserToPanel_B_fkey` FOREIGN KEY (`B`) REFERENCES `Panel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
