import { Inject, Injectable } from "@nestjs/common";
import { DRIZZLE } from "src/drizzle/drizzle.module";
import { DrizzleDB } from "src/drizzle/types/drizzle";
import { User } from "src/user/domain/user";
import { UserMapper } from "src/user/infrastructure/persistance/mapper/user.mapper";
import { userSchema } from "src/user/infrastructure/persistance/entity/user.schema";
import { eq } from "drizzle-orm";
import { NullableType } from "src/utils/types";
import { AbstractUserRepository } from "../user.repository";

@Injectable()
export class UserRepository implements AbstractUserRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(data: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data);
    const [newEntity] = await this.db
      .insert(userSchema)
      .values(persistenceModel)
      .returning();
    return UserMapper.toDomain(newEntity);
  }

  async findById(id: User["id"]): Promise<NullableType<User>> {
    const [entity] = await this.db
      .select()
      .from(userSchema)
      .where(eq(userSchema.id, id));

    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByEmail(email: User["email"]): Promise<NullableType<User>> {
    if (!email) return null;

    const [entity] = await this.db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, email));

    return entity ? UserMapper.toDomain(entity) : null;
  }
}
