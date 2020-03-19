const process = require('process');

const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'example';

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username,
  password,
  database: 'postgres',
  synchronize: true,
  dropSchema: false,
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'entity',
    migrationsDir: 'migrations',
    subscribersDir: 'subscriber',
  },
};
