import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async register(user: RegisterAuthDto) {

    const { email, phone } = user;

    const emailExist = await this.usersRepository.findOneBy({ email: email });
    if (emailExist) {
      //409 CONFLICT
      return new HttpException('El email ya Existe!', HttpStatus.CONFLICT);
    }

    const phoneExsist = await this.usersRepository.findOneBy({ phone: phone });
    if (phoneExsist) {
      return new HttpException('El telefono ya Existe!', HttpStatus.CONFLICT);
    }

    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async login(loginData: LoginAuthDto) {
    const { email, password } = loginData;
    const userFound = await this.usersRepository.findOneBy({ email: email });
    if (!userFound) {
      return new HttpException('El email NO Existe!', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await compare(password, userFound.password);
    if (!isPasswordValid) {
      return new HttpException('La contraseña es incorrecta', HttpStatus.FORBIDDEN);
    }

    return userFound;
  }


  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: LoginAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
