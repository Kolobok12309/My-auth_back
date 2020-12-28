import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserIdIndexToRefreshToken1609174536258 implements MigrationInterface {
    name = 'AddUserIdIndexToRefreshToken1609174536258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "users"."role" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '2'`);
        await queryRunner.query(`CREATE INDEX "IDX_88bd85554c3fa712cd505ec7b1" ON "refresh-tokens" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_88bd85554c3fa712cd505ec7b1"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '3'`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."role" IS NULL`);
    }

}
