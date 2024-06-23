import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { InterfacesService } from './interfaces.service';
import { CreateInterfaceDto } from './dto/create-interface.dto';
import { UpdateInterfaceDto } from './dto/update-interface.dto';
import { InterMiami } from './entities/interface.entity';
import { IsOwnerGuard } from 'src/auth/guard/OwnerGuard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('interfaces')
export class InterfacesController {
  constructor(private readonly interfacesService: InterfacesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createInterMiamiDto: CreateInterfaceDto, @Req() req: any): Promise<InterMiami> {
      const userId = req.user.userId; // Assuming req.user has userId property
      return this.interfacesService.create(createInterMiamiDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.interfacesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interfacesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterfaceDto: UpdateInterfaceDto) {
    return this.interfacesService.update(id, updateInterfaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interfacesService.remove(id);
  }
}
