import {Module} from "@nestjs/common";
import { ServiceUser } from "./users/users.Service";
import { UsersController } from "./users/users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./users/User.entity";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./auth/guard/roles.guard";
import { JwtStrategy } from "./auth/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";


@Module({ 
    providers: [
      JwtStrategy,
      {
        provide: APP_GUARD,
        useClass: RolesGuard,
      },
    ],
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
        }),UsersModule, AuthModule,
        PassportModule,
        JwtModule.register({
          secret: 'secretKey', 
          signOptions: { expiresIn: '60m' },
        }),
      ],
})
export class AppModule{

}