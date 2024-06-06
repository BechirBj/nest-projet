import {Module} from "@nestjs/common";
import { ServiceUser } from "./users/users.Service";
import { UsersController } from "./users/users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./users/User.entity";
import { UsersModule } from "./users/users.module";


@Module({ 
    imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'admin',
          database: 'nestt',
          entities: [UserEntity],
          synchronize: true,
        }),UsersModule
      ],
})
export class AppModule{

}