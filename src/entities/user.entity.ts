import {PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, Entity } from 'typeorm'

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
    
    
}

