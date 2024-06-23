import { PartialType } from '@nestjs/mapped-types';
import { CreateInterfaceDto } from './create-interface.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateInterfaceDto extends PartialType(CreateInterfaceDto) {
    @IsString()
    @IsNotEmpty()
    title?: string;
    
    @IsString()
    @IsNotEmpty()
    content?: string;
}

