/*
  Warnings:

  - You are about to drop the column `seoDescription` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `seoTitle` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `seoDescription` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `seoTitle` on the `Page` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Blog` DROP COLUMN `seoDescription`,
    DROP COLUMN `seoTitle`,
    ADD COLUMN `seo` JSON NULL;

-- AlterTable
ALTER TABLE `Page` DROP COLUMN `seoDescription`,
    DROP COLUMN `seoTitle`,
    ADD COLUMN `seo` JSON NULL;
