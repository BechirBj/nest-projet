import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServiceUser } from 'src/users/users.Service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: ServiceUser,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      console.error('User not found');
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if( !isMatch ){
      throw new UnauthorizedException('Invalid credentials');
    }else{
      const { password: userPassword, ...result } = user;
      return result;
    }
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      roles: user.roles,
      sub: user.id,
    };
  }
}
