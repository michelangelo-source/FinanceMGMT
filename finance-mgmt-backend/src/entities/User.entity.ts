import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {ROLE} from "../role.type";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn({name:"Id"})
    id?: number;
    @Column({name:"Login"})
    login: string;
    @Column({name:"Password"})
    password: string;
    @Column({name:"Name"})
    name: string;
    @Column({default: "USER",name : "Role"})
    role: ROLE;
}