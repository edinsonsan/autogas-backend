import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class LoginAuthDto {
    @IsString()
    @IsEmail({}, { message: 'Correo electrónico inválido' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
        message: 'La contraseña debe contener mayúsculas, minúsculas y números',
    })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    password: string;
}
