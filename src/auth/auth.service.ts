import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/User.entity';
import { ServiceUser } from 'src/users/users.Service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    if (user) {
      return this.login(user);
    } else {
      throw new UnauthorizedException('Check credentials');
    }
  }

  async login(user: any) {
    console.log('user==>', JSON.stringify(user));
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    console;
    const access_token = await this.jwtService.sign(payload);
    return { access_token };
  }
}
