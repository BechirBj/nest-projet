        // DTO Data transfer object  in an object that defines how the data will be sent over the network

import { IsEmail, IsNotEmpty, IsString, Length, isString } from "class-validator";

export class CreateUserDto {
    @IsString()
    /* another mthd : @Length(3,20, { groups:['create']}) */

    @Length(3,20)
    readonly username: string;  
    @IsEmail()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly country: string;
}