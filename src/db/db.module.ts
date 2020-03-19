import { TypeOrmModule } from '@nestjs/typeorm';

const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'example';

export default TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username,
  password,
  database: 'postgres',
  synchronize: true,
  dropSchema: false,
  logging: true,
  autoLoadEntities: true,
});
