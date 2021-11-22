import { Entity,Column,PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()   
    id : number;

    @Column()
    email : string;

    @Column()
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