import {Module} from "@nestjs/common";
import { ServiceUser } from "./users/users.Service";
import { UsersController } from "./users/users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./users/User.entity";


@Module({ 
    imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'test',
          entities: [UserEntity],
          synchronize: true,
        }),
      ],
    controllers: [UsersController],
    providers: [ServiceUser], 
  
})
export class AppModule{

}