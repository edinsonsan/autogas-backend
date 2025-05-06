import { InjectRepository } from '@nestjs/typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesService {

  constructor(@InjectRepository(Rol) private rolesRepository: Repository<Rol>) { }

  create(createRoleDto: CreateRolDto) {
    const newRol = this.rolesRepository.create(createRoleDto);
    return this.rolesRepository.save(newRol);
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRolDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
