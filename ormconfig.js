const process = require('process');

const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'example';

const mainConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username,
  password,
  database: 'postgres',
  synchronize: true,
  dropSchema: false,
  logging: true,
  entities: ['src/**/*.entity.ts', 'entity/*.ts'],
  subscribers: ['subscriber/**/*.ts'],
};

module.exports = [
  {
    ...mainConfig,
    migrations: ['migrations/**/*.ts'],
    cli: {
      entitiesDir: 'entity',
      migrationsDir: 'migrations',
      subscribersDir: 'subscriber',
    },
  },
  {
    ...mainConfig,
    name: 'seed',
    migrations: ['seeds/*.ts'],
    cli: {
      migrationsDir: 'seeds',
    },
  },
];
