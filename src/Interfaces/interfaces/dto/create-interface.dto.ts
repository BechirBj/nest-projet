import { IsJSON, IsNotEmpty, IsString } from "class-validator";

export class CreateInterfaceDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    content: string;
  }
