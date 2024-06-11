// DTO Data transfer object  in an object that defines how the data will be sent over the network

import { IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
        
export class CreateUserDto {
    /* another mthd : @Length(3,20, { groups:['create']}) */
    @IsString()
    @Length(3,20)
    readonly username: string;
        
    @IsEmail()
    readonly email: string;
        
    @IsString()
    @IsNotEmpty()
    readonly country: string;
        
    @IsString()
    @IsNotEmpty()
    @Length(3,20)
        
    readonly password : string ;
}