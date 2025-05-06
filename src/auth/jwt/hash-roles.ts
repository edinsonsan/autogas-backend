import { SetMetadata } from "@nestjs/common";
import { JwtRoles } from "./jwt-roles";

export const HashRoles = (...roles: JwtRoles[]) => SetMetadata('roles', roles);