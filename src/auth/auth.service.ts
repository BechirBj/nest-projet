import { Injectable } from '@nestjs/common';
import { ServiceUser } from 'src/users/users.Service';

@Injectable()
export class AuthService {
  jwtService: any;
  constructor(private usersService: ServiceUser) {}
  async ValidateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      if (user.password === password) {
        return 'Authentication successful';
      }
      return 'Password in Wrong';
    }
    return 'Check the Email';
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
