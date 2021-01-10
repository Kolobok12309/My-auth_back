import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTaskGroupNullable1610285867261 implements MigrationInterface {
    name = 'ChangeTask.groupNullable1610285867261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_d670df4239252dbd7c04ad6e848"`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "groupId" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks"."groupId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_d670df4239252dbd7c04ad6e848" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_d670df4239252dbd7c04ad6e848"`);
        await queryRunner.query(`COMMENT ON COLUMN "tasks"."groupId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "groupId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_d670df4239252dbd7c04ad6e848" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
