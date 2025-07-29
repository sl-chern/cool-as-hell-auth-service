import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "src/drizzle/schema/schema";
import { AllConfigType } from "src/config/config.type";

export const DRIZZLE = Symbol("drizzle-connection");

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfigType>) => {
        const databasePort = configService.get("database.postgresPort", {
          infer: true,
        });
        const databaseUser = configService.get("database.postgresUser", {
          infer: true,
        });
        const databasePassword = configService.get(
          "database.postgresPassword",
          {
            infer: true,
          },
        );
        const databaseHost = configService.get("database.postgresHost", {
          infer: true,
        });
        const databaseName = configService.get("database.postgresDb", {
          infer: true,
        });
        const databaseUrl = `postgres://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`;

        const pool = new Pool({
          connectionString: databaseUrl,
        });

        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
