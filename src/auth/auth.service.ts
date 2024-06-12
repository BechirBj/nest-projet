import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServiceUser } from 'src/users/users.Service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: ServiceUser,
    private jwtService: JwtService, // Inject JwtService
  ) {}  
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user; // Exclude password from the returned user object
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
