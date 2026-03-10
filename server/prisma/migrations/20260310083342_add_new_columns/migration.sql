/*
  Warnings:

  - Added the required column `appliedPrice` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageURL` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageURL` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_batchId_fkey";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "appliedPrice" INTEGER NOT NULL,
ADD COLUMN     "imageURL" TEXT NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL,
ALTER COLUMN "batchId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "imageURL" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
