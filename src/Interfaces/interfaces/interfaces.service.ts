import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInterfaceDto } from './dto/create-interface.dto';
import { UpdateInterfaceDto } from './dto/update-interface.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { InterMiami } from './entities/interface.entity';
import { v4 as uuid } from 'uuid';
import { UserEntity } from 'src/users/User.entity';

@Injectable()
export class InterfacesService {
  constructor(
    @InjectRepository(InterMiami)
    private interfaceRepository: Repository<InterMiami>,
  ) {}

  async create(
    createInterMiamiDto: CreateInterfaceDto,
    user: UserEntity,
  ): Promise<InterMiami> {
    const newInterMiami = this.interfaceRepository.create({
      ...createInterMiamiDto,
      id: uuid(),
      owner: user,
    });
    return await this.interfaceRepository.save(newInterMiami);
  }

  async findAll(): Promise<InterMiami[]> {
    return await this.interfaceRepository.find({ relations: ['owner'] });
  }

  
  async findByOwnerId(ownerid: string): Promise<InterMiami[]> {
    const interfaces = await this.interfaceRepository.find({
      where: { owner: { id: ownerid } },
      relations: ['owner'],
    });
    if (!interfaces || interfaces.length === 0) {
      throw new NotFoundException(
        `No interfaces found for owner with ID ${ownerid}`,
      );
    }
    return interfaces;
  }

  async findOne(id: string): Promise<InterMiami> {
    const interfacee = await this.interfaceRepository.findOne({
      where: { id },
    });
    if (!interfacee) {
      throw new NotFoundException(`interfacee with ID ${id} not found`);
    }
    return interfacee;
  }

  async update(
    id: string,
    updateInterMiamiDto: UpdateInterfaceDto,
  ): Promise<InterMiami> {
    const interfacee = await this.interfaceRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!interfacee) {
      throw new NotFoundException(`Interface with ID ${id} not found`);
    }
    const updatedInterMiami = this.interfaceRepository.merge(
      interfacee,
      updateInterMiamiDto,
    );
    return await this.interfaceRepository.save(updatedInterMiami);
  }

  async remove(id: string): Promise<string> {
    const result: DeleteResult = await this.interfaceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Interface with ID ${id} not found`);
    }
    return 'Deleted successfully';
  }
}
