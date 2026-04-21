-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "homepage_order" INTEGER,
ADD COLUMN     "is_homepage" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "projects_is_homepage_idx" ON "projects"("is_homepage");
