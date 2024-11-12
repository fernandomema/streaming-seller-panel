-- CreateTable
CREATE TABLE `PanelClientAccountPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientAccountStatusId` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PanelClientAccountPayment` ADD CONSTRAINT `PanelClientAccountPayment_clientAccountStatusId_fkey` FOREIGN KEY (`clientAccountStatusId`) REFERENCES `ClientAccountStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
