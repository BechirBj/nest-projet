import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ServiceUser } from './users/users.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [UsersModule],
  providers: [ServiceUser],
  controllers: [UsersController]
})
export class UserHttpModule {}
