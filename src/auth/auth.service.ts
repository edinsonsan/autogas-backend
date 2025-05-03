import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async register(user: RegisterAuthDto) {

    const emailExist = await this.usersRepository.findOneBy({ email: user.email });
    if (emailExist) {
      //409 CONFLICT
      return new HttpException('El email ya Existe!', HttpStatus.CONFLICT);
    }

    const phoneExsist = await this.usersRepository.findOneBy({ phone: user.phone });
    if (phoneExsist) {
      return new HttpException('El telefono ya Existe!', HttpStatus.CONFLICT);
    }

    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
