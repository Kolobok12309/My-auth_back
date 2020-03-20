import {MigrationInterface, QueryRunner} from 'typeorm';

const users = [
  { name: 'root', role: 0 },
  { name: 'admin', role: 1 },
  { name: 'editor', role: 2 },
  { name: 'user', role: 3 },
];

// 1234567890
const simplePass = '$2b$10$rXVvWePRLYmT46Cthg4BT.FnP01SVASb0Me51mLmy1E7sHcz4scHC';

export class DefaultUsers1584599219580 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await users.reduce(async (acc, { name, role }) => {
      await acc;

      return queryRunner.query(`INSERT INTO "users" (username, password, role) VALUES ('${name}', '${simplePass}', ${role})`, undefined);
    }, Promise.resolve());
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await users.reduce(async (acc, { name }) => {
      await acc;

      return queryRunner.query(`DELETE FROM "users" WHERE username='${name}'`);
    }, Promise.resolve());
  }
}
