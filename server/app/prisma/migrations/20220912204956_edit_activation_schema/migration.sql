/*
  Warnings:

  - You are about to drop the column `userId` on the `Activation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activation" DROP CONSTRAINT "Activation_userId_fkey";

-- AlterTable
ALTER TABLE "Activation" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activationId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activationId_fkey" FOREIGN KEY ("activationId") REFERENCES "Activation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
