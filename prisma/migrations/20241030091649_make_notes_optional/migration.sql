-- AlterTable
ALTER TABLE `PanelAccounts` MODIFY `notes` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `PanelClient` MODIFY `notes` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `PanelProvider` MODIFY `notes` VARCHAR(191) NULL;
