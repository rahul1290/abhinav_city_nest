import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util'; 

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo:Repository<User>){}

    async create(email:string,password:string){
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password,salt,32)) as Buffer;
        const hashPassword = salt+'.'+hash.toString('hex');

        const user = this.repo.create({email,password,status:true});
        return this.repo.save(user);
    }

    async signin(email:string,password:string){
        const [user] = await this.repo.find({email});
        if(!user){
            throw new NotFoundException('user not found');
        }
        const [salt,storeHash] = user.password.split('.');
        const hash = (await scrypt(password,salt,32)) as Buffer;
        if(storeHash !== hash.toString('hex')){
            throw new BadRequestException('Bad password');
        }
        return user;
    }

    async find(id:number){
        if(!id){
            throw new HttpException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: 'This is a custom message',
              }, HttpStatus.FORBIDDEN);
        }
        const user = await this.repo.findOne(id);
        if(!user){
            throw new NotFoundException('User not found.');
        }
        return user;
    }
    
    async delete(id:number){
        const user = await this.repo.findOne(id);
        if(!user){
            throw new NotFoundException('User not found.');
        }
        return this.repo.delete(user);
    }
}
