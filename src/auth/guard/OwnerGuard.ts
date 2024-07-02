import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InterfacesService } from 'src/Interfaces/interfaces/interfaces.service';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(
    @Inject(InterfacesService)
    private readonly interfacesService: InterfacesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const interfaceId = request.params.id;
    const interfaceEntity = await this.interfacesService.findOne(interfaceId);

    if (!interfaceEntity) {
      throw new NotFoundException(`Interface with ID ${interfaceId} not found`);
    }

    if (interfaceEntity.owner.id !== user.userId) {
      throw new NotFoundException(
        'You are not authorized to perform this action on this interface',
      );
    }

    return true;
  }
}
