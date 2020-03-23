import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST') || 'localhost',
    port: configService.get<number>('DB_PORT') || 5432,
    username: configService.get<string>('DB_USER') || 'postgres',
    password: configService.get<string>('DB_PASS') || 'example',
    database: configService.get<string>('DB_NAME') || 'postgres',
    synchronize: configService.get<string>('NODE_ENV') !== 'production',
    dropSchema: false,
    logging: true,
    autoLoadEntities: true,
  }),
  inject: [ConfigService]
});
