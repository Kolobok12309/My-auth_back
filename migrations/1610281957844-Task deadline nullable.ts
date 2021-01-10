import {MigrationInterface, QueryRunner} from "typeorm";

export class TaskDeadlineNullable1610281957844 implements MigrationInterface {
    name = 'TaskDeadlineNullable1610281957844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "deadline" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks"."deadline" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "tasks"."deadline" IS NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "deadline" SET NOT NULL`);
    }

}
