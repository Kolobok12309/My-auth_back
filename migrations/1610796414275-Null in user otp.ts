import {MigrationInterface, QueryRunner} from "typeorm";

export class NullInUserOtp1610796414275 implements MigrationInterface {
    name = 'NullInUserOtp1610796414275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_7e7425b17f9e707331e9a6c7335"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "otp" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."otp" IS NULL`);
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "files"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_7e7425b17f9e707331e9a6c7335" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_7e7425b17f9e707331e9a6c7335"`);
        await queryRunner.query(`COMMENT ON COLUMN "files"."userId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."otp" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "otp" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_7e7425b17f9e707331e9a6c7335" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
