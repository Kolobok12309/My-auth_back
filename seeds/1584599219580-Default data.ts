import {MigrationInterface, QueryRunner} from 'typeorm';

import { GroupEntity, UserEntity } from '~/src/entities';
import { Roles } from '~/src/user/interfaces';
import { TaskStatus } from '~/src/task/interfaces';

const groups = [
  { name: 'Управление' },
  { name: 'Склад' },
  { name: 'Бухгалтерия' }
];

const users = [
  { name: 'admin', role: Roles.Admin, group: groups[0] },
  { name: 'director', role: Roles.Director, group: groups[0] },
  { name: 'user_1', role: Roles.User, group: groups[1] },
  { name: 'user_2', role: Roles.User, group: groups[2] },
  { name: 'user_3', role: Roles.User, group: groups[2] },
  { name: 'user_4', role: Roles.User, group: null },
];

const tasks = [
  {
    title: 'Обучить персонал',
    description: 'Обучить персонал работе с данным менеджером задач',
    status: TaskStatus.InProgress,
    group: groups[0],
    user: users[1],
    deadline: '2021-05-30',
  },
  {
    title: 'Создать отделы',
    description: 'Создать отделы эквивалентные действующим',
    status: TaskStatus.ToDo,
    group: groups[0],
    user: users[1],
    deadline: '2021-02-28',
  },
  {
    title: 'Провести инвентаризацию',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut velit in nisi cursus malesuada. Aliquam arcu urna, tempus in felis quis, sagittis porta arcu. Sed hendrerit rhoncus lectus nec tempor. Donec ipsum orci, tempor sed euismod ac, porttitor eu odio. Sed tempor dictum maximus. Fusce maximus molestie turpis in.',
    status: TaskStatus.ToDo,
    group: groups[1],
    user: users[2],
    deadline: null,
  },
  {
    title: 'Добавить компьютеры',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: TaskStatus.Expired,
    group: groups[1],
    user: users[2],
    deadline: null,
  },
  {
    title: 'Зарегистрироваться',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: TaskStatus.Done,
    group: groups[2],
    user: users[3],
    deadline: null,
  },
  {
    title: 'Заплатить за менеджер задач',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    status: TaskStatus.InProgress,
    group: groups[2],
    user: users[4],
    deadline: null,
  },
];

// 1234567890
const simplePass = '$2b$10$rXVvWePRLYmT46Cthg4BT.FnP01SVASb0Me51mLmy1E7sHcz4scHC';

export class DefaultData1584599219580 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await Promise.all(groups.map(async ({ name }) => {
      await queryRunner.query(`INSERT INTO "groups" (name) VALUES ('${name}')`);
    }));

    await Promise.all(users.map(async ({ name, role, group }) => {
      let groupId = null;

      if (group) {
        const foundGroup = await queryRunner.manager
          .getRepository(GroupEntity)
          .createQueryBuilder('group')
          .where('group.name = :name', { name: group.name })
          .getOne();

        if (foundGroup) groupId = foundGroup.id;
      }

      await queryRunner.query(`INSERT INTO "users" (username, email, password, "groupId", role) VALUES ('${name}', '${name}@example.com', '${simplePass}', ${groupId}, ${role})`);
    }));

    await Promise.all(tasks.map(async ({ title, description, status, group, user, deadline = null }) => {
      let groupId = null;

      if (group) {
        const foundGroup = await queryRunner.manager
          .getRepository(GroupEntity)
          .createQueryBuilder('group')
          .where('group.name = :name', { name: group.name })
          .getOne();

        if (foundGroup) groupId = foundGroup.id;
      }

      const foundUser = await queryRunner.manager
        .getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.username = :name', { name: user.name })
        .getOne();

      const beautifiedDeadline = deadline ? `'${deadline}'` : null;

      await queryRunner.query(`INSERT INTO "tasks" (title, description, status, "groupId", "userId", deadline, "createdById") VALUES ('${title}', '${description}', ${status}, ${groupId}, ${foundUser.id}, ${beautifiedDeadline}, ${foundUser.id})`);
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await Promise.all(groups.map(async ({ name }) => {
      await queryRunner.query(`DELETE FROM "groups" WHERE name='${name}'`);
    }));

    await Promise.all(users.map(async ({ name }) => {
      await queryRunner.query(`DELETE FROM "users" WHERE username='${name}'`);
    }));
  }
}
