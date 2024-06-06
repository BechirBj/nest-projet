import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // custom validation pipe 
        // Logic here ( Transformation or Validation )
    console.log(value);        
    return value;
  }
}