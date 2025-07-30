import { Module } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { UserRepository } from "./infrastructure/persistance/repository/user.repository";

@Module({
  imports: [UserRepository],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
