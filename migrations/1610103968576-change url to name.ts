import {MigrationInterface, QueryRunner} from "typeorm";

export class changeUrlToName1610103968576 implements MigrationInterface {
    name = 'changeUrlToName1610103968576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" RENAME COLUMN "url" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" RENAME COLUMN "name" TO "url"`);
    }

}
