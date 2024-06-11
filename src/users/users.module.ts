import{Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserEntity } from './User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceUser } from './users.Service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [ServiceUser],
    controllers: [UsersController],
    exports: [ServiceUser]
})
export class UsersModule {
}