import { Entity,Column,PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()   
    id : number;

    @Column()
    email : string;

    @Column()
    @Exclude()
    password : string;

    @AfterInsert()
    logInsert(){
        console.log(`User ${this.id} Inserted Successfully.`);
    }

    @AfterUpdate()
    logUpdate(){
        console.log('User Inserted Successfully.');
    }

    @AfterRemove()
    logDelete(){
        console.log('User Inserted Successfully.');
    }
}