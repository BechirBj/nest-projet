import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterfacesService } from './interfaces.service';
import { InterfacesController } from './interfaces.controller';
import { InterMiami } from './entities/interface.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterMiami])],
  providers: [InterfacesService],
  controllers: [InterfacesController],

})
export class InterfacesModule {}
