-- AlterTable
ALTER TABLE "book" ADD COLUMN     "readerId" TEXT;

-- CreateTable
CREATE TABLE "reader" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,

    CONSTRAINT "reader_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_readerId_fkey" FOREIGN KEY ("readerId") REFERENCES "reader"("id") ON DELETE SET NULL ON UPDATE CASCADE;
