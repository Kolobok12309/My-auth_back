import {MigrationInterface, QueryRunner} from 'typeorm';

const users = [
  { name: 'admin', role: 0 },
  { name: 'director', role: 1 },
  { name: 'user', role: 2 },
];

// 1234567890
const simplePass = '$2b$10$rXVvWePRLYmT46Cthg4BT.FnP01SVASb0Me51mLmy1E7sHcz4scHC';

export class DefaultUsers1584599219580 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await users.reduce(async (acc, { name, role }) => {
      await acc;

      return queryRunner.query(`INSERT INTO "users" (username, email, password, role) VALUES ('${name}', '${name}@example.com', '${simplePass}', ${role})`, undefined);
    }, Promise.resolve());
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await users.reduce(async (acc, { name }) => {
      await acc;

      return queryRunner.query(`DELETE FROM "users" WHERE username='${name}'`);
    }, Promise.resolve());
  }
}
