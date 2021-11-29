import { Body, Controller, Post, Get, Param, Delete, Session, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';


@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private UserService : UsersService){}

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto,@Session() session:any){
        const user = await this.UserService.create(body.email,body.password);  
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto,@Session() session:any){
        const user = await this.UserService.signin(body.email,body.password);
        session.userId = user.id;
        return user;
    }

    @Get('whoami')
    whoAmI(@Session() session:any){
        const user = this.UserService.find(session.userId);
        return user;
    }

    @Post('signout')
    signOut(@Session() session: any){
        session.userId =null;
    }

    @Get('/:id')
    findUser(@Param('id') id:string){
        return this.UserService.find(parseInt(id));
    }

    @Delete('/:id')
    deleteUser(@Param('id') id:string){
        return this.UserService.delete(parseInt(id));
    }
}
