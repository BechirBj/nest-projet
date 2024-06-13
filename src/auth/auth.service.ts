import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServiceUser } from 'src/users/users.Service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: ServiceUser,
    private jwtService: JwtService,
  ) {}  
  async validateUser(email: string, password: string){
    const user = await this.usersService.findByEmail(email);
    if (user){
      if(user.password===password){
        return "Authentification successful"
      }
      return 'Password is wrong '
    }
    return "check your Email ";
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload)};
  }
}
