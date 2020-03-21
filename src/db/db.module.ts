import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASS'),
    database: 'postgres',
    synchronize: configService.get<string>('NODE_ENV') !== 'production',
    dropSchema: false,
    logging: true,
    autoLoadEntities: true,
  }),
  inject: [ConfigService]
});
