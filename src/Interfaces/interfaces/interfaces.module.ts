import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterfacesService } from './interfaces.service';
import { InterfacesController } from './interfaces.controller';
import { InterMiami } from './entities/interface.entity';
import { UserEntity } from 'src/users/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterMiami,UserEntity])],
  providers: [InterfacesService],
  controllers: [InterfacesController],

})
export class InterfacesModule {}
