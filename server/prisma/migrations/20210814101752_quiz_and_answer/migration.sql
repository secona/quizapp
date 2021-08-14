-- CreateTable
CREATE TABLE "quizzes" (
    "quizId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" UUID NOT NULL,

    PRIMARY KEY ("quizId")
);

-- CreateTable
CREATE TABLE "questions" (
    "questionId" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "choices" TEXT[],
    "correct" INTEGER NOT NULL,
    "quizId" UUID NOT NULL,

    PRIMARY KEY ("questionId")
);

-- AddForeignKey
ALTER TABLE "quizzes" ADD FOREIGN KEY ("authorId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD FOREIGN KEY ("quizId") REFERENCES "quizzes"("quizId") ON DELETE CASCADE ON UPDATE CASCADE;
