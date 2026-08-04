/*
  Warnings:

  - You are about to alter the column `value` on the `Setting` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `Setting` MODIFY `value` JSON NOT NULL;
