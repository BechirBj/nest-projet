import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Ensure AuthService and JwtStrategy are provided
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'secretKey', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Adjust token expiration as needed
    }),
  ],})
export class AuthModule {}
