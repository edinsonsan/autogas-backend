import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import storage = require('../utils/cloud_storage');
import { Rol } from 'src/roles/entities/rol.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  findAll() {
    return this.usersRepository.find({ relations: ['roles'] });
  }

  create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findOne(id: number) {
    const userFound = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['roles']
    });
    if (!userFound) {
      throw new HttpException('Usuario no Existe', HttpStatus.NOT_FOUND);
    }
    delete userFound.password;
    return userFound;
  }

  async update(id: number, user: UpdateUserDto) {
    const userFound = await this.usersRepository.findOneBy({ id: id });
    if (!userFound) {
      throw new HttpException('Usuario no Existe', HttpStatus.NOT_FOUND);
    }
    const userUpdated = Object.assign(userFound, user);
    return this.usersRepository.save(userUpdated);
  }

  async updateWithImage(file: Express.Multer.File, id: number, user: UpdateUserDto) {
    const url = await storage(file, file.originalname);
    console.log('URL: ' + url);

    if (url === undefined && url === null) {
      throw new HttpException('La imagen no se pudo guardar', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const userFound = await this.usersRepository.findOneBy({ id: id });
    if (!userFound) {
      throw new HttpException('Usuario no Existe', HttpStatus.NOT_FOUND);
    }
    user.image = url;
    const userUpdated = Object.assign(userFound, user);
    return this.usersRepository.save(userUpdated);

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
