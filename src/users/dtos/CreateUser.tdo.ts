// DTO Data transfer object  in an object that defines how the data will be sent over the network

import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Role } from 'src/auth/roles.enum';

export class CreateUserDto {
  /* another mthd : @Length(3,20, { groups:['create']}) */
  @ApiProperty()
  @IsString()
  @Length(3, 20)
  readonly username: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly password: string;

  @ApiProperty()
  @IsEnum(Role, { each: true })
  readonly roles: Role;
}
