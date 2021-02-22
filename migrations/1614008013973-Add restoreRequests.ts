import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRestoreRequests1614008013973 implements MigrationInterface {
    name = 'AddRestoreRequests1614008013973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "restore-requests" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" integer NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_426ff6b534e69dd996b585daf41" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30f0ddb37a73f7bd61b9f9f52c" ON "restore-requests" ("userId") `);
        await queryRunner.query(`ALTER TABLE "restore-requests" ADD CONSTRAINT "FK_30f0ddb37a73f7bd61b9f9f52c5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restore-requests" DROP CONSTRAINT "FK_30f0ddb37a73f7bd61b9f9f52c5"`);
        await queryRunner.query(`DROP INDEX "IDX_30f0ddb37a73f7bd61b9f9f52c"`);
        await queryRunner.query(`DROP TABLE "restore-requests"`);
    }

}
