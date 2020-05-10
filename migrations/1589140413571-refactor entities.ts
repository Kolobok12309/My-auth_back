import {MigrationInterface, QueryRunner} from "typeorm";

export class refactorEntities1589140413571 implements MigrationInterface {
    name = 'refactorEntities1589140413571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" integer NOT NULL DEFAULT 3, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `, undefined);
        await queryRunner.query(`CREATE TABLE "refresh-tokens" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "userAgent" character varying, "ip" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8c3ca3e3f1ad4fb45ec6b793aa0" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD CONSTRAINT "FK_88bd85554c3fa712cd505ec7b1b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP CONSTRAINT "FK_88bd85554c3fa712cd505ec7b1b"`, undefined);
        await queryRunner.query(`DROP TABLE "refresh-tokens"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_fe0bb3f6520ee0469504521e71"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
