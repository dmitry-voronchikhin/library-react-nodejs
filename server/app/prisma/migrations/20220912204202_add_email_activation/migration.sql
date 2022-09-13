-- CreateTable
CREATE TABLE "Activation" (
    "id" TEXT NOT NULL,
    "activationLink" TEXT,
    "isActivate" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Activation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activation" ADD CONSTRAINT "Activation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
