-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BetGame" (
    "id" TEXT NOT NULL,
    "betAmount" INTEGER NOT NULL,
    "team_user" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BetGame_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BetGame" ADD CONSTRAINT "BetGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
