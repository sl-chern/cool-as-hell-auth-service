import { Module } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { UserPersistenceModule } from "src/user/infrastructure/persistance/persistence.module";

@Module({
  imports: [UserPersistenceModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
