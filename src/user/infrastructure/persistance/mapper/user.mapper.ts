import { UserModel } from "src/drizzle/types/drizzle";
import { User } from "src/user/domain/user";

export class UserMapper {
  static toDomain(raw: UserModel): User {
    const domainEntity = new User();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.email = raw.email;
    domainEntity.hashedPassword = raw.hashedPassword;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: User): UserModel {
    const persistanceEntity = {} as UserModel;
    persistanceEntity.id = domainEntity.id;
    persistanceEntity.name = domainEntity.name;
    persistanceEntity.email = domainEntity.email;
    persistanceEntity.hashedPassword = domainEntity.hashedPassword;
    persistanceEntity.createdAt = domainEntity.createdAt;
    persistanceEntity.updatedAt = domainEntity.updatedAt;
    return persistanceEntity;
  }
}
