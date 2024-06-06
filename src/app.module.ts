import {Module} from "@nestjs/common";
import {UsersModule} from "./users/users.module";
import { ServiceUser } from "./users/users.Service";
import { UsersController } from "./users/users.controller";


@Module({ 
    controllers: [UsersController],
    providers: [ServiceUser], 
  
})
export class AppModule{

}