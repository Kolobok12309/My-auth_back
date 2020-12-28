import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOtpSecretToUser1609189714176 implements MigrationInterface {
    name = 'AddOtpSecretToUser1609189714176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "otp" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "otp"`);
    }

}
