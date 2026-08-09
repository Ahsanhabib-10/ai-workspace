-- CreateTable
CREATE TABLE `KnowledgeChunk` (
    `id` VARCHAR(191) NOT NULL,
    `documentId` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `chunkIndex` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `KnowledgeChunk_documentId_idx`(`documentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KnowledgeChunk` ADD CONSTRAINT `KnowledgeChunk_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `KnowledgeDocument`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
