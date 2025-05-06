import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  findAll() {
    return this.usersRepository.find();
  }

  create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findOne(id: number) {
    const userFound = await this.usersRepository.findOneBy({ id: id });
    if (!userFound) {
      return new HttpException('Usuario no Existe', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  async update(id: number, user: UpdateUserDto) {
    const userFound = await this.usersRepository.findOneBy({ id: id });
    if (!userFound) {
      return new HttpException('Usuario no Existe', HttpStatus.NOT_FOUND);
    }
    const userUpdated = Object.assign(userFound, user);
    return this.usersRepository.save(userUpdated);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
