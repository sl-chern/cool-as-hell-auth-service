import * as schema from "src/drizzle/schema/schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { InferModel } from "drizzle-orm";

export type DrizzleDB = NodePgDatabase<typeof schema>;

export type UserModel = InferModel<typeof schema.userSchema>;
