import * as path from "path";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";

let conf

const { DB_HOST, DB_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

const entitiesPath = path.join(__dirname, '/src/entities/*.entity{.ts,.js}')
if (DB_HOST && DB_PORT && POSTGRES_USER && POSTGRES_PASSWORD && POSTGRES_DB) {
  conf = {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    dbName: POSTGRES_DB,
    driver: PostgreSqlDriver,
    entities: [entitiesPath]
  };
} else {
  console.error('DB conf error!')
}

export default conf
