        // DTO Data transfer object  in an object that defines how the data will be sent over the network

import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./CreateUser.tdo";
// PartialType ( it is ( tari9a ) to extends from another class )

export class UpdateUserDto extends PartialType(CreateUserDto){}