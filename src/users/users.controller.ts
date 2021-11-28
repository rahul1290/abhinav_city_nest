import { Body, Controller, Post, Get, Param} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private UserService : UsersService){}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto){
        this.UserService.create(body.email,body.password);  
    }

    @Get('/:id')
    findUser(@Param('id') id:string){
        return this.UserService.find(parseInt(id));
    }
}
