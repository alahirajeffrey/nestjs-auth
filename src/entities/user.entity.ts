import {PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, Entity } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    email : string
    
    @Column()
    password: string

    @CreateDateColumn()
    createdOn: Date
    
    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10)
    }
}

