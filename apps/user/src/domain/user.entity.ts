import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserDto } from "../dto/user.dto";
import { ResponseUser } from "../vo/response-user";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 50, unique: true })
    email: string;

    @Column({ nullable: false, length: 50 })
    name: string;

    @Column({ nullable: false, unique: true })
    userId: string;

    @Column({ nullable: false, unique: true })
    encryptedPwd: string;
}