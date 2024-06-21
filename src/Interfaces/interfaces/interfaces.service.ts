import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInterfaceDto } from './dto/create-interface.dto';
import { UpdateInterfaceDto } from './dto/update-interface.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { InterMiami } from './entities/interface.entity';
import {v4 as uuid} from "uuid"
import { UserEntity } from 'src/users/User.entity';

@Injectable()
export class InterfacesService {
  constructor(
    @InjectRepository(InterMiami)
    private interfaceRepository: Repository<InterMiami>,
  ) {}

  async create(createInterfaceDto: CreateInterfaceDto, user: UserEntity): Promise<InterMiami> {
    const newUser: InterMiami = {
      ...createInterfaceDto,
      id: uuid(),
      CreationDate: undefined,
      owner: user
    };
  return await this.interfaceRepository.save(newUser);
  }

  findAll():Promise<InterMiami[]>{
    return this.interfaceRepository.find();
  }


  async findOne(id: string): Promise<InterMiami> {
    const user = await this.interfaceRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

 async  update(id: string, updateInterfaceDto: UpdateInterfaceDto) {
    const user = await this.interfaceRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    } 
    const updatedInterface = this.interfaceRepository.merge(user, updateInterfaceDto);
    return await this.interfaceRepository.save(updatedInterface);
  }

  async remove(id: string) {
    const result: DeleteResult = await this.interfaceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return 'Deleted successfully'
  }
}
