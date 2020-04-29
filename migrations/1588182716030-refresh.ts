import {MigrationInterface, QueryRunner} from "typeorm";

export class refresh1588182716030 implements MigrationInterface {
    name = 'refresh1588182716030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh-tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_11bab883f3b4d21b06eaed8e56e" UNIQUE ("token"), CONSTRAINT "PK_8c3ca3e3f1ad4fb45ec6b793aa0" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_11bab883f3b4d21b06eaed8e56" ON "refresh-tokens" ("token") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_11bab883f3b4d21b06eaed8e56"`, undefined);
        await queryRunner.query(`DROP TABLE "refresh-tokens"`, undefined);
    }

}
