const process = require('process');

const isProd = process.env.NODE_ENV === 'production';

// eslint-disable-next-line no-nested-ternary
const synchronize = process.env.DB_SYNC === 'true'
  ? true
  : process.env.DB_SYNC === 'false'
    ? false
    : !isProd;

const connectionOptions = {
  type: 'postgres',
  synchronize,
  ssl: process.env.DB_SSL === 'true',
  dropSchema: false,
  logging: true,
  entities: [isProd ? 'dist/entities/*.entity.js' : 'src/entities/*.entity.ts'],
  subscribers: [isProd ? 'dist/subsribers/**/*.js' : 'src/subscribers/**/*.ts'],
};

let mainConfig;

if (process.env.DATABASE_URL) {
  mainConfig = {
    ...connectionOptions,
    url: process.env.DATABASE_URL,
  };
} else {
  mainConfig = {
    ...connectionOptions,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'example',
    database: process.env.DB_NAME || 'postgres',
  };
}

module.exports = [
  {
    ...mainConfig,
    migrations: [isProd ? 'dist/migrations/*.js' : 'migrations/*.ts'],
    cli: {
      migrationsDir: 'migrations',
      subscribersDir: 'subscribers',
    },
  },
  {
    ...mainConfig,
    name: 'seed',
    migrations: [isProd ? 'dist/seeds/*.js' : 'seeds/*.ts'],
    cli: {
      migrationsDir: 'seeds',
    },
  },
];
