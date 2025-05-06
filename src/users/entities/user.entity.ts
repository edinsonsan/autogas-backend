import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { bcrypt, hash } from "bcrypt";
import { Rol } from "src/roles/entities/rol.entity";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;

    @Column({ nullable: true })
    image: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    notificaion_token: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @JoinTable({
        name: 'user_has_roles',
        joinColumn: { name: 'id_user' },
        inverseJoinColumn: { name: 'id_rol' }
    })
    @ManyToMany(() => Rol, (rol) => rol.users)
    roles: Rol[]

    @BeforeInsert()
    async hastPassword() {
        this.password = await hash(this.password, Number(process.env.HASH_SALT));
    }

}
