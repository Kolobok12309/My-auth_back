const process = require('process');

const getEnv = (name, defaultValue = undefined) => process.env[name] !== undefined ? process.env[name] : defaultValue;

const isProd = getEnv('NODE_ENV') === 'production';

// eslint-disable-next-line no-nested-ternary
const synchronize = getEnv('DB_SYNC', !isProd);

const connectionOptions = {
  type: 'postgres',
  synchronize,
  ssl: getEnv('DB_SSL', false) === 'true',
  dropSchema: false,
  logging: true,
  entities: [isProd ? 'dist/src/entities/*.entity.js' : 'src/entities/*.entity.ts'],
  subscribers: [isProd ? 'dist/src/subsribers/**/*.js' : 'src/subscribers/**/*.ts'],
};

let mainConfig;

if (getEnv('DATABASE_URL', false)) {
  mainConfig = {
    ...connectionOptions,
    url: getEnv('DATABASE_URL'),
  };
} else {
  mainConfig = {
    ...connectionOptions,
    host: getEnv('DB_HOST', 'localhost'),
    port: getEnv('DB_PORT', 5432),
    username: getEnv('DB_USER', 'postgres'),
    password: getEnv('DB_PASS', 'example'),
    database: getEnv('DB_NAME', 'postgres'),
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
