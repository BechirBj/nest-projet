import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./users/User.entity";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { InterMiami} from "./Interfaces/interfaces/entities/interface.entity";
import { InterfacesModule } from "./Interfaces/interfaces/interfaces.module";


@Module({ 
    imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'admin',
          database: 'nestt',
          entities: [UserEntity,InterMiami],
          synchronize: true,
        }), AuthModule,
        PassportModule,
        JwtModule.register({
          secret: 'secretKey', 
          signOptions: { expiresIn: '1h' }, 
        }),AuthModule,UsersModule,InterfacesModule, 
      ],
})
export class AppModule{

}