import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPassProp1584291504386 implements MigrationInterface {
    name = 'AddPassProp1584291504386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "pass" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "pass"`, undefined);
    }

}
