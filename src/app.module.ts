import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/User.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/roles.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@Module({

  imports: [

    TypeOrmModule.forRoot({

      type: 'postgres',

      host: 'localhost',

      port: 5432,

      username: 'postgres',

      password: 'admin',

      database: 'nestJS',

      entities: [UserEntity],

      synchronize: true,

    }),

    UsersModule,

    AuthModule,

  ],

  providers: [

    JwtStrategy,

    {

      provide: APP_GUARD,

      useClass: RolesGuard,

    },

  ],

})

export class AppModule {}
