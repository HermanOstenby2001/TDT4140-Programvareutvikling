-- CreateTable
CREATE TABLE "Icebreaker" (
    "icebreakerID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "publishdate" TIMESTAMP(3) NOT NULL,
    "userID" TEXT NOT NULL,
    "category" INTEGER NOT NULL,

    CONSTRAINT "Icebreaker_pkey" PRIMARY KEY ("icebreakerID")
);

-- CreateTable
CREATE TABLE "IcebreakerScore" (
    "icebreaker" INTEGER NOT NULL,
    "userID" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "IcebreakerScore_pkey" PRIMARY KEY ("icebreaker","userID")
);

-- CreateTable
CREATE TABLE "Category" (
    "categoryID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "icebreaker" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryID")
);

-- CreateTable
CREATE TABLE "User" (
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "icebreaker" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userName")
);

-- CreateTable
CREATE TABLE "Queue" (
    "queueID" SERIAL NOT NULL,
    "navme" TEXT NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("queueID")
);

-- CreateTable
CREATE TABLE "Report" (
    "reportID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admin" TEXT NOT NULL,
    "review" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("reportID")
);

-- CreateTable
CREATE TABLE "Review" (
    "reviewID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "icebreaker" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("reviewID")
);

-- CreateTable
CREATE TABLE "_favouredBy" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_consistsOf" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Icebreaker_title_key" ON "Icebreaker"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Queue_navme_key" ON "Queue"("navme");

-- CreateIndex
CREATE UNIQUE INDEX "Report_title_key" ON "Report"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_favouredBy_AB_unique" ON "_favouredBy"("A", "B");

-- CreateIndex
CREATE INDEX "_favouredBy_B_index" ON "_favouredBy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_consistsOf_AB_unique" ON "_consistsOf"("A", "B");

-- CreateIndex
CREATE INDEX "_consistsOf_B_index" ON "_consistsOf"("B");

-- AddForeignKey
ALTER TABLE "Icebreaker" ADD CONSTRAINT "Icebreaker_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icebreaker" ADD CONSTRAINT "Icebreaker_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("categoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IcebreakerScore" ADD CONSTRAINT "IcebreakerScore_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IcebreakerScore" ADD CONSTRAINT "IcebreakerScore_icebreaker_fkey" FOREIGN KEY ("icebreaker") REFERENCES "Icebreaker"("icebreakerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_admin_fkey" FOREIGN KEY ("admin") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_review_fkey" FOREIGN KEY ("review") REFERENCES "Review"("reviewID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_icebreaker_fkey" FOREIGN KEY ("icebreaker") REFERENCES "Icebreaker"("icebreakerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favouredBy" ADD CONSTRAINT "_favouredBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Icebreaker"("icebreakerID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favouredBy" ADD CONSTRAINT "_favouredBy_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_consistsOf" ADD CONSTRAINT "_consistsOf_A_fkey" FOREIGN KEY ("A") REFERENCES "Icebreaker"("icebreakerID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_consistsOf" ADD CONSTRAINT "_consistsOf_B_fkey" FOREIGN KEY ("B") REFERENCES "Queue"("queueID") ON DELETE CASCADE ON UPDATE CASCADE;
