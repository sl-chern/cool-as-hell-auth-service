import { User } from "src/user/domain/user";
import { NullableType } from "src/utils/types";

export abstract class AbstractUserRepository {
  abstract create(
    data: Omit<User, "id" | "createdAt" | "deletedAt" | "updatedAt">,
  ): Promise<User>;

  abstract findById(id: User["id"]): Promise<NullableType<User>>;
  abstract findByEmail(email: User["email"]): Promise<NullableType<User>>;
}
