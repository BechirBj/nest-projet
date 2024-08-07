import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InterfacesService } from './interfaces.service';
import { CreateInterfaceDto } from './dto/create-interface.dto';
import { UpdateInterfaceDto } from './dto/update-interface.dto';
import { InterMiami } from './entities/interface.entity';
import { IsOwnerGuard } from 'src/auth/guard/OwnerGuard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/guard/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { GetUser } from 'src/Decorators/getUser.decorator';

@Controller('interfaces')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InterfacesController {
  constructor(private readonly interfacesService: InterfacesService) {}

  @Post()
  async create(
    @Body() createInterMiamiDto: CreateInterfaceDto,
    @Req() req: any,
  ): Promise<InterMiami> {
    const userId = req.user.userId;
    return this.interfacesService.create(createInterMiamiDto, userId);
  }

  // @Get()
  // @Roles()
  // findAll() {
  //   return this.interfacesService.findAll();
  // }

  @Get('')
  @Roles(Role.ADMIN, Role.USER)
  findByOwnerId(@GetUser('roles') role:string, @GetUser('userId')id:string,
    ) {
      if(role==Role.ADMIN){
        return this.interfacesService.findAll();
      }
      else {
        return this.interfacesService.findByOwnerId(id);
      }
  }

  @UseGuards(IsOwnerGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interfacesService.findOne(id);
  }
  @UseGuards(IsOwnerGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterfaceDto: UpdateInterfaceDto,
  ) {
    return this.interfacesService.update(id, updateInterfaceDto);
  }

  @UseGuards(IsOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interfacesService.remove(id);
  }
}
