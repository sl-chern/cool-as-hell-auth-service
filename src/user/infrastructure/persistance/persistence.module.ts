import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { UserRepository } from "src/user/infrastructure/persistance/repository/user.repository";
import { AbstractUserRepository } from "./user.repository";

@Module({
  imports: [DrizzleModule],
  providers: [{ provide: AbstractUserRepository, useClass: UserRepository }],
  exports: [AbstractUserRepository],
})
export class UserPersistenceModule {}
