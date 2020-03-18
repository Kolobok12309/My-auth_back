import {
  Length,
  IsNumber,
  Min,
  Max,
  IsString,
} from 'class-validator';

export const enum Roles {
  Root,
  Admin,
  Editor,
  User,
}

export interface UserInterface {
  id?: number;

  username?: string;

  password?: string;

  role?: Roles;

  createdAt?: Date;
}

export class CreateUserDto implements UserInterface {
  @IsString()
  @Length(5)
  username: string;

  @IsString()
  @Length(10)
  password: string;

  @IsNumber()
  @Min(0)
  @Max(Roles.User)
  role: Roles;
}

export class RegisterUserDto implements UserInterface {
  @IsString()
  @Length(5)
  username: string;

  @IsString()
  @Length(10)
  password: string;
}

export class SignInUserDto implements UserInterface {
  @IsString()
  @Length(5)
  username: string;

  @IsString()
  @Length(10)
  password: string;
}

export class UpdateUserDto implements UserInterface {
  @IsNumber()
  @Min(0)
  id: number;

  @IsString()
  @Length(10)
  password: string;
}

export class UpdateAdminUserDto implements UserInterface {
  @IsNumber()
  @Min(0)
  id: number;

  @IsString()
  @Length(10)
  password: string;

  @IsNumber()
  @Min(0)
  @Max(Roles.User)
  role: Roles;
}

export class DeleteUserDto implements UserInterface {
  @IsNumber()
  @Min(0)
  id: number;
}

export class GetUserDto implements UserInterface {
  @IsNumber()
  @Min(0)
  id: number;
}

export class FindUserByUsernameDto implements UserInterface {
  @IsString()
  @Length(5)
  username: string;
}
