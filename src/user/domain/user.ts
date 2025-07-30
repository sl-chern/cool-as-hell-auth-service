import { Exclude } from "class-transformer";

export class User {
  id: string;
  email: string;
  name: string;
  @Exclude()
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date;
}
