import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { User } from "src/user/domain/user";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { AbstractUserRepository } from "src/user/infrastructure/persistance/user.repository";
import { NullableType } from "src/utils/types";

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: AbstractUserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const userObject = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (userObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: "emailAlreadyExists",
        },
      });
    }

    return this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      hashedPassword,
    });
  }

  findById(id: User["id"]): Promise<NullableType<User>> {
    return this.usersRepository.findById(id);
  }

  findByEmail(email: User["email"]): Promise<NullableType<User>> {
    return this.usersRepository.findByEmail(email);
  }
}
