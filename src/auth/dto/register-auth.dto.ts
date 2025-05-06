import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsPhoneNumber,
    MinLength,
    Matches,
    IsArray,
    ArrayNotEmpty,
} from 'class-validator';

export class RegisterAuthDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    lastname: string;

    @IsString()
    @IsEmail({}, { message: 'Correo electrónico inválido' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    email: string;

    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @Matches(/^9\d{8}$/, {
        message: 'El teléfono debe tener 9 dígitos y comenzar con 9',
    })
    phone: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
        message: 'La contraseña debe contener mayúsculas, minúsculas y números',
    })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    password: string;

    @IsArray()
    @IsOptional()
    rolesId: string[];

}
