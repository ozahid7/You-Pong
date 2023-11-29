-- CreateTable
CREATE TABLE "Freindship" (
    "id_user" TEXT NOT NULL,
    "id_freind" TEXT NOT NULL,
    "state" "state" NOT NULL,

    CONSTRAINT "Freindship_pkey" PRIMARY KEY ("id_user","id_freind")
);

-- AddForeignKey
ALTER TABLE "Freindship" ADD CONSTRAINT "Freindship_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freindship" ADD CONSTRAINT "Freindship_id_freind_fkey" FOREIGN KEY ("id_freind") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
