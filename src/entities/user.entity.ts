import {PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'

export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    fullName : string
    
    @Column()
    password: string

    @CreateDateColumn()
    createdOn: Date
    
    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10)
    }
}

