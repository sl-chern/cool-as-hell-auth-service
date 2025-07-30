import { User } from "src/user/domain/user";

export type JwtPayloadType = Pick<User, "id"> & {
  iat: number;
  exp: number;
};
