import { User } from "src/user/domain/user";

export class LoginResponseDto {
  token: string;
  tokenExpires: number;
  user: User;
}
