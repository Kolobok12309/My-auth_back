import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    const isProd = configService.get<string>('NODE_ENV', 'development') === 'production';

    const connectionOptions = {
      type: 'postgres',
      synchronize: configService.get<string | boolean>('DB_SYNC', !isProd) === 'true',
      dropSchema: false,
      logging: true,
      autoLoadEntities: true,
      ssl: configService.get<string>('DB_SSL', false) === 'true',
      keepConnectionAlive: true,
    } as PostgresConnectionOptions;

    if (configService.get<string>('DATABASE_URL')) {
      return {
        ...connectionOptions,
        url: configService.get<string>('DATABASE_URL'),
      };
    }

    return {
      ...connectionOptions,
      host: configService.get<string>('DB_HOST', 'localhost'),
      port: configService.get<number>('DB_PORT', 5432),
      username: configService.get<string>('DB_USER', 'postgres'),
      password: configService.get<string>('DB_PASS', 'example'),
      database: configService.get<string>('DB_NAME', 'postgres'),
    };
  },
  inject: [ConfigService]
});
