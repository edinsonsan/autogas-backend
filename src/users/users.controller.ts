import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HashRoles } from 'src/auth/jwt/hash-roles';
import { JwtRoles } from 'src/auth/jwt/jwt-roles';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @HashRoles(JwtRoles.ADMIN)
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @HashRoles(JwtRoles.ADMIN, JwtRoles.CLIENT)
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }


  @HashRoles(JwtRoles.ADMIN, JwtRoles.CLIENT)
  @UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateWithImage(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
      ],
    }),
  ) file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto) {
    // console.log(file);
    return this.usersService.updateWithImage(file, id, updateUserDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
