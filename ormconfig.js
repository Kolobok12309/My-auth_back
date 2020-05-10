const process = require('process');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 5432;
const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASS || 'example';
const database = process.env.DB_NAME || 'postgres';
const synchronize = process.env.NODE_ENV !== 'production';

const mainConfig = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize,
  dropSchema: false,
  logging: true,
  entities: ['src/entities/*.entity.ts'],
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
