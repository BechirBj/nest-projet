import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { InterfacesService } from './interfaces.service';
import { CreateInterfaceDto } from './dto/create-interface.dto';
import { UpdateInterfaceDto } from './dto/update-interface.dto';
import { InterMiami } from './entities/interface.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('interfaces')
export class InterfacesController {
  constructor(private readonly interfacesService: InterfacesService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createInterfaceDto: CreateInterfaceDto, @Req() req: any): Promise<InterMiami> {
    const user = req.user; 
    return this.interfacesService.create(createInterfaceDto, user);
  }

  
  
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
