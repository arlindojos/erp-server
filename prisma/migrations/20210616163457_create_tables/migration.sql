/*
  Warnings:

  - You are about to drop the column `andar` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `bairro_id` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `companie_admin_id` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `flat` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `roud` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `gender_id` on the `companies_admins` table. All the data in the column will be lost.
  - You are about to drop the `bairros` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address_t` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_bairro_id_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_companie_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "bairros" DROP CONSTRAINT "bairros_district_id_fkey";

-- DropForeignKey
ALTER TABLE "companies_admins" DROP CONSTRAINT "companies_admins_gender_id_fkey";

-- DropIndex
DROP INDEX "address_companie_admin_id_unique";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "andar",
DROP COLUMN "bairro_id",
DROP COLUMN "companie_admin_id",
DROP COLUMN "flat",
DROP COLUMN "roud",
ADD COLUMN     "address_t" TEXT NOT NULL,
ALTER COLUMN "father_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "companies_admins" DROP COLUMN "gender_id";

-- DropTable
DROP TABLE "bairros";
