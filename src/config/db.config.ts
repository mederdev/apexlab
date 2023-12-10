import {Logger} from "@nestjs/common";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import {MikroOrmModuleOptions} from "@mikro-orm/nestjs";
import * as path from "path";

export class DbConfig {
  static getConfig(): MikroOrmModuleOptions {
    const { DB_HOST, DB_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
      process.env;
    const entitiesPath = path.join(__dirname, '/../entities/*.entity{.ts,.js}')
    if (DB_HOST && DB_PORT && POSTGRES_USER && POSTGRES_PASSWORD && POSTGRES_DB) {
      return {
        host: DB_HOST,
        port: Number(DB_PORT),
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        dbName: POSTGRES_DB,
        driver: PostgreSqlDriver,
        entities: [entitiesPath]
      };
    } else {
      Logger.error('CONFIG ERROR: BAD ENVIRONMENT (DB)');
      process.exit();
    }
  }
}
