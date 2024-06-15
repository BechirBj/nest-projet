  import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Role } from '../roles.enum';
import { UserEntity } from 'src/users/User.entity';

  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      } 
      const { user } = context.switchToHttp().getRequest();
      console.log('hello', requiredRoles);
      return requiredRoles.some((role)=> user.roles.includes(role));
 



     /* 
      const user: UserEntity = {
        username: 'Bechir',
        roles: [Role.User],
        id: '',
        email: '',
        country: '',
        password: ''
      };

      return requiredRoles.some((role)=> user.roles.includes(role));
*/ 
    }
  }
