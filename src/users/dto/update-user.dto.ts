import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsPhoneNumber,
    MinLength,
    Matches,
} from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    lastname?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @Matches(/^9\d{8}$/, {
        message: 'El teléfono debe tener 9 dígitos y comenzar con 9',
    })
    phone?: string;

    @IsOptional()
    @IsString({ message: 'La imagen debe ser una cadena' })
    image?: string;

    @IsOptional()
    @IsString({ message: 'El token de notificación debe ser una cadena' })
    notification_token?: string;
}
