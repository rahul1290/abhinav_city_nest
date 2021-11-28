import { Expose } from "class-transformer";

export class UserDto{
    @Expose()
    id:Number;
    
    @Expose()
    email:String;
}