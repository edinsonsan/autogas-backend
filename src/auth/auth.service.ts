import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import { Rol } from 'src/roles/entities/rol.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Rol) private rolesRepository: Repository<Rol>,

    private jwtService: JwtService,

  ) { }

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

    const rolesIds = user.rolesId;
    const roles = await this.rolesRepository.findBy({ id: In(rolesIds) });
    newUser.roles = roles;

    const userSave = await this.usersRepository.save(newUser);

    const payload = { id: userSave.id, name: userSave.name };
    const token = this.jwtService.sign(payload);

    delete userSave.password;

    const data = {
      user: userSave,
      token: 'Bearer ' + token,

    }

    return data;

  }

  async login(loginData: LoginAuthDto) {
    const { email, password } = loginData;
    const userFound = await this.usersRepository.findOne({
      where: { email: email },
      relations: ['roles'],
    });
    if (!userFound) {
      return new HttpException('El email NO Existe!', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await compare(password, userFound.password);
    if (!isPasswordValid) {
      return new HttpException('La contraseña es incorrecta', HttpStatus.FORBIDDEN);
    }

    const payload = { id: userFound.id, name: userFound.name };
    const token = this.jwtService.sign(payload);

    delete userFound.password;

    const data = {
      user: userFound,
      token: 'Bearer ' + token,

    }

    return data;
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
