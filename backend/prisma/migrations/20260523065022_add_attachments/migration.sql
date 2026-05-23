-- AlterTable
ALTER TABLE `deliverable` ADD COLUMN `attachments` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `message` ADD COLUMN `attachments` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `attachments` VARCHAR(191) NULL;
