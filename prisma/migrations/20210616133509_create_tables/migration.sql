-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companiesToAdmins" (
    "id" SERIAL NOT NULL,
    "company_id" TEXT NOT NULL,
    "company_admin_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salaries" (
    "id" SERIAL NOT NULL,
    "pay_type_id" INTEGER NOT NULL,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pay_type" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT E'Hourly',
    "pay_salary" INTEGER,
    "hourly_rate" INTEGER,
    "hours_per_day" INTEGER,
    "days_per_week" INTEGER NOT NULL,
    "pay_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "overtimes" (
    "id" SERIAL NOT NULL,
    "worked_hours" INTEGER,
    "worked_days" INTEGER,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deductions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "amount" INTEGER,
    "percentage" INTEGER,
    "salary_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allowances" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "salary_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "account_n" INTEGER NOT NULL,
    "nib" INTEGER NOT NULL,
    "company_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inss" (
    "id" SERIAL NOT NULL,
    "num" INTEGER NOT NULL,
    "percentage" INTEGER NOT NULL,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies_admins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "l_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "tel2" TEXT,
    "gender_id" INTEGER,
    "owner" BOOLEAN NOT NULL DEFAULT false,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "l_name" TEXT NOT NULL,
    "email" TEXT,
    "tel" TEXT NOT NULL,
    "tel2" TEXT,
    "education" TEXT,
    "born" TIMESTAMP(3),
    "marred" BOOLEAN NOT NULL DEFAULT false,
    "gender_id" INTEGER,
    "company_id" TEXT NOT NULL,
    "hire_date" TIMESTAMP(3) NOT NULL,
    "pay_schedule_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pay_schedule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pay_frequency" TEXT NOT NULL DEFAULT E'Monthly',
    "pay_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pre_emproyee" (
    "id" SERIAL NOT NULL,
    "cv_path" TEXT,
    "portfolio" TEXT,
    "experience" TEXT,
    "years_of_experience" INTEGER,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spouses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "l_name" TEXT,
    "email" TEXT,
    "tel" TEXT,
    "tel2" TEXT,
    "education" TEXT,
    "profession" TEXT,
    "born" TIMESTAMP(3),
    "dead" BOOLEAN NOT NULL DEFAULT false,
    "gender_id" INTEGER,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mothers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "l_name" TEXT,
    "email" TEXT,
    "tel" TEXT,
    "tel2" TEXT,
    "education" TEXT,
    "profession" TEXT,
    "born" TIMESTAMP(3),
    "dead" BOOLEAN NOT NULL DEFAULT false,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fathers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "l_name" TEXT,
    "email" TEXT,
    "tel" TEXT,
    "tel2" TEXT,
    "education" TEXT,
    "profession" TEXT,
    "born" TIMESTAMP(3),
    "dead" BOOLEAN NOT NULL DEFAULT false,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bi" (
    "id" TEXT NOT NULL,
    "issued_in" TEXT NOT NULL,
    "issuance_date" TIMESTAMP(3) NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "employee_id" TEXT,
    "spouse_id" INTEGER,
    "mother_id" INTEGER,
    "father_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "province_id" INTEGER NOT NULL,
    "district_id" INTEGER NOT NULL,
    "bairro_id" INTEGER NOT NULL,
    "roud" INTEGER,
    "andar" INTEGER,
    "flat" INTEGER,
    "block" INTEGER,
    "house" INTEGER,
    "companie_admin_id" TEXT NOT NULL,
    "spouse_id" INTEGER NOT NULL,
    "mother_id" INTEGER NOT NULL,
    "father_id" INTEGER NOT NULL,
    "employee_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genders" (
    "id" SERIAL NOT NULL,
    "gender" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provinces" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "districts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Zip_code" INTEGER,
    "province_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bairros" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "district_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies.name_unique" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "roles.role_unique" ON "roles"("role");

-- CreateIndex
CREATE UNIQUE INDEX "salaries_pay_type_id_unique" ON "salaries"("pay_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "salaries_employee_id_unique" ON "salaries"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "overtimes_employee_id_unique" ON "overtimes"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_company_id_unique" ON "bank_accounts"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_employee_id_unique" ON "bank_accounts"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "inss_employee_id_unique" ON "inss"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_admins.email_unique" ON "companies_admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pay_schedule.name_unique" ON "pay_schedule"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pre_emproyee_employee_id_unique" ON "pre_emproyee"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "spouses.email_unique" ON "spouses"("email");

-- CreateIndex
CREATE UNIQUE INDEX "spouses_employee_id_unique" ON "spouses"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "mothers.email_unique" ON "mothers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "mothers_employee_id_unique" ON "mothers"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "fathers.email_unique" ON "fathers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "fathers_employee_id_unique" ON "fathers"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "bi_employee_id_unique" ON "bi"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "bi_spouse_id_unique" ON "bi"("spouse_id");

-- CreateIndex
CREATE UNIQUE INDEX "bi_mother_id_unique" ON "bi"("mother_id");

-- CreateIndex
CREATE UNIQUE INDEX "bi_father_id_unique" ON "bi"("father_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_province_id_unique" ON "address"("province_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_district_id_unique" ON "address"("district_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_companie_admin_id_unique" ON "address"("companie_admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_spouse_id_unique" ON "address"("spouse_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_mother_id_unique" ON "address"("mother_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_father_id_unique" ON "address"("father_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_employee_id_unique" ON "address"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_company_id_unique" ON "address"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "genders.gender_unique" ON "genders"("gender");

-- CreateIndex
CREATE UNIQUE INDEX "provinces.name_unique" ON "provinces"("name");

-- CreateIndex
CREATE UNIQUE INDEX "bairros.name_unique" ON "bairros"("name");

-- AddForeignKey
ALTER TABLE "companiesToAdmins" ADD FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companiesToAdmins" ADD FOREIGN KEY ("company_admin_id") REFERENCES "companies_admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salaries" ADD FOREIGN KEY ("pay_type_id") REFERENCES "pay_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salaries" ADD FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "overtimes" ADD FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deductions" ADD FOREIGN KEY ("salary_id") REFERENCES "salaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allowances" ADD FOREIGN KEY ("salary_id") REFERENCES "salaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inss" ADD FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies_admins" ADD FOREIGN KEY ("gender_id") REFERENCES "genders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD FOREIGN KEY ("gender_id") REFERENCES "genders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD FOREIGN KEY ("pay_schedule_id") REFERENCES "pay_schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pre_emproyee" ADD FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spouses" ADD FOREIGN KEY ("gender_id") REFERENCES "genders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spouses" ADD FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mothers" ADD FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fathers" ADD FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bi" ADD FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bi" ADD FOREIGN KEY ("spouse_id") REFERENCES "spouses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bi" ADD FOREIGN KEY ("mother_id") REFERENCES "mothers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bi" ADD FOREIGN KEY ("father_id") REFERENCES "fathers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD FOREIGN KEY ("bairro_id") REFERENCES "bairros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD FOREIGN KEY ("companie_admin_id") REFERENCES "companies_admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD FOREIGN KEY ("spouse_id") REFERENCES "spouses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD FOREIGN KEY ("mother_id") REFERENCES "mothers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD FOREIGN KEY ("father_id") REFERENCES "fathers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "districts" ADD FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bairros" ADD FOREIGN KEY ("district_id") REFERENCES "districts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
