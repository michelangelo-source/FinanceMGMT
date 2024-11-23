import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const dbConn: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'Gacek',
  password: 'qq',
  database: 'FinanceMgmtDB',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
};
